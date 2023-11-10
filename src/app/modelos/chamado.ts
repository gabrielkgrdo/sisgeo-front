import { Servidor } from "./servidor";

export interface Ocorrencia {
    id?:                any;
    dataAbertura?:   string;
    dataFechamento?: string;
    prioridade:      string;
    status:          any;
    titulo:          string;
    descricao:     string;
    servidor: Partial<Servidor>;
    usuario:            any;
    nomeUsuario:     string;
    nomeServidor:     string;
    tipoOcorrencia?: {
        id: number;
        nome: string;
      };
      cidade?: {
        id: number;
        nome: string;
    };
    complemento?: string;
    dataInicio?: string;
    dataFim?: string;
    horaInicio?: string;
    horaFim?: string;
    quadra?: string;
    setorArea?: {
        id: number;
        nome: string;
    };
    tipoLocalCriminal?: {
        id: number;
        nomeLocal: string;
    };
    meioEmpregado?: Array<{
        id: number;
        nomeMeioEmpregado: string;
    }>;
    dataInicioFormatada?: string;
    dataFimFormatada?: string;
    }