import { Servidor } from "./servidor";

export interface Ocorrencia {
    id?:                any;
    dataAbertura?:   string;
    dataFechamento?: string;
    prioridade:      string;
    status:          any;
    titulo:          string;
    descricaoOcorrencia:     string;
    servidor: Partial<Servidor>;
    usuario:            any;
    nomeUsuario:     string;
    nomeServidor:     string;
    tipoOcorrencia?: {
        id: number;
        nome: string;
      };
    }