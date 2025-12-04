import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, SegmentIssue } from "../types";

const processEnvApiKey = process.env.API_KEY;

// Initialize the client
const ai = new GoogleGenAI({ apiKey: processEnvApiKey });

export const analyzeContent = async (text: string): Promise<AnalysisResult> => {
  try {
    const model = 'gemini-2.5-flash'; 
    
    // Configura o prompt para atuar como verificador em Português, mas mantendo chaves em Inglês para o parser
    const prompt = `
      Você é o DRM Verify, uma IA de verificação de fatos jornalísticos de classe mundial. 
      Analise o texto a seguir em busca de precisão factual, inconsistências lógicas, possíveis fake news e sensacionalismo.
      
      Use o Google Search para verificar alegações se necessário.
      Responda em PORTUGUÊS DO BRASIL.

      Analise este texto:
      "${text}"

      FORNEÇA SUA RESPOSTA NO SEGUINTE FORMATO DE TEXTO ESTRITO (Mantenha as chaves SCORE, VERDICT, etc em Inglês, mas o conteúdo em Português):
      
      SCORE: <inteiro de 0 a 100>
      VERDICT: <Reliable | Questionable | Unreliable> (Escolha um destes três em inglês)
      SUMMARY: <Um parágrafo conciso em Português resumindo a credibilidade do texto.>
      SEGMENTS_START
      <Citação do texto original> ||| <Por que é suspeito/inconsistente (em Português)> ||| <Sugestão de melhoria (em Português)>
      <Citação do texto original> ||| <Por que é suspeito/inconsistente (em Português)> ||| <Sugestão de melhoria (em Português)>
      SEGMENTS_END

      (Se não houver segmentos suspeitos, deixe o espaço entre SEGMENTS_START e SEGMENTS_END vazio).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.3, // Low temperature for more analytical/deterministic output
      },
    });

    const outputText = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // Parse the custom format
    const scoreMatch = outputText.match(/SCORE:\s*(\d+)/i);
    const verdictMatch = outputText.match(/VERDICT:\s*(.+)/i);
    const summaryMatch = outputText.match(/SUMMARY:\s*([\s\S]*?)SEGMENTS_START/i);
    const segmentsBlockMatch = outputText.match(/SEGMENTS_START([\s\S]*?)SEGMENTS_END/i);

    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
    const verdictRaw = verdictMatch ? verdictMatch[1].trim() : 'Questionable';
    let verdict: 'Reliable' | 'Questionable' | 'Unreliable' = 'Questionable';
    
    // Robust check for verdict
    if (verdictRaw.toLowerCase().includes('reliable') && !verdictRaw.toLowerCase().includes('un')) verdict = 'Reliable';
    if (verdictRaw.toLowerCase().includes('unreliable')) verdict = 'Unreliable';
    // Default remains Questionable if unclear

    const summary = summaryMatch ? summaryMatch[1].trim() : "Não foi possível gerar um resumo da análise.";

    const segments: SegmentIssue[] = [];
    if (segmentsBlockMatch && segmentsBlockMatch[1]) {
      const lines = segmentsBlockMatch[1].trim().split('\n');
      lines.forEach(line => {
        if (line.trim().length > 0) {
          const parts = line.split('|||');
          if (parts.length === 3) {
            segments.push({
              quote: parts[0].trim(),
              reason: parts[1].trim(),
              suggestion: parts[2].trim()
            });
          }
        }
      });
    }

    // Extract sources from grounding metadata
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web?.uri && chunk.web?.title)
      .map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title
      }));
    
    // Deduplicate sources
    const uniqueSources = Array.from(new Map(sources.map((item: any) => [item.uri, item])).values()) as {uri: string, title: string}[];

    return {
      score,
      verdict,
      summary,
      segments,
      sources: uniqueSources,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error("Analysis Failed:", error);
    throw new Error("Falha ao analisar o conteúdo. Por favor, tente novamente.");
  }
};