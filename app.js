/**
 * GUIA VACINAL - MOTOR COM SISTEMA MARK
 * Cards com status de triagem:
 * - Verde / Positivo = Marcada OK / Em dia
 * - Vermelho suave = Não marcada / Pendente
 */

// Banco de Dados Oficial Estruturado em Marcos Cronológicos SBIm
const SBIM_CALENDAR_DATA = {
    // =========================================================================
    // 1. RECÉM-NASCIDO ATÉ 9 MESES
    // =========================================================================
    baby: {
        title: "Recém-Nascido até 9 Meses",
        icon: "👶",
        milestones: [
            {
                id: "m-nascer",
                periodo: "Ao Nascer",
                badgeEmoji: "👶",
                vacinas: [
                    {
                        id: "teen-bcg",
                        nome: "BCG",
                        dose: "Dose Única",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Tuberculose grave (miliar e meníngea).",
                        via: "Intradérmica (ID) • Deltoide braço direito",
                        esquema: "Dose única ao nascer (peso mínimo: 2.000g).",
                        nota: "Ausência de cicatriz vacinal após 6 meses NÃO exige revacinação (orientação MS/SBIm)."
                    },
                    {
                        id: "teen-hepb-0",
                        nome: "Hepatite B",
                        dose: "Dose ao nascer",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Transmissão vertical/perinatal da Hepatite B.",
                        via: "Intramuscular (IM) • Vasto lateral da coxa",
                        esquema: "Aplicar nas primeiras 12 horas de vida (máximo 24h).",
                        nota: "Se mãe HBsAg(+): administrar imunoglobulina (HBIG) + vacina em membros opostos."
                    }
                ]
            },
            {
                id: "m-2m",
                periodo: "2 Meses",
                badgeEmoji: "🍼",
                vacinas: [
                    {
                        id: "teen-penta-1",
                        nome: "Pentavalente",
                        dose: "1ª Dose",
                        disponibilidade: "SUS / Privada (Hexa)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Difteria, Tétano, Coqueluche, Hib e HepB.",
                        via: "Intramuscular (IM) • Vasto lateral da coxa",
                        esquema: "SUS: Pentavalente de células inteiras. Privada: Hexavalente acelular.",
                        nota: "Intervalo padrão de 60 dias (mínimo de 30 dias entre doses)."
                    },
                    {
                        id: "teen-vip-1",
                        nome: "VIP (Pólio)",
                        dose: "1ª Dose",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Poliomielite (Paralisia Infantil).",
                        via: "Intramuscular (IM)",
                        esquema: "Esquema 100% injetável inativado (Salk).",
                        nota: "A vacina oral da gotinha (VOP) foi completamente extinta pelo MS."
                    },
                    {
                        id: "teen-pneumo-1",
                        nome: "Pneumocócica",
                        dose: "1ª Dose",
                        disponibilidade: "SUS (VPC10) / Priv (13/15)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Pneumonia, meningite e otite por pneumococo.",
                        via: "Intramuscular (IM)",
                        esquema: "SUS: VPC10 (2 doses + ref). SBIm: VPC13 ou VPC15 (3 doses + ref).",
                        nota: "VPC13 e VPC15 ampliam proteção para mais sorotipos invasivos."
                    },
                    {
                        id: "teen-rota-1",
                        nome: "Rotavírus (VRH)",
                        dose: "1ª Dose",
                        disponibilidade: "SUS / Privada",
                        isSus: true,
                        isPrivate: true,
                        previne: "Gastroenterite aguda grave e desidratação.",
                        via: "Via Oral (VO)",
                        esquema: "SUS: 2 doses (VRH1). Privada: 3 doses (VRH5).",
                        nota: "CRÍTICO: Limite da 1ª dose de 1m15d até 3m15d. Não iniciar se ultrapassar!"
                    }
                ]
            },
            {
                id: "m-3m",
                periodo: "3 Meses",
                badgeEmoji: "🛡️",
                vacinas: [
                    {
                        id: "teen-menacwy-1",
                        nome: "MenACWY / MenC",
                        dose: "1ª Dose",
                        disponibilidade: "SUS (MenC) / Priv (ACWY)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Meningite meningocócica grave e sepse.",
                        via: "Intramuscular (IM)",
                        esquema: "SUS aplica MenC. SBIm recomenda MenACWY desde os 3 meses.",
                        nota: "MenACWY protege contra 4 sorogrupos da bactéria meningococo."
                    },
                    {
                        id: "teen-menb-1",
                        nome: "MenB Recombinante",
                        dose: "1ª Dose",
                        disponibilidade: "Rede Privada (SBIm)",
                        isSus: false,
                        isPrivate: true,
                        previne: "Doença meningocócica invasiva por sorogrupo B.",
                        via: "Intramuscular (IM)",
                        esquema: "2 doses primárias (3 e 5m) + reforço entre 12 e 15 meses.",
                        nota: "Recomendada pela SBIm e SBP. Febre comum nas primeiras 24 horas."
                    }
                ]
            },
            {
                id: "m-4m",
                periodo: "4 Meses",
                badgeEmoji: "✨",
                vacinas: [
                    {
                        id: "teen-penta-2",
                        nome: "Pentavalente",
                        dose: "2ª Dose",
                        disponibilidade: "SUS / Privada (Hexa)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Difteria, Tétano, Coqueluche, Hib e HepB.",
                        via: "Intramuscular (IM)",
                        esquema: "Segunda dose primária (intervalo de 60 dias).",
                        nota: "Avaliar eventos adversos da 1ª dose."
                    },
                    {
                        id: "teen-vip-2",
                        nome: "VIP (Pólio)",
                        dose: "2ª Dose",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Poliomielite.",
                        via: "Intramuscular (IM)",
                        esquema: "Segunda dose injetável inativada.",
                        nota: "Manter esquema exclusivo com VIP."
                    },
                    {
                        id: "teen-pneumo-2",
                        nome: "Pneumocócica",
                        dose: "2ª Dose",
                        disponibilidade: "SUS (VPC10) / Priv (13/15)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Infecções pneumocócicas invasivas.",
                        via: "Intramuscular (IM)",
                        esquema: "Segunda dose do esquema básico.",
                        nota: "Consolidação de títulos de anticorpos."
                    },
                    {
                        id: "teen-rota-2",
                        nome: "Rotavírus (VRH)",
                        dose: "2ª Dose",
                        disponibilidade: "SUS / Privada",
                        isSus: true,
                        isPrivate: true,
                        previne: "Diarreia grave por rotavírus.",
                        via: "Via Oral (VO)",
                        esquema: "Segunda dose (dose final no SUS).",
                        nota: "CRÍTICO: Limite máximo absoluto de 7 meses e 29 dias. Não dar após!"
                    }
                ]
            },
            {
                id: "m-5m",
                periodo: "5 Meses",
                badgeEmoji: "🛡️",
                vacinas: [
                    {
                        id: "teen-menacwy-2",
                        nome: "MenACWY / MenC",
                        dose: "2ª Dose",
                        disponibilidade: "SUS (MenC) / Priv (ACWY)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Meningite meningocócica.",
                        via: "Intramuscular (IM)",
                        esquema: "Segunda dose primária.",
                        nota: "Intervalo de 60 dias após a primeira dose."
                    },
                    {
                        id: "teen-menb-2",
                        nome: "MenB Recombinante",
                        dose: "2ª Dose",
                        disponibilidade: "Rede Privada (SBIm)",
                        isSus: false,
                        isPrivate: true,
                        previne: "Meningite por sorogrupo B.",
                        via: "Intramuscular (IM)",
                        esquema: "Segunda dose primária infantil.",
                        nota: "Completa o primeiro ciclo antes do reforço no 2º ano."
                    }
                ]
            },
            {
                id: "m-6m",
                periodo: "6 Meses",
                badgeEmoji: "⭐",
                vacinas: [
                    {
                        id: "teen-penta-3",
                        nome: "Pentavalente",
                        dose: "3ª Dose",
                        disponibilidade: "SUS / Privada (Hexa)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Difteria, Tétano, Coqueluche, Hib e HepB.",
                        via: "Intramuscular (IM)",
                        esquema: "Conclusão do esquema primário da infância.",
                        nota: "Próximos reforços com DTP aos 15m e aos 4 anos."
                    },
                    {
                        id: "teen-vip-3",
                        nome: "VIP (Pólio)",
                        dose: "3ª Dose",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Poliomielite.",
                        via: "Intramuscular (IM)",
                        esquema: "Terceira dose injetável da primovacinação.",
                        nota: "Reforços aos 15 meses e aos 4 anos."
                    },
                    {
                        id: "teen-pneumo-3",
                        nome: "Pneumocócica 3ªD",
                        dose: "3ª Dose (SBIm)",
                        disponibilidade: "Rede Privada (SBIm 3+1)",
                        isSus: false,
                        isPrivate: true,
                        previne: "Pneumonia e otite por pneumococo.",
                        via: "Intramuscular (IM)",
                        esquema: "Esquema 3+1 recomendado pela SBIm (2, 4, 6m + reforço).",
                        nota: "No SUS o esquema adota 2 doses + reforço aos 12m."
                    },
                    {
                        id: "teen-flu-1",
                        nome: "Influenza (Gripe)",
                        dose: "1ª Dose Infantil",
                        disponibilidade: "SUS / Privada",
                        isSus: true,
                        isPrivate: true,
                        previne: "Gripe grave e hospitalizações por Influenza.",
                        via: "Intramuscular (IM)",
                        esquema: "Crianças de 6m a 8 anos sem histórico: 2 doses (intervalo 30 dias).",
                        nota: "SUS: trivalente. Privada: tetravalente."
                    },
                    {
                        id: "teen-covid-1",
                        nome: "COVID-19",
                        dose: "1ª Dose Pediátrica",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "SRAG pediátrica e MIS-C por SARS-CoV-2.",
                        via: "Intramuscular (IM)",
                        esquema: "Inclusa no calendário básico infantil a partir dos 6 meses.",
                        nota: "Formulação pediátrica atualizada."
                    }
                ]
            },
            {
                id: "m-9m",
                periodo: "9 Meses",
                badgeEmoji: "🌿",
                vacinas: [
                    {
                        id: "teen-fa-1",
                        nome: "Febre Amarela",
                        dose: "1ª Dose",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Febre Amarela silvestre e formas hemorrágicas.",
                        via: "Subcutânea (SC)",
                        esquema: "1ª dose aos 9 meses. Reforço obrigatório aos 4 anos.",
                        nota: "Quem vacina após os 5 anos recebe apenas dose única vitalícia."
                    }
                ]
            }
        ]
    },

    // =========================================================================
    // 2. CRIANÇA E ADOLESCENTE (12 MESES A 19 ANOS)
    // =========================================================================
    teen: {
        title: "Criança e Adolescente (12 meses a 19 anos)",
        icon: "🧒🎒",
        milestones: [
            {
                id: "m-12m",
                periodo: "12 Meses (1 Ano)",
                badgeEmoji: "🎂",
                vacinas: [
                    {
                        id: "teen-scr-1",
                        nome: "Tríplice Viral (SCR)",
                        dose: "1ª Dose",
                        disponibilidade: "SUS (UBS) / Privada",
                        isSus: true,
                        isPrivate: true,
                        previne: "Sarampo, Caxumba e Rubéola.",
                        via: "Subcutânea (SC)",
                        esquema: "1ª dose aos 12 meses. A 2ª dose aos 15 meses.",
                        nota: "Vírus vivo atenuado. Não aplicar em imunodeprimidos graves."
                    },
                    {
                        id: "teen-pneumo-ref",
                        nome: "Pneumocócica Reforço",
                        dose: "Dose de Reforço",
                        disponibilidade: "SUS (VPC10) / Priv (13/15)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Reforço contra pneumonia e meningite pneumocócica.",
                        via: "Intramuscular (IM)",
                        esquema: "Reforço aos 12 meses de idade.",
                        nota: "Garante memória imunológica duradoura na infância."
                    },
                    {
                        id: "teen-menacwy-ref",
                        nome: "MenACWY / MenC Reforço",
                        dose: "Dose de Reforço",
                        disponibilidade: "SUS (MenC) / Priv (ACWY)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Doença meningocócica invasiva.",
                        via: "Intramuscular (IM)",
                        esquema: "Reforço aos 12 meses.",
                        nota: "SBIm recomenda reforço com MenACWY mesmo se tomou MenC."
                    }
                ]
            },
            {
                id: "m-15m",
                periodo: "15 Meses",
                badgeEmoji: "🧸",
                vacinas: [
                    {
                        id: "teen-dtp-1",
                        nome: "DTP / DTPa",
                        dose: "1º Reforço",
                        disponibilidade: "SUS (DTP) / Priv (DTPa)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Difteria, Tétano e Coqueluche.",
                        via: "Intramuscular (IM)",
                        esquema: "Primeiro reforço após a tríade do 1º ano.",
                        nota: "DTPa (acelular) causa muito menos dor e febre."
                    },
                    {
                        id: "teen-vip-ref1",
                        nome: "VIP (Pólio)",
                        dose: "1º Reforço",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Poliomielite.",
                        via: "Intramuscular (IM)",
                        esquema: "Primeiro reforço injetável aos 15 meses.",
                        nota: "Substituiu integralmente a antiga VOP (gotinha)."
                    },
                    {
                        id: "teen-hepa-1",
                        nome: "Hepatite A",
                        dose: "Dose Única SUS / 1ªD",
                        disponibilidade: "SUS (1 dose) / Priv (2 doses)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Hepatite A e insuficiência hepática aguda.",
                        via: "Intramuscular (IM)",
                        esquema: "SUS fornece dose única aos 15m. SBIm indica 2 doses.",
                        nota: "Duas doses conferem imunidade por toda a vida."
                    },
                    {
                        id: "teen-varicela-1",
                        nome: "Varicela (Catapora)",
                        dose: "1ª Dose",
                        disponibilidade: "SUS (UBS) / Privada",
                        isSus: true,
                        isPrivate: true,
                        previne: "Varicela e infecções bacterianas cutâneas.",
                        via: "Subcutânea (SC)",
                        esquema: "1ª dose aos 15 meses (isolada ou tetraviral).",
                        nota: "Segunda dose será administrada aos 4 anos no SUS."
                    }
                ]
            },
            {
                id: "m-18m",
                periodo: "18 Meses",
                badgeEmoji: "🎯",
                vacinas: [
                    {
                        id: "teen-menb-ref",
                        nome: "MenB Reforço",
                        dose: "Reforço SBIm",
                        disponibilidade: "Rede Privada (SBIm)",
                        isSus: false,
                        isPrivate: true,
                        previne: "Meningite grave por sorogrupo B.",
                        via: "Intramuscular (IM)",
                        esquema: "Reforço entre 12 e 18 meses (mínimo 6m da 2ª dose).",
                        nota: "Encerra o esquema de proteção MenB da primeira infância."
                    },
                    {
                        id: "teen-hepa-2",
                        nome: "Hepatite A 2ªD",
                        dose: "2ª Dose SBIm",
                        disponibilidade: "Rede Privada (SBIm)",
                        isSus: false,
                        isPrivate: true,
                        previne: "Imunidade definitiva contra Hepatite A.",
                        via: "Intramuscular (IM)",
                        esquema: "6 meses após a 1ª dose.",
                        nota: "Garante títulos de anticorpos protetores para a vida toda."
                    }
                ]
            },
            {
                id: "m-4a6a",
                periodo: "4 a 6 Anos",
                badgeEmoji: "🎒",
                vacinas: [
                    {
                        id: "teen-dtp-2",
                        nome: "DTP / DTPa",
                        dose: "2º Reforço",
                        disponibilidade: "SUS (DTP) / Priv (DTPa)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Difteria, Tétano e Coqueluche.",
                        via: "Intramuscular (IM)",
                        esquema: "Segundo reforço escolar aos 4 anos.",
                        nota: "Próximo reforço será decenal na adolescência."
                    },
                    {
                        id: "teen-vip-ref2",
                        nome: "VIP (Pólio)",
                        dose: "2º Reforço",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Poliomielite.",
                        via: "Intramuscular (IM)",
                        esquema: "Segundo reforço injetável aos 4 anos.",
                        nota: "Dose final de proteção contra paralisia infantil."
                    },
                    {
                        id: "teen-varicela-2",
                        nome: "Varicela 2ªD",
                        dose: "2ª Dose",
                        disponibilidade: "SUS (UBS) / Privada",
                        isSus: true,
                        isPrivate: true,
                        previne: "Varicela e surtos escolares.",
                        via: "Subcutânea (SC)",
                        esquema: "Segunda dose aos 4 anos no SUS.",
                        nota: "Com 2 doses a proteção contra varicela ultrapassa 98%."
                    },
                    {
                        id: "teen-fa-ref",
                        nome: "Febre Amarela Reforço",
                        dose: "Reforço aos 4 anos",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Febre Amarela.",
                        via: "Subcutânea (SC)",
                        esquema: "Obrigatório para quem tomou a 1ª dose aos 9 meses.",
                        nota: "Conclui a imunização vitalícia contra a doença."
                    }
                ]
            },
            {
                id: "m-9a14a",
                periodo: "9 a 14 Anos",
                badgeEmoji: "🎓",
                vacinas: [
                    {
                        id: "teen-hpv",
                        nome: "HPV",
                        dose: "Dose Única SUS / HPV9",
                        disponibilidade: "SUS (HPV4) / Priv (HPV9)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Câncer de colo de útero, pênis, ânus, orofaringe e verrugas.",
                        via: "Intramuscular (IM)",
                        esquema: "SUS desde 2024: DOSE ÚNICA (9 a 14 anos). Privada: HPV9 (2 doses 0-6m).",
                        nota: "Proteção oncológica máxima antes do início da atividade sexual."
                    },
                    {
                        id: "teen-menacwy-ado",
                        nome: "MenACWY Reforço",
                        dose: "Dose de Reforço",
                        disponibilidade: "SUS (11 a 14 anos) / Priv",
                        isSus: true,
                        isPrivate: true,
                        previne: "Meningite pelos sorogrupos A, C, W e Y.",
                        via: "Intramuscular (IM)",
                        esquema: "Disponível no SUS para adolescentes de 11 a 14 anos.",
                        nota: "Bloqueia a transmissão comunitária no grupo mais transmissor."
                    },
                    {
                        id: "teen-dengue",
                        nome: "Dengue (Qdenga)",
                        dose: "2 Doses (0 e 3m)",
                        disponibilidade: "SUS (10-14a) / Priv (4-60a)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Dengue grave e internações pelos 4 sorotipos.",
                        via: "Subcutânea (SC)",
                        esquema: "2 doses com intervalo de 3 meses.",
                        nota: "Indicada tanto para quem já teve quanto para quem nunca teve dengue."
                    }
                ]
            },
            {
                id: "m-15a19a",
                periodo: "15 a 19 Anos",
                badgeEmoji: "🧑🎓",
                vacinas: [
                    {
                        id: "teen-dt-ado",
                        nome: "dT / dTpa",
                        dose: "Reforço Decenal",
                        disponibilidade: "SUS (dT) / Priv (dTpa)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Difteria e Tétano (e Coqueluche na dTpa).",
                        via: "Intramuscular (IM)",
                        esquema: "Reforço a cada 10 anos.",
                        nota: "SBIm recomenda preferencialmente dTpa."
                    },
                    {
                        id: "teen-scr-ado",
                        nome: "Tríplice Viral (SCR)",
                        dose: "Conferir 2 Doses",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Sarampo, Caxumba e Rubéola.",
                        via: "Subcutânea (SC)",
                        esquema: "Garantir 2 doses comprovadas na vida até 19 anos.",
                        nota: "Se incompleto: atualizar sem reiniciar esquema."
                    },
                    {
                        id: "teen-hepb-ado",
                        nome: "Hepatite B",
                        dose: "Conferir 3 Doses",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Hepatite B e transmissão sexual.",
                        via: "Intramuscular (IM)",
                        esquema: "Comprovar esquema de 3 doses (0, 1 e 6 meses).",
                        nota: "Universalmente disponível no SUS."
                    }
                ]
            }
        ]
    },

    // =========================================================================
    // 3. ADULTO (20 a 59 ANOS)
    // =========================================================================
    adult: {
        title: "Adulto (20 a 59 anos)",
        icon: "🧑💼",
        milestones: [
            {
                id: "m-decenal-adulto",
                periodo: "Reforço Decenal",
                badgeEmoji: "⏰",
                vacinas: [
                    {
                        id: "adult-dt",
                        nome: "dT ou dTpa",
                        dose: "A cada 10 anos",
                        disponibilidade: "SUS (dT) / Priv (dTpa)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Difteria e Tétano (e Coqueluche com dTpa).",
                        via: "Intramuscular (IM) • Deltoide",
                        esquema: "1 dose de reforço a cada 10 anos por toda a vida adulta.",
                        nota: "Ferimentos graves com risco de tétano: antecipar se última dose > 5 anos."
                    }
                ]
            },
            {
                id: "m-primaria-adulto",
                periodo: "Esquema Primário",
                badgeEmoji: "📋",
                vacinas: [
                    {
                        id: "adult-hepb",
                        nome: "Hepatite B",
                        dose: "3 Doses (0, 1, 6m)",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Hepatite B crônica, cirrose e hepatocarcinoma.",
                        via: "Intramuscular (IM)",
                        esquema: "3 doses com intervalo de 1 mês entre 1ª e 2ª, e 5m entre 2ª e 3ª.",
                        nota: "Disponível no SUS gratuitamente em qualquer idade."
                    },
                    {
                        id: "adult-scr",
                        nome: "Tríplice Viral (SCR)",
                        dose: "2 Doses (<30a) / 1 Dose (≥30a)",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Sarampo, Caxumba e Rubéola.",
                        via: "Subcutânea (SC)",
                        esquema: "20 a 29 anos: garantir 2 doses. 30 a 59 anos: garantir 1 dose.",
                        nota: "Contraindicada em gestantes e imunodeprimidos graves (vírus vivo)."
                    },
                    {
                        id: "adult-fa",
                        nome: "Febre Amarela",
                        dose: "Dose Única Vitalícia",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Febre Amarela.",
                        via: "Subcutânea (SC)",
                        esquema: "Dose única para adultos até 59 anos sem histórico vacinal prévio.",
                        nota: "Se tomou apenas 1 dose antes dos 5 anos de idade: fazer 1 reforço."
                    }
                ]
            },
            {
                id: "m-anual-adulto",
                periodo: "Vacinas Sazonais",
                badgeEmoji: "🍂",
                vacinas: [
                    {
                        id: "adult-flu",
                        nome: "Influenza (Gripe)",
                        dose: "Dose Anual",
                        disponibilidade: "SUS (Grupos) / Privada",
                        isSus: true,
                        isPrivate: true,
                        previne: "Influenza grave, pneumonias e afastamentos.",
                        via: "Intramuscular (IM)",
                        esquema: "Dose única anual atualizada para a temporada do hemisfério sul.",
                        nota: "No SUS gratuita para comorbidades, saúde, professores, segurança."
                    },
                    {
                        id: "adult-covid",
                        nome: "COVID-19",
                        dose: "Reforço Periódico",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "SRAG e formas graves por variantes emergentes.",
                        via: "Intramuscular (IM)",
                        esquema: "Conforme orientações anuais do MS para grupos prioritários.",
                        nota: "Manter esquema básico atualizado."
                    }
                ]
            },
            {
                id: "m-sbim-adulto",
                periodo: "SBIm Complementar",
                badgeEmoji: "💎",
                vacinas: [
                    {
                        id: "adult-dengue",
                        nome: "Dengue (Qdenga)",
                        dose: "2 Doses (0 e 3m)",
                        disponibilidade: "Rede Privada (até 60a)",
                        isSus: false,
                        isPrivate: true,
                        previne: "Dengue por todos os 4 sorotipos.",
                        via: "Subcutânea (SC)",
                        esquema: "2 doses com intervalo de 3 meses. Aprovada pela ANVISA até 60 anos.",
                        nota: "Recomendada pela SBIm independente de histórico prévio de dengue."
                    },
                    {
                        id: "adult-hpv",
                        nome: "HPV Nonavalente",
                        dose: "3 Doses (0, 2, 6m)",
                        disponibilidade: "Rede Privada (até 45a)",
                        isSus: false,
                        isPrivate: true,
                        previne: "Lesões pré-cancerosas e câncer genital e anorretal.",
                        via: "Intramuscular (IM)",
                        esquema: "Recomendada pela SBIm para adultos até 45 anos.",
                        nota: "Proteção estendida contra 9 subtipos virais oncogênicos."
                    }
                ]
            }
        ]
    },

    // =========================================================================
    // 3. GESTANTE
    // =========================================================================
    pregnant: {
        title: "Gestante (Qualquer Idade Gestacional)",
        icon: "🤰",
        milestones: [
            {
                id: "m-qualquer-trimestre",
                periodo: "A Qualquer Momento",
                badgeEmoji: "🌸",
                vacinas: [
                    {
                        id: "preg-flu",
                        nome: "Influenza (Gripe)",
                        dose: "1 Dose Anual",
                        disponibilidade: "SUS (UBS) / Privada",
                        isSus: true,
                        isPrivate: true,
                        previne: "SRAG materna e complicações fetais/prematuridade.",
                        via: "Intramuscular (IM)",
                        esquema: "1 dose em qualquer trimestre da gravidez.",
                        nota: "Segurança total: anticorpos transplacentários protegem o bebê recém-nascido."
                    },
                    {
                        id: "preg-hepb",
                        nome: "Hepatite B",
                        dose: "3 Doses (se suscetível)",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Transmissão vertical da Hepatite B para o concepto.",
                        via: "Intramuscular (IM)",
                        esquema: "3 doses (0, 1 e 6m). Dispensada se tiver histórico completo.",
                        nota: "Vacina inativada segura durante qualquer período gestacional."
                    },
                    {
                        id: "preg-covid",
                        nome: "COVID-19",
                        dose: "Dose Periódica",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Internações e desfechos obstétricos desfavoráveis.",
                        via: "Intramuscular (IM)",
                        esquema: "Conforme protocolos vigentes do MS para gestantes.",
                        nota: "Gestantes são grupo clínico de alto risco para insuficiência respiratória."
                    }
                ]
            },
            {
                id: "m-20-semana",
                periodo: "A partir da 20ª Semana",
                badgeEmoji: "🛡️",
                vacinas: [
                    {
                        id: "preg-dtpa",
                        nome: "dTpa Adulto",
                        dose: "1 Dose a CADA Gestação",
                        disponibilidade: "SUS (UBS) / Privada",
                        isSus: true,
                        isPrivate: true,
                        previne: "Coqueluche grave, apneia e morte neonatal; tétano maternal/neonatal.",
                        via: "Intramuscular (IM) • Deltoide",
                        esquema: "1 dose a partir da 20ª semana (ideal 27ª a 36ª semana) A CADA GESTAÇÃO!",
                        nota: "CRÍTICO: O objetivo é transferir anticorpos placentários antipertussis para proteger o bebê nos primeiros meses."
                    }
                ]
            },
            {
                id: "m-32-semana",
                periodo: "32ª a 36ª Semana",
                badgeEmoji: "👶",
                vacinas: [
                    {
                        id: "preg-vsr",
                        nome: "VSR (Abrysvo)",
                        dose: "Dose Única",
                        disponibilidade: "Rede Privada (SBIm)",
                        isSus: false,
                        isPrivate: true,
                        previne: "Bronquiolite grave e internações em UTI por VSR até os 6 meses de vida.",
                        via: "Intramuscular (IM)",
                        esquema: "Dose única entre a 32ª e 36ª semana de gestação.",
                        nota: "Recomendação oficial SBIm: anticorpos maternos protegem o lactente na fase mais vulnerável."
                    }
                ]
            },
            {
                id: "m-puerperas",
                periodo: "Puérperas (Pós-Parto)",
                badgeEmoji: "🤱",
                vacinas: [
                    {
                        id: "preg-dtpa-pos",
                        nome: "dTpa Pós-Parto",
                        dose: "1 Dose Imediata",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Coqueluche materna (evita transmissão mãe-bebê - efeito casulo).",
                        via: "Intramuscular (IM)",
                        esquema: "Administrar logo após o parto se não tomou na gestação.",
                        nota: "Reduz o risco de contágio do recém-nascido pela mãe no domicílio."
                    },
                    {
                        id: "preg-scr-pos",
                        nome: "Tríplice Viral Pós-Parto",
                        dose: "Atualização Pós-Parto",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Sarampo e Rubéola em puérperas suscetíveis.",
                        via: "Subcutânea (SC)",
                        esquema: "Segura na amamentação imediatamente após o parto.",
                        nota: "Não pôde ser feita na gravidez (vírus vivo), mas é liberada no pós-parto."
                    }
                ]
            },
            {
                id: "m-contraindicadas",
                periodo: "⛔ Contraindicadas na Gravidez",
                badgeEmoji: "🚫",
                isDanger: true,
                vacinas: [
                    {
                        id: "preg-scr-contra",
                        nome: "Tríplice Viral (SCR)",
                        dose: "NÃO APLICAR",
                        disponibilidade: "CONTRAINDICADA",
                        isSus: false,
                        isPrivate: false,
                        isDanger: true,
                        previne: "Risco de infecção fetal pelo componente viral atenuado.",
                        via: "NÃO ADMINISTRAR",
                        esquema: "Aguardar o pós-parto imediato.",
                        nota: "Mulheres vacinadas devem evitar gravidez por pelo menos 30 dias."
                    },
                    {
                        id: "preg-varicela-contra",
                        nome: "Varicela / Dengue",
                        dose: "NÃO APLICAR",
                        disponibilidade: "CONTRAINDICADA",
                        isSus: false,
                        isPrivate: false,
                        isDanger: true,
                        previne: "Risco teratogênico por vírus vivos atenuados.",
                        via: "NÃO ADMINISTRAR",
                        esquema: "Contraindicadas em toda a gestação e amamentação (dengue).",
                        nota: "Em caso de contato de grávida suscetível com varicela: avaliar imunoglobulina VARIG."
                    }
                ]
            }
        ]
    },

    // =========================================================================
    // 4. PESSOA IDOSA (≥ 60 ANOS)
    // =========================================================================
    elderly: {
        title: "Pessoa Idosa (≥ 60 anos)",
        icon: "👵👴",
        milestones: [
            {
                id: "m-sazonal-idoso",
                periodo: "Vacinas Sazonais",
                badgeEmoji: "🍂",
                vacinas: [
                    {
                        id: "old-flu",
                        nome: "Influenza High-Dose",
                        dose: "Dose Anual",
                        disponibilidade: "SUS (UBS) / Priv (High-Dose)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Hospitalizações, pneumonia e descompensação cardíaca.",
                        via: "Intramuscular (IM)",
                        esquema: "SUS fornece trivalente padrão. SBIm recomenda preferencialmente High-Dose.",
                        nota: "High-Dose gera títulos 4 vezes superiores para superar a imunossenescência."
                    },
                    {
                        id: "old-covid",
                        nome: "COVID-19 Reforço",
                        dose: "Reforço Semestral",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Internações e óbito por variantes em idosos.",
                        via: "Intramuscular (IM)",
                        esquema: "Reforço periódico semestral conforme diretriz do MS.",
                        nota: "Prioridade absoluta na Atenção Básica."
                    }
                ]
            },
            {
                id: "m-pneumo-idoso",
                periodo: "Esquema Sequencial Pneumo",
                badgeEmoji: "🫁",
                vacinas: [
                    {
                        id: "old-vpc",
                        nome: "Pneumocócica Conjugada",
                        dose: "1ª Etapa (VPC13/15/20)",
                        disponibilidade: "Rede Privada (SBIm) / CRIE",
                        isSus: true,
                        isPrivate: true,
                        previne: "Pneumonia bacteriana comunitária e bacteremia.",
                        via: "Intramuscular (IM)",
                        esquema: "Iniciar com VPC conjugada antes de qualquer dose polissacarídica.",
                        nota: "Induz resposta imunológica de memória duradoura."
                    },
                    {
                        id: "old-vpp23",
                        nome: "Pneumo 23v (VPP23)",
                        dose: "2ª Etapa (6-12m após VPC)",
                        disponibilidade: "SUS (UBS idosos) / Privada",
                        isSus: true,
                        isPrivate: true,
                        previne: "Proteção ampla contra 23 sorotipos de pneumococo.",
                        via: "Intramuscular (IM) ou Subcutânea (SC)",
                        esquema: "6 a 12 meses após a vacina conjugada.",
                        nota: "Após 5 anos: aplicar uma 2ª e última dose de reforço de VPP23."
                    }
                ]
            },
            {
                id: "m-zoster-idoso",
                periodo: "Herpes Zóster",
                badgeEmoji: "⚡",
                vacinas: [
                    {
                        id: "old-zoster",
                        nome: "Herpes Zóster (Shingrix)",
                        dose: "2 Doses (0 e 2m)",
                        disponibilidade: "Rede Privada (SBIm)",
                        isSus: false,
                        isPrivate: true,
                        previne: "Herpes Zóster ('Cobreiro') e Neuralgia Pós-Herpética crônica.",
                        via: "Intramuscular (IM)",
                        esquema: "2 doses com intervalo de 2 a 6 meses.",
                        nota: "Eficácia > 90% mantida por 10 anos. Pode ser feita mesmo em quem já teve zóster."
                    }
                ]
            },
            {
                id: "m-vsr-idoso",
                periodo: "Prevenção de VSR",
                badgeEmoji: "🛡️",
                vacinas: [
                    {
                        id: "old-vsr",
                        nome: "VSR (Arexvy / Abrysvo)",
                        dose: "Dose Única",
                        disponibilidade: "Rede Privada (SBIm)",
                        isSus: false,
                        isPrivate: true,
                        previne: "Infecções do trato respiratório inferior e descompensação de DPOC/ICC.",
                        via: "Intramuscular (IM)",
                        esquema: "Dose única a partir dos 60 anos.",
                        nota: "Forte recomendação SBIm para idosos com doenças crônicas cardiopulmonares."
                    }
                ]
            },
            {
                id: "m-reforco-idoso",
                periodo: "Reforços Decenais",
                badgeEmoji: "💉",
                vacinas: [
                    {
                        id: "old-dt",
                        nome: "dT ou dTpa",
                        dose: "A cada 10 anos",
                        disponibilidade: "SUS (dT) / Priv (dTpa)",
                        isSus: true,
                        isPrivate: true,
                        previne: "Tétano e Difteria.",
                        via: "Intramuscular (IM)",
                        esquema: "1 reforço a cada 10 anos.",
                        nota: "Idosos concentram a maior letalidade por tétano acidental. Conferir sempre!"
                    },
                    {
                        id: "old-hepb",
                        nome: "Hepatite B",
                        dose: "3 Doses (se suscetível)",
                        disponibilidade: "SUS (UBS)",
                        isSus: true,
                        isPrivate: false,
                        previne: "Hepatite B.",
                        via: "Intramuscular (IM)",
                        esquema: "3 doses (0, 1 e 6m) se sorologia negativa.",
                        nota: "Disponível gratuitamente no SUS."
                    }
                ]
            }
        ]
    }
};

// Estado Global da Aplicação
let currentProfileKey = 'teen';
let currentNetworkFilter = 'all';

// Armazenamento do Status de Doses Administradas (MARK)
// Chave: vacId, Valor: número de doses administradas (ex: 0, 1, 2, 3...)
const administeredDoses = {};
// Compatibilidade booleana
const markedVaccines = new Proxy(administeredDoses, {
    get: (target, prop) => (target[prop] || 0) > 0
});

// =========================================================================
// LISTA OFICIAL DE COMORBIDADES & CONDIÇÕES ESPECIAIS (SBIm / CRIE / PNI)
// =========================================================================
const COMORBIDADES_LIST = [
    {
        id: "nenhuma",
        nome: "Sem comorbidade",
        icon: "💚",
        desc: "Calendário vacinal de rotina por faixa etária."
    },
    {
        id: "cardiopatia",
        nome: "Cardiopatia",
        icon: "🫀",
        desc: "Insuficiência cardíaca, coronariopatia, congênitas.",
        crieDesc: "Indicação prioritária de Influenza, COVID-19 e Pneumocócicas."
    },
    {
        id: "pneumopatia",
        nome: "Pneumopatia",
        icon: "🫁",
        desc: "DPOC, asma moderada/grave, enfisema, fibrose.",
        crieDesc: "Proteção respiratória intensificada com Pneumo 23 e Influenza."
    },
    {
        id: "diabetes",
        nome: "Diabetes",
        icon: "🍬",
        desc: "Diabetes Mellitus tipos 1 ou 2.",
        crieDesc: "Indicação de Pneumocócica 23, Influenza e Hepatite B."
    },
    {
        id: "imunossupressao",
        nome: "Imunossupressão / HIV",
        icon: "🩸",
        desc: "HIV/AIDS, biológicos ou imunodeficiências.",
        contraindicaVirusVivo: true,
        crieDesc: "Libera Pneumo 23, Meningo ACWY/B e vacinas inativadas especiais no CRIE."
    },
    {
        id: "onco",
        nome: "Paciente Oncológico",
        icon: "🎗️",
        desc: "Câncer em tratamento ativo, quimioterapia.",
        contraindicaVirusVivo: true,
        crieDesc: "Contraindicação a vírus vivo; indicação prioritária de inativadas."
    },
    {
        id: "transplante",
        nome: "Transplante (Órgãos/TMO)",
        icon: "🦴",
        desc: "Receptores ou candidatos a transplante.",
        contraindicaVirusVivo: true,
        crieDesc: "Reconstituição imune monitorada pelo CRIE."
    },
    {
        id: "doenca_renal",
        nome: "Doença Renal Crônica",
        icon: "🧪",
        desc: "Hemodiálise ou DRC estágios 3 a 5.",
        crieDesc: "Hepatite B em dose dobrada (40mcg) no CRIE e Pneumocócica 23."
    },
    {
        id: "asplenia",
        nome: "Asplenia / Falciforme",
        icon: "🧬",
        desc: "Esplenectomizados ou hemoglobinopatias.",
        crieDesc: "Alto risco de sepse fulminante por encapsulados (Pneumo, MenACWY, MenB, Hib)."
    },
    {
        id: "hepatopatia",
        nome: "Hepatopatia Crônica",
        icon: "🧫",
        desc: "Cirrose, hepatites virais crônicas B ou C.",
        crieDesc: "Garantir imunização completa para Hepatites A e B + Pneumo 23."
    },
    {
        id: "neurologica",
        nome: "Doença Neurológica",
        icon: "🧠",
        desc: "Paralisia cerebral, doenças neuromusculares.",
        crieDesc: "Prioridade para vacinas respiratórias (Influenza, Pneumocócicas)."
    },
    {
        id: "prematuro",
        nome: "Prematuridade Extrema",
        icon: "🍼",
        desc: "Prematuros < 33 semanas ou < 1.500g.",
        crieDesc: "Indicação de Palivizumabe (VSR) e vigilância no CRIE."
    }
];

let selectedComorbidities = new Set(['nenhuma']);

// =========================================================================
// SISTEMA DE ROTEAMENTO SPA (DEEP LINKING E URLs AMIGÁVEIS)
// =========================================================================
const PROFILE_ROUTE_MAP = {
    'baby': '/RECEM-NASCIDO',
    'teen': '/CRIANCA-ADOLESCENTE/COMORBIDADES/PRESCRICAO',
    'adult': '/ADULTO/COMORBIDADES/PRESCRICAO',
    'pregnant': '/GESTANTE/COMORBIDADES/PRESCRICAO',
    'elderly': '/IDOSO/COMORBIDADES/PRESCRICAO'
};

function getRouteForProfile(profileKey) {
    return PROFILE_ROUTE_MAP[profileKey] || '/';
}

function getActiveScreenRoute() {
    if (currentActiveScreenId === 'screen-profiles') {
        return '/';
    }
    return getRouteForProfile(currentProfileKey);
}

function syncUrlPath(route, replace = false) {
    try {
        const current = decodeURIComponent(window.location.pathname || '').replace(/\/+$/, '') || '/';
        const target = decodeURIComponent(route || '').replace(/\/+$/, '') || '/';
        if (current.toUpperCase() === target.toUpperCase()) return;

        if (replace) {
            window.history.replaceState({ route: target }, '', target);
        } else {
            window.history.pushState({ route: target }, '', target);
        }
    } catch (e) {
        console.warn('Erro ao atualizar URL no histórico:', e);
    }
}

function restoreRouteAfterModalClose() {
    const current = decodeURIComponent(window.location.pathname || '').toUpperCase();
    if (current.startsWith('/PERFIL')) {
        syncUrlPath(getActiveScreenRoute(), true);
    }
}

function navigateToProfileRoute(profileKey, push = true) {
    if (profileKey === 'baby') {
        selectProfileAndAdvance('baby');
        syncUrlPath('/RECEM-NASCIDO', !push);
    } else {
        goToComorbiditiesScreen(profileKey);
        syncUrlPath(getRouteForProfile(profileKey), !push);
    }
}

function navigateToRoute(route, push = true) {
    const raw = decodeURIComponent(route || '').trim().replace(/\/+$/, '') || '/';
    const upper = raw.toUpperCase();

    if (upper === '/RECEM-NASCIDO' || upper === '/RECEM_NASCIDO' || upper === '/BEBE') {
        selectProfileAndAdvance('baby');
        syncUrlPath('/RECEM-NASCIDO', !push);
    } else if (upper.includes('CRIANCA') || upper.includes('ADOLESCENTE')) {
        goToComorbiditiesScreen('teen');
        syncUrlPath('/CRIANCA-ADOLESCENTE/COMORBIDADES/PRESCRICAO', !push);
    } else if (upper.includes('ADULTO')) {
        goToComorbiditiesScreen('adult');
        syncUrlPath('/ADULTO/COMORBIDADES/PRESCRICAO', !push);
    } else if (upper.includes('GESTANTE')) {
        goToComorbiditiesScreen('pregnant');
        syncUrlPath('/GESTANTE/COMORBIDADES/PRESCRICAO', !push);
    } else if (upper.includes('IDOSO')) {
        goToComorbiditiesScreen('elderly');
        syncUrlPath('/IDOSO/COMORBIDADES/PRESCRICAO', !push);
    } else if (upper.includes('/PERFIL/MEU CADASTRO') || upper.includes('/PERFIL/MEU-CADASTRO') || upper.includes('/PERFIL/CADASTRO')) {
        openEditUserDataModal();
        syncUrlPath('/PERFIL/MEU CADASTRO', !push);
    } else if (upper.includes('/PERFIL/HISTORICO')) {
        openHistoryModal('prescriptions');
        syncUrlPath('/PERFIL/HISTORICO', !push);
    } else if (upper.includes('/PERFIL/ASSINATURA')) {
        openSignatureModal();
        syncUrlPath('/PERFIL/ASSINATURA', !push);
    } else {
        goToHomeProfiles();
        syncUrlPath('/', !push);
    }
}

function handleInitialRoute() {
    const raw = decodeURIComponent(window.location.pathname || '').trim().replace(/\/+$/, '');
    if (!raw || raw === '' || raw === '/index.html') {
        return;
    }
    navigateToRoute(raw, false);
}

function initRouter() {
    window.addEventListener('popstate', () => {
        const path = decodeURIComponent(window.location.pathname || '');
        navigateToRoute(path, false);
    });

    handleInitialRoute();
}

// =========================================================================
// NAVEGAÇÃO E MOTOR DE TRIAGEM DE COMORBIDADES (PÁGINA DEDICADA)
// =========================================================================
let pendingProfileKey = null;

function goToComorbiditiesScreen(profileKey) {
    pendingProfileKey = profileKey;
    currentProfileKey = profileKey;
    const profile = SBIM_CALENDAR_DATA[profileKey];
    if (!profile) return;

    syncUrlPath(getRouteForProfile(profileKey));
    renderComorbiditiesCards();
    showScreen('screen-comorbidities');
}

// Alias para compatibilidade
function openComorbidityModal(profileKey) {
    goToComorbiditiesScreen(profileKey);
}

function renderComorbiditiesCards() {
    const container = document.getElementById('comorbiditiesCardsGrid');
    if (!container) return;
    container.innerHTML = '';

    const isNoneSelected = selectedComorbidities.size === 0 || selectedComorbidities.has('nenhuma');

    COMORBIDADES_LIST.forEach(item => {
        const isSelected = item.id === 'nenhuma' ? isNoneSelected : selectedComorbidities.has(item.id);
        const card = document.createElement('div');
        card.className = `comorbidity-item-card ${isSelected ? 'selected' : ''} ${item.id === 'nenhuma' ? 'is-none-card' : ''}`;
        card.onclick = () => toggleComorbidityCard(item.id);

        card.innerHTML = `
            <div class="item-card-left">
                <span class="item-card-icon">${item.icon}</span>
                <div class="item-card-text">
                    <strong class="item-card-title">${item.nome}</strong>
                    <span class="item-card-desc">${item.desc}</span>
                </div>
            </div>
            <div class="item-card-check ${isSelected ? 'checked' : ''}">
                ${isSelected ? '✓' : ''}
            </div>
        `;
        container.appendChild(card);
    });

    updateComorbidityAdvanceButton();
}

function toggleComorbidityCard(id) {
    if (id === 'nenhuma') {
        selectedComorbidities.clear();
        selectedComorbidities.add('nenhuma');
    } else {
        selectedComorbidities.delete('nenhuma');
        if (selectedComorbidities.has(id)) {
            selectedComorbidities.delete(id);
        } else {
            selectedComorbidities.add(id);
        }
        if (selectedComorbidities.size === 0) {
            selectedComorbidities.add('nenhuma');
        }
    }
    renderComorbiditiesCards();
}

function clearSelectedComorbidities() {
    selectedComorbidities.clear();
    selectedComorbidities.add('nenhuma');
    renderComorbiditiesCards();
}

function updateComorbidityAdvanceButton() {
    const btnAdvance = document.getElementById('btnComorbidityAdvance');
    if (!btnAdvance) return;
    const realCount = Array.from(selectedComorbidities).filter(id => id !== 'nenhuma').length;

    if (realCount === 0) {
        btnAdvance.textContent = 'Avançar para o Calendário (Rotina) →';
    } else {
        btnAdvance.textContent = `Avançar para o Calendário (${realCount} Comorbidade${realCount > 1 ? 's' : ''}) →`;
    }
}

function confirmComorbiditiesAndAdvance(comorbidityIds) {
    selectedComorbidities = new Set(comorbidityIds);
    const key = pendingProfileKey || currentProfileKey;
    selectProfileAndAdvance(key);
}

function submitSelectedComorbidities() {
    selectedComorbidities.delete('nenhuma');
    const key = pendingProfileKey || currentProfileKey;
    selectProfileAndAdvance(key);
}

// Funções do Modal de Pacientes Especiais (SBIm)
function openSpecialPatientsModal() {
    const modal = document.getElementById('specialPatientsModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSpecialPatientsModal() {
    const modal = document.getElementById('specialPatientsModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleSpecialModalBackdropClick(e) {
    if (e.target.id === 'specialPatientsModal') {
        closeSpecialPatientsModal();
    }
}

// Objeto de vacina atualmente aberta no modal
let currentModalVac = null;
let currentModalMilestone = null;
let currentActiveScreenId = 'screen-profiles';
let currentTeenPhase = null;

// Navegação entre telas
function showScreen(screenId) {
    currentActiveScreenId = screenId;
    document.querySelectorAll('.screen-view').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const backBtn = document.getElementById('btnBackToProfiles');
    if (backBtn) {
        backBtn.style.display = (screenId === 'screen-profiles') ? 'none' : 'inline-flex';
    }

    const mainContainer = document.querySelector('.main-container');

    if (screenId === 'screen-prescription') {
        document.body.classList.add('has-prescription-active');
        if (mainContainer) mainContainer.classList.add('has-prescription-active');
        const workspace = document.getElementById('prescriptionViewerWorkspace');
        if (workspace) workspace.scrollTop = 0;
    } else {
        document.body.classList.remove('has-prescription-active');
        if (mainContainer) mainContainer.classList.remove('has-prescription-active');
        const waPopout = document.getElementById('patientWhatsAppPopout');
        if (waPopout) waPopout.style.display = 'none';
    }
}

function handleFloatingBack() {
    if (currentActiveScreenId === 'screen-prescription') {
        showScreen('screen-vaccines');
    } else if (currentActiveScreenId === 'screen-vaccines') {
        if (currentProfileKey === 'baby') {
            goToHomeProfiles();
        } else {
            goToComorbiditiesScreen(currentProfileKey);
        }
    } else {
        goToHomeProfiles();
    }
}

function goToHomeProfiles() {
    showScreen('screen-profiles');
    syncUrlPath('/');
}

// Ao selecionar um dos 5 perfis na Tela 1
function selectProfileAndAdvance(profileKey) {
    currentProfileKey = profileKey;
    currentNetworkFilter = 'all';
    expandedMilestones.clear();

    const profile = SBIM_CALENDAR_DATA[profileKey];
    if (!profile) return;

    syncUrlPath(getRouteForProfile(profileKey));

    // Adaptar dados de demonstração da prescrição para a faixa etária
    adaptPrescriptionPatientToProfile(profileKey);

    // Atualizar título na Tela 2
    const titleEl = document.getElementById('selectedProfileTitle');
    if (titleEl) {
        if (profileKey === 'baby') {
            titleEl.textContent = 'Recém-Nascido até 9 Meses';
        } else if (profileKey === 'teen') {
            titleEl.textContent = 'Criança e Adolescente';
        } else {
            titleEl.textContent = profile.title.replace(' (20 a 59 anos)', '').replace(' (≥ 60 anos)', '');
        }
    }

    renderMatrixBoard();
    showScreen('screen-vaccines');
    updatePrescriptionBasket();
}

// Alternar Filtro de Rede
function filterCalendar(network) {
    currentNetworkFilter = network;

    document.querySelectorAll('.filter-chip-mini').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === network);
    });

    renderMatrixBoard();
}

// Obter total de doses recomendadas para uma vacina
function getVaccineTotalDoses(vac) {
    if (vac.totalDoses) return vac.totalDoses;
    const doseText = (vac.dose || '').toLowerCase();

    // Se a dose mencionar claramente 3 doses (ex: Hepatite B adulto, HPV adulto)
    if (doseText.includes('3 dose') || doseText.includes('3 doses') || doseText.includes('conferir 3')) {
        return 3;
    }
    // Se a dose mencionar claramente 2 doses (ex: Dengue, Herpes Zóster, Tríplice Viral adulto)
    if (doseText.includes('2 dose') || doseText.includes('2 doses') || doseText.includes('conferir 2') || doseText.includes('sequenciais')) {
        return 2;
    }

    // Demais casos são doses individuais de marco cronológico (1ª Dose, 2ª Dose, Dose Única, Reforço, Anual)
    return 1;
}

// Definir diretamente a quantidade de doses administradas
function setDoseCount(vacId, doseNum, event) {
    if (event) event.stopPropagation();

    const vac = getVaccineById(vacId);
    if (!vac || vac.isDanger) return;

    const total = getVaccineTotalDoses(vac);
    const current = administeredDoses[vacId] || 0;

    // Se clicou na mesma dose atual, remove aquela dose (ex: estava em 1 e clicou em 1 -> vira 0)
    if (current === doseNum) {
        const next = doseNum - 1;
        if (next <= 0) {
            delete administeredDoses[vacId];
        } else {
            administeredDoses[vacId] = next;
        }
    } else {
        administeredDoses[vacId] = Math.min(doseNum, total);
    }

    renderMatrixBoard();
}

// Alternar o status MARK de um QUADRANTE INTEIRO (ex: 6 meses todo, 9 meses todo)
function toggleQuadrant(milestoneId, event) {
    if (event) event.stopPropagation();

    const profile = SBIM_CALENDAR_DATA[currentProfileKey];
    if (!profile) return;

    const milestone = profile.milestones.find(m => m.id === milestoneId);
    if (!milestone) return;

    const validVacinas = milestone.vacinas.filter(v => !v.isDanger);
    if (validVacinas.length === 0) return;

    // Verificar se todas já estão completas
    const allOk = validVacinas.every(v => {
        const total = getVaccineTotalDoses(v);
        return (administeredDoses[v.id] || 0) >= total;
    });

    if (allOk) {
        // Se todas já estavam completas, reseta para 0
        validVacinas.forEach(v => {
            delete administeredDoses[v.id];
        });
    } else {
        // Se alguma estava incompleta, completa todas as doses
        validVacinas.forEach(v => {
            administeredDoses[v.id] = getVaccineTotalDoses(v);
        });
    }

    renderMatrixBoard();
}

// Auxiliar para localizar o marco cronológico de uma vacina
function findMilestoneForVaccine(vacId) {
    const profile = SBIM_CALENDAR_DATA[currentProfileKey];
    if (!profile) return null;
    return profile.milestones.find(m => m.vacinas.some(v => v.id === vacId));
}

// Alternar o status MARK de uma vacina (0 -> Total / Total -> 0)
function toggleMark(vacId, event) {
    if (event) event.stopPropagation();

    const vac = getVaccineById(vacId);
    if (!vac || vac.isDanger) return;

    const total = getVaccineTotalDoses(vac);
    const current = administeredDoses[vacId] || 0;

    // Se é uma vacina multidose ou com regra de doses anteriores e está com 0 doses (pendente),
    // abre imediatamente a triagem de histórico clínico para perguntar as doses anteriores!
    if ((total > 1 || vac.id.includes('dt') || vac.id.includes('fa')) && current === 0) {
        const milestone = findMilestoneForVaccine(vacId);
        openVaccineModal(vac, milestone ? milestone.periodo : '');
        return;
    }

    if (current >= total) {
        // Se já estava completa, desmarca todas
        delete administeredDoses[vacId];
    } else {
        // Marca todas as doses
        administeredDoses[vacId] = total;
    }

    renderMatrixBoard();
}

// Marcar todas as vacinas visíveis como OK (todas as doses completas)
function markAllVisibleOk() {
    const profile = SBIM_CALENDAR_DATA[currentProfileKey];
    if (!profile) return;

    profile.milestones.forEach(milestone => {
        milestone.vacinas.forEach(vac => {
            if (vac.isDanger) return;
            administeredDoses[vac.id] = getVaccineTotalDoses(vac);
        });
    });

    renderMatrixBoard();
}

// Resetar todas as vacinas para Pendente (0 doses)
function resetAllVisible() {
    const profile = SBIM_CALENDAR_DATA[currentProfileKey];
    if (!profile) return;

    profile.milestones.forEach(milestone => {
        milestone.vacinas.forEach(vac => {
            delete administeredDoses[vac.id];
        });
    });

    renderMatrixBoard();
}

// Atualizar Indicadores de Triagem (OK vs Pendente e Barra de Progresso)
function updateTriageStats() {
    const profile = SBIM_CALENDAR_DATA[currentProfileKey];
    if (!profile) return;

    let countComplete = 0;
    let countPartial = 0;
    let countPending = 0;

    profile.milestones.forEach(milestone => {
        milestone.vacinas.forEach(vac => {
            if (vac.isDanger) return;
            const total = getVaccineTotalDoses(vac);
            const taken = administeredDoses[vac.id] || 0;
            if (taken >= total) {
                countComplete++;
            } else if (taken > 0) {
                countPartial++;
            } else {
                countPending++;
            }
        });
    });

    const total = countComplete + countPartial + countPending;
    const percent = total > 0 ? Math.round(((countComplete + (countPartial * 0.5)) / total) * 100) : 0;

    const elOk = document.getElementById('badgeCountOk');
    const elPending = document.getElementById('badgeCountPending');
    const elBar = document.getElementById('progressBarFill');

    if (elOk) {
        if (countPartial > 0) {
            elOk.textContent = `✓ ${countComplete} Em Dia • 🟡 ${countPartial} Parcial (${percent}%)`;
        } else {
            elOk.textContent = `✓ ${countComplete} Em Dia (${percent}%)`;
        }
    }
    if (elPending) elPending.textContent = `⏳ ${countPending} Pendentes`;
    if (elBar) elBar.style.width = `${percent}%`;

    // Atualizar o Cesto Flutuante de Prescrição com as vacinas pendentes
    updatePrescriptionBasket();
}

let currentOpenMilestoneId = null;
const expandedMilestones = new Set();

// Renderizar Tabuleiro de Marcos Cronológicos em Cards 3:4
function renderMatrixBoard() {
    const profile = SBIM_CALENDAR_DATA[currentProfileKey];
    if (!profile) return;

    const board = document.getElementById('calendarMatrixBoard');
    board.innerHTML = '';

    // Atualizar Banner Clínico de Condições Associadas na Tela 2 (Sóbrio / Padrão Hospitalar)
    const bannerEl = document.getElementById('comorbidityActiveBanner');
    const isImmunoGlobal = selectedComorbidities.has('imunossupressao') || selectedComorbidities.has('onco') || selectedComorbidities.has('transplante');
    if (bannerEl) {
        const activeList = Array.from(selectedComorbidities).filter(id => id !== 'nenhuma');
        if (activeList.length > 0) {
            const names = activeList.map(id => {
                const found = COMORBIDADES_LIST.find(c => c.id === id);
                return found ? found.nome.split('/')[0].split('(')[0].trim() : id;
            }).join(' • ');

            bannerEl.style.display = 'flex';
            bannerEl.className = isImmunoGlobal ? 'clinical-condition-banner banner-immuno' : 'clinical-condition-banner';
            bannerEl.innerHTML = `
                <div class="clinical-banner-content">
                    <span class="clinical-banner-prefix">Condição Clínica:</span>
                    <strong class="clinical-banner-name">${names}</strong>
                    <span class="clinical-banner-sep">|</span>
                    ${isImmunoGlobal 
                        ? '<span class="clinical-banner-status status-danger">Vírus Vivo Contraindicado</span>' 
                        : '<span class="clinical-banner-status status-crie">Protocolo CRIE / SBIm Aplicado</span>'}
                </div>
                <button class="btn-clinical-edit" onclick="goToComorbiditiesScreen('${currentProfileKey}')" title="Alterar condições clínicas">
                    Alterar Condições
                </button>
            `;
        } else {
            bannerEl.style.display = 'none';
        }
    }

    // Configurar classes de grid conforme perfil:
    // Bebê (0 a 9m) e Criança (12m a 19a): timeline horizontal
    // Adulto: mode-spacious cols-4 (4 marcos em 1 linha de tela cheia)
    // Gestante: mode-spacious cols-5 (5 marcos em 1 linha de tela cheia)
    // Idoso: mode-spacious cols-4 (4 marcos em 1 linha de tela cheia)
    if (currentProfileKey === 'baby' || currentProfileKey === 'teen') {
        board.className = 'calendar-matrix-board mode-compact';
    } else if (currentProfileKey === 'pregnant') {
        board.className = 'calendar-matrix-board mode-spacious cols-5';
    } else {
        board.className = 'calendar-matrix-board mode-spacious cols-4';
    }

    profile.milestones.forEach(milestone => {
        // Filtrar vacinas desse marco pela rede
        const vacinas = milestone.vacinas.filter(vac => {
            if (currentNetworkFilter === 'all') return true;
            if (currentNetworkFilter === 'sus') return vac.isSus;
            if (currentNetworkFilter === 'private') return vac.isPrivate;
            return true;
        });

        if (vacinas.length === 0) return;

        // Calcular status das vacinas deste marco
        const validVacinas = vacinas.filter(v => !v.isDanger);
        let okCount = 0;
        let partialCount = 0;

        validVacinas.forEach(v => {
            const total = getVaccineTotalDoses(v);
            const taken = administeredDoses[v.id] || 0;
            if (taken >= total) {
                okCount++;
            } else if (taken > 0) {
                partialCount++;
            }
        });

        const allOk = validVacinas.length > 0 && okCount === validVacinas.length;
        const isPartial = !allOk && (partialCount > 0 || okCount > 0);

        // Determinar classes visuais do Card 3:4
        let cardStatusClass = 'card-pending';
        let tagStatusClass = 'tag-pending';
        let statusTagText = `⏳ 0/${validVacinas.length}`;

        if (milestone.isDanger) {
            cardStatusClass = 'card-danger';
            tagStatusClass = 'tag-danger';
            statusTagText = '⛔ Contraindicada';
        } else if (allOk) {
            cardStatusClass = 'card-ok';
            tagStatusClass = 'tag-ok';
            statusTagText = `✓ Em Dia (${okCount}/${validVacinas.length})`;
        } else if (isPartial) {
            cardStatusClass = 'card-partial';
            tagStatusClass = 'tag-partial';
            statusTagText = `🟡 Parcial (${okCount}/${validVacinas.length})`;
        }

        const isExpanded = expandedMilestones.has(milestone.id);

        // Container da Coluna de Fluxograma
        const colEl = document.createElement('div');
        colEl.className = `flow-milestone-column ${isExpanded ? 'col-expanded' : ''}`;
        colEl.id = `flow-col-${milestone.id}`;

        // Card Poster 3:4 (Nó do Fluxograma)
        const card = document.createElement('div');
        card.className = `milestone-poster-card ${cardStatusClass} ${isExpanded ? 'is-expanded' : ''}`;

        // Botão OK no topo do card (exato do diagrama: | | ok)
        let topActionBtn = '';
        if (!milestone.isDanger) {
            topActionBtn = `
                <button class="btn-card-top-ok ${allOk ? 'btn-is-ok' : ''}" onclick="quickMarkMilestone('${milestone.id}', event)" title="Marcar todas como OK">
                    ${allOk ? '✓ OK' : '○ OK'}
                </button>
            `;
        } else {
            topActionBtn = `<span class="badge-danger-mini" title="Contraindicada">⛔</span>`;
        }

        card.innerHTML = `
            <!-- Topo do Card: Emoji e botão OK no canto -->
            <div class="milestone-card-top-row">
                <span class="milestone-badge-icon">${milestone.badgeEmoji || '📅'}</span>
                ${topActionBtn}
            </div>

            <!-- Centro: Título Grande (ex: SAZONAIS, 2 MESES) -->
            <div class="milestone-card-main">
                <h3 class="milestone-big-title">${milestone.periodo}</h3>
            </div>

            <!-- Rodapé: Indicador de Expansão de Fluxo -->
            <div class="milestone-card-footer">
                <span class="milestone-click-hint">${isExpanded ? '▲ FECHAR' : '▼ VACINAS'}</span>
            </div>
        `;

        // Ao clicar no card (fora do botão OK), abre/fecha o fluxo embaixo
        card.onclick = (e) => {
            if (!e.target.closest('.btn-card-top-ok')) {
                toggleMilestoneFlow(milestone.id, e);
            }
        };

        colEl.appendChild(card);

        // Se estiver expandido, renderiza a haste vertical do fluxograma e o bloco de sub-cards
        if (isExpanded) {
            const connectorEl = document.createElement('div');
            connectorEl.className = 'flow-v-connector';
            connectorEl.innerHTML = `
                <div class="flow-stem-line ${allOk ? 'stem-ok' : ''}"></div>
                <div class="flow-stem-arrow ${allOk ? 'stem-ok' : ''}">▼</div>
            `;
            colEl.appendChild(connectorEl);

            const subcardBlock = document.createElement('div');
            subcardBlock.className = 'flow-subcard-block';

            vacinas.forEach(vac => {
                const totalDoses = getVaccineTotalDoses(vac);
                const takenDoses = administeredDoses[vac.id] || 0;
                const vacIsComplete = takenDoses >= totalDoses;
                const vacIsPartial = takenDoses > 0 && !vacIsComplete;

                // Análise de Comorbidades e CRIE para esta vacina específica
                const isImmuno = selectedComorbidities.has('imunossupressao') || selectedComorbidities.has('onco') || selectedComorbidities.has('transplante');
                const isRenal = selectedComorbidities.has('doenca_renal');
                const isCardiacOrPulm = selectedComorbidities.has('cardiopatia') || selectedComorbidities.has('pneumopatia');
                const isAsplenia = selectedComorbidities.has('asplenia');
                const isDiabetic = selectedComorbidities.has('diabetes');

                const vName = (vac.nome || '').toLowerCase();
                const isLiveVirus = (vName.includes('tríplice viral') || vName.includes('varicela') || vName.includes('febre amarela') || vName.includes('dengue') || vName.includes('rotavírus') || vName.includes('bcg') || vac.id.includes('scr') || vac.id.includes('varicela') || vac.id.includes('fa') || vac.id.includes('dengue') || vac.id.includes('rota') || vac.id.includes('bcg'));

                let comorbidityBadge = '';
                const isContraindicated = !!vac.isDanger || (isImmuno && isLiveVirus);

                // Badges de Indicação por Comorbidade (Texto Técnico / Padrão SBIm / Sem Emojis)
                if (!isContraindicated) {
                    if (vName.includes('pneumocócica') || vName.includes('pneumo')) {
                        if (isCardiacOrPulm || isDiabetic || isRenal || isImmuno || isAsplenia) {
                            comorbidityBadge = `<span class="badge-comorbidade-ind" title="Esquema Pneumo 13/23 indicado pelo CRIE devido à comorbidade associada">Indicação por Comorbidade (CRIE)</span>`;
                        }
                    } else if (vName.includes('hepatite b') && (isRenal || isImmuno)) {
                        comorbidityBadge = `<span class="badge-comorbidade-ind" title="Dose especial dobrada (40mcg) indicada pelo CRIE devido à comorbidade">Dose Especial (Comorbidade CRIE)</span>`;
                    } else if ((vName.includes('menacwy') || vName.includes('meningocócica') || vName.includes('menb')) && (isAsplenia || isImmuno)) {
                        comorbidityBadge = `<span class="badge-comorbidade-ind" title="Proteção invasiva prioritária no CRIE devido à comorbidade">Indicação por Comorbidade (CRIE)</span>`;
                    } else if ((vName.includes('influenza') || vName.includes('covid')) && (isCardiacOrPulm || isDiabetic || isRenal || isImmuno)) {
                        comorbidityBadge = `<span class="badge-comorbidade-ind" title="Dose prioritária anual recomendada formalmente pela presença de comorbidade">Indicação por Comorbidade</span>`;
                    }
                }

                // Coluna das Doses à direita
                let dosesHtml = '';
                if (isContraindicated) {
                    let contraReason = 'Contraindicada';
                    if (isImmuno && isLiveVirus) {
                        contraReason = 'Contraindicada (Vírus Vivo)';
                    } else if (vac.isDanger) {
                        contraReason = 'Contraindicada na Gestação';
                    }
                    dosesHtml = `
                        <div class="flow-doses-col">
                            <span class="dose-danger-tag" title="Esta vacina não deve ser administrada sob esta condição clínica">${contraReason}</span>
                        </div>
                    `;
                } else if (totalDoses === 1) {
                    const isTaken = takenDoses >= 1;
                    const doseLabel = vac.dose || 'Dose Única';
                    dosesHtml = `
                        <div class="flow-doses-col">
                            <div class="flow-dose-item ${isTaken ? 'dose-taken' : ''}">
                                <span class="flow-dose-label">${doseLabel}</span>
                                <button class="flow-dose-btn-ok ${isTaken ? 'btn-is-ok' : ''}" onclick="toggleDoseStep('${vac.id}', 1, event)">
                                    ${isTaken ? '✓ OK' : '○ OK'}
                                </button>
                            </div>
                        </div>
                    `;
                } else {
                    let doseItems = '';
                    for (let d = 1; d <= totalDoses; d++) {
                        const isTaken = d <= takenDoses;
                        doseItems += `
                            <div class="flow-dose-item ${isTaken ? 'dose-taken' : ''}">
                                <span class="flow-dose-label">${d}ª Dose</span>
                                <button class="flow-dose-btn-ok ${isTaken ? 'btn-is-ok' : ''}" onclick="toggleDoseStep('${vac.id}', ${d}, event)">
                                    ${isTaken ? '✓ OK' : '○ OK'}
                                </button>
                            </div>
                        `;
                    }
                    dosesHtml = `
                        <div class="flow-doses-col">
                            ${doseItems}
                        </div>
                    `;
                }

                // Tag da rede simplificada
                let netTag = '';
                if (vac.isSus && vac.isPrivate) netTag = `<span class="flow-vac-net">SUS/Priv</span>`;
                else if (vac.isSus) netTag = `<span class="flow-vac-net">SUS</span>`;
                else netTag = `<span class="flow-vac-net">Privada</span>`;

                const rowEl = document.createElement('div');
                rowEl.className = `flow-vac-row ${isContraindicated ? 'row-contraindicated' : ''} ${vacIsComplete ? 'row-complete' : vacIsPartial ? 'row-partial' : ''}`;
                rowEl.innerHTML = `
                    <!-- Caixa da Vacina (Esquerda) -->
                    <div class="flow-vac-box" onclick="openVaccineModal(getVaccineById('${vac.id}'), '${milestone.periodo}')" title="Clique para ver ficha técnica e triagem clínica">
                        <div class="flow-vac-name-wrap">
                            <span class="flow-vac-name">${vac.nome}</span>
                            ${netTag}
                            ${comorbidityBadge}
                        </div>
                        <span class="flow-vac-previne-mini">${vac.previne}</span>
                    </div>

                    <!-- Conector Horizontal (----) -->
                    <div class="flow-h-connector ${isContraindicated ? 'connector-danger' : vacIsComplete ? 'connector-done' : ''}"></div>

                    <!-- Coluna de Doses com OK individual (Direita) -->
                    ${dosesHtml}
                `;

                subcardBlock.appendChild(rowEl);
            });

            colEl.appendChild(subcardBlock);
        }

        board.appendChild(colEl);
    });

    updateTriageStats();
}

// Marcar como OK diretamente no card 3:4 sem precisar entrar nele
function quickMarkMilestone(milestoneId, event) {
    if (event) event.stopPropagation();

    const profile = SBIM_CALENDAR_DATA[currentProfileKey];
    if (!profile) return;

    const milestone = profile.milestones.find(m => m.id === milestoneId);
    if (!milestone || milestone.isDanger) return;

    const validVacinas = milestone.vacinas.filter(v => !v.isDanger);
    if (validVacinas.length === 0) return;

    // Verificar se todas já estavam completas
    const allOk = validVacinas.every(v => {
        const total = getVaccineTotalDoses(v);
        return (administeredDoses[v.id] || 0) >= total;
    });

    if (allOk) {
        // Se já estava completo, reseta para pendente (0)
        validVacinas.forEach(v => {
            delete administeredDoses[v.id];
        });
    } else {
        // Marca todas com doses completas
        validVacinas.forEach(v => {
            administeredDoses[v.id] = getVaccineTotalDoses(v);
        });
    }

    renderMatrixBoard();
    if (currentOpenMilestoneId === milestoneId) {
        openMilestoneDetailModal(milestoneId);
    }
}

// Alternar expansão de sub-cards estilo fluxograma
function toggleMilestoneFlow(milestoneId, event) {
    if (event) event.stopPropagation();
    if (expandedMilestones.has(milestoneId)) {
        expandedMilestones.delete(milestoneId);
    } else {
        expandedMilestones.add(milestoneId);
    }
    renderMatrixBoard();

    if (expandedMilestones.has(milestoneId)) {
        setTimeout(() => {
            const col = document.getElementById(`flow-col-${milestoneId}`);
            if (col) {
                col.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }, 50);
    }
}

// Alternar dose específica (estilo fluxograma |dose 1| ok)
function toggleDoseStep(vacId, doseNum, event) {
    if (event) event.stopPropagation();
    const currentTaken = administeredDoses[vacId] || 0;

    if (currentTaken >= doseNum) {
        // Se já tomou essa dose, desmarca até a anterior
        const newDose = doseNum - 1;
        if (newDose <= 0) {
            delete administeredDoses[vacId];
        } else {
            administeredDoses[vacId] = newDose;
        }
    } else {
        // Marca até essa dose
        administeredDoses[vacId] = doseNum;
    }

    renderMatrixBoard();
}

// Alternar status da vacina direto do sub-card
function toggleVaccineFromSubcard(vacId, event) {
    if (event) event.stopPropagation();
    const vac = getVaccineById(vacId);
    if (!vac) return;

    const total = getVaccineTotalDoses(vac);
    const taken = administeredDoses[vacId] || 0;

    if (taken >= total) {
        delete administeredDoses[vacId];
    } else {
        administeredDoses[vacId] = total;
    }

    renderMatrixBoard();
}

// Marcar dose específica direto do sub-card
function setDoseCountFromSubcard(vacId, doseNum, event) {
    if (event) event.stopPropagation();
    setDoseCount(vacId, doseNum, event);
    renderMatrixBoard();
}

// Abrir Modal com as Opções e Vacinas Detalhadas do Marco Cronológico
function openMilestoneDetailModal(milestoneId) {
    currentOpenMilestoneId = milestoneId;

    const profile = SBIM_CALENDAR_DATA[currentProfileKey];
    if (!profile) return;

    const milestone = profile.milestones.find(m => m.id === milestoneId);
    if (!milestone) return;

    const modal = document.getElementById('milestoneModal');
    if (!modal) return;

    document.getElementById('milestoneModalBadge').textContent = `${milestone.badgeEmoji || '📅'} ${milestone.periodo}`;
    document.getElementById('milestoneModalTitle').textContent = milestone.periodoDetalhe || 'Vacinas Indicadas';

    const bodyEl = document.getElementById('milestoneModalBody');
    bodyEl.innerHTML = '';

    // Filtrar vacinas desse marco pela rede
    const vacinas = milestone.vacinas.filter(vac => {
        if (currentNetworkFilter === 'all') return true;
        if (currentNetworkFilter === 'sus') return vac.isSus;
        if (currentNetworkFilter === 'private') return vac.isPrivate;
        return true;
    });

    // Container da lista
    const listEl = document.createElement('div');
    listEl.className = 'milestone-modal-vac-list';

    vacinas.forEach(vac => {
        const isDanger = !!vac.isDanger;
        const totalDoses = getVaccineTotalDoses(vac);
        const takenDoses = administeredDoses[vac.id] || 0;
        const isComplete = takenDoses >= totalDoses;
        const isPartial = takenDoses > 0 && !isComplete;

        const vacCard = document.createElement('div');
        vacCard.className = `milestone-modal-vac-card ${isDanger ? 'vac-danger' : isComplete ? 'vac-done' : isPartial ? 'vac-partial' : ''}`;

        // Tag da rede
        let netBadge = '';
        if (isDanger) {
            netBadge = `<span class="vac-badge vac-badge-danger">⛔ CONTRAINDICADA</span>`;
        } else if (vac.isSus && vac.isPrivate) {
            netBadge = `<span class="vac-badge vac-badge-both">🔵 SUS + 🟣 Priv</span>`;
        } else if (vac.isSus) {
            netBadge = `<span class="vac-badge vac-badge-sus">🔵 SUS (UBS)</span>`;
        } else {
            netBadge = `<span class="vac-badge vac-badge-private">🟣 Rede Privada</span>`;
        }

        // Pílulas de doses para esquemas com > 1 dose
        let dosePillsHtml = '';
        if (!isDanger && totalDoses > 1) {
            let pills = '';
            for (let d = 1; d <= totalDoses; d++) {
                const active = d <= takenDoses ? 'dose-active' : '';
                pills += `<button class="dose-pill-btn ${active}" onclick="setDoseCountFromModal('${vac.id}', ${d}, event)">${d}ª</button>`;
            }
            dosePillsHtml = `
                <div class="dose-tracker-box" style="margin: 0.2rem 0;">
                    <span class="dose-tracker-label">Doses:</span>
                    <div class="dose-pills-wrap">${pills}</div>
                    <span class="dose-fraction-badge ${isComplete ? 'fraction-ok' : isPartial ? 'fraction-partial' : 'fraction-pending'}">
                        ${takenDoses}/${totalDoses} doses
                    </span>
                </div>
            `;
        }

        // Botão de ação individual
        let actionBtn = '';
        if (isDanger) {
            actionBtn = `<span style="font-size:0.75rem; color:#f87171; font-weight:700;">⛔ NÃO ADMINISTRAR</span>`;
        } else if (totalDoses > 1 || vac.id.includes('dt') || vac.id.includes('fa')) {
            if (isComplete) {
                actionBtn = `<button class="btn-mark-toggle btn-is-ok" onclick="toggleVaccineFromMilestoneModal('${vac.id}', event)">✓ Completa</button>`;
            } else if (isPartial) {
                actionBtn = `<button class="btn-mark-toggle" style="background:rgba(245, 158, 11, 0.2); border-color:#f59e0b; color:#fbbf24;" onclick="openVaccineModal(getVaccineById('${vac.id}'), '${milestone.periodo}')">🟡 ${takenDoses}/${totalDoses} doses</button>`;
            } else {
                actionBtn = `<button class="btn-mark-toggle" onclick="openVaccineModal(getVaccineById('${vac.id}'), '${milestone.periodo}')">❓ Triar Doses Anteriores</button>`;
            }
        } else {
            actionBtn = `
                <button class="btn-mark-toggle ${isComplete ? 'btn-is-ok' : ''}" onclick="toggleVaccineFromMilestoneModal('${vac.id}', event)">
                    ${isComplete ? '✓ OK' : '○ Marcar OK'}
                </button>
            `;
        }

        vacCard.innerHTML = `
            <div class="milestone-modal-vac-header">
                <div>
                    <h4 class="milestone-modal-vac-title" onclick="openVaccineModal(getVaccineById('${vac.id}'), '${milestone.periodo}')" title="Clique para ver ficha técnica e triagem clínica completa">
                        ${vac.nome} ℹ️
                    </h4>
                </div>
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                    ${netBadge}
                    <span class="vac-dose-pill">${vac.dose}</span>
                </div>
            </div>
            <p class="milestone-modal-vac-desc">${vac.previne}</p>
            ${dosePillsHtml}
            <div class="milestone-modal-vac-footer">
                <span style="font-size:0.7rem; color:var(--text-dim);">Via: ${vac.via}</span>
                ${actionBtn}
            </div>
        `;

        listEl.appendChild(vacCard);
    });

    bodyEl.appendChild(listEl);

    // Atualizar botão de marcar todas deste mês no rodapé da modal
    const validVacinas = vacinas.filter(v => !v.isDanger);
    const allOk = validVacinas.length > 0 && validVacinas.every(v => (administeredDoses[v.id] || 0) >= getVaccineTotalDoses(v));
    const btnAllOk = document.getElementById('btnMilestoneModalAllOk');
    if (btnAllOk) {
        if (milestone.isDanger || validVacinas.length === 0) {
            btnAllOk.style.display = 'none';
        } else {
            btnAllOk.style.display = 'inline-flex';
            btnAllOk.className = `btn-modal-toggle-mark ${allOk ? 'btn-is-ok' : ''}`;
            btnAllOk.innerHTML = allOk ? '↺ Desmarcar Todas do Mês' : '✓ Marcar Todas do Mês como OK';
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMilestoneModal() {
    const modal = document.getElementById('milestoneModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleMilestoneBackdropClick(e) {
    if (e.target.id === 'milestoneModal') {
        closeMilestoneModal();
    }
}

function toggleCurrentMilestoneAllOk() {
    if (!currentOpenMilestoneId) return;
    quickMarkMilestone(currentOpenMilestoneId, null);
    openMilestoneDetailModal(currentOpenMilestoneId);
}

function toggleVaccineFromMilestoneModal(vacId, event) {
    if (event) event.stopPropagation();
    const vac = getVaccineById(vacId);
    if (!vac) return;

    const total = getVaccineTotalDoses(vac);
    const taken = administeredDoses[vacId] || 0;

    if (taken >= total) {
        delete administeredDoses[vacId];
    } else {
        administeredDoses[vacId] = total;
    }

    renderMatrixBoard();
    if (currentOpenMilestoneId) {
        openMilestoneDetailModal(currentOpenMilestoneId);
    }
}

function setDoseCountFromModal(vacId, doseNum, event) {
    if (event) event.stopPropagation();
    setDoseCount(vacId, doseNum, event);
    if (currentOpenMilestoneId) {
        openMilestoneDetailModal(currentOpenMilestoneId);
    }
}

// Auxiliar para recuperar o objeto de vacina por ID
function getVaccineById(vacId) {
    const profile = SBIM_CALENDAR_DATA[currentProfileKey];
    if (profile) {
        for (const milestone of profile.milestones) {
            const found = milestone.vacinas.find(v => v.id === vacId);
            if (found) return found;
        }
    }
    for (const pKey in SBIM_CALENDAR_DATA) {
        for (const milestone of SBIM_CALENDAR_DATA[pKey].milestones) {
            const found = milestone.vacinas.find(v => v.id === vacId);
            if (found) return found;
        }
    }
    return null;
}

// Modal de Detalhes da Vacina
function openVaccineModal(vac, milestonePeriodo) {
    currentModalVac = vac;
    currentModalMilestone = milestonePeriodo;

    const modal = document.getElementById('vaccineModal');
    if (!modal) return;

    document.getElementById('modalMilestoneBadge').textContent = milestonePeriodo;
    document.getElementById('modalVacTitle').textContent = vac.nome;
    document.getElementById('modalVacDose').textContent = vac.dose;
    document.getElementById('modalVacPrevine').textContent = vac.previne;
    document.getElementById('modalVacEsquema').textContent = `${vac.via} • ${vac.esquema}`;
    document.getElementById('modalVacNota').textContent = vac.nota;

    const isImmuno = selectedComorbidities.has('imunossupressao') || selectedComorbidities.has('onco') || selectedComorbidities.has('transplante');
    const vName = (vac.nome || '').toLowerCase();
    const isLiveVirus = (vName.includes('tríplice viral') || vName.includes('varicela') || vName.includes('febre amarela') || vName.includes('dengue') || vName.includes('rotavírus') || vName.includes('bcg') || vac.id.includes('scr') || vac.id.includes('varicela') || vac.id.includes('fa') || vac.id.includes('dengue') || vac.id.includes('rota') || vac.id.includes('bcg'));
    const isContraindicated = vac.isDanger || (isImmuno && isLiveVirus);

    // Badge de rede
    const netEl = document.getElementById('modalVacNetwork');
    if (vac.isDanger) {
        netEl.className = 'vac-badge vac-badge-danger';
        netEl.textContent = 'CONTRAINDICADA NA GESTAÇÃO';
    } else if (isImmuno && isLiveVirus) {
        netEl.className = 'vac-badge vac-badge-danger';
        netEl.textContent = 'CONTRAINDICADA EM IMUNODEPRIMIDOS';
    } else if (vac.isSus && vac.isPrivate) {
        netEl.className = 'vac-badge vac-badge-both';
        netEl.textContent = 'SUS + Rede Privada';
    } else if (vac.isSus) {
        netEl.className = 'vac-badge vac-badge-sus';
        netEl.textContent = 'SUS (Gratuito na UBS)';
    } else {
        netEl.className = 'vac-badge vac-badge-private';
        netEl.textContent = 'Rede Privada (SBIm Complementar)';
    }

    // Status no Modal
    const triageBadge = document.getElementById('modalTriageStatus');
    const total = getVaccineTotalDoses(vac);
    const taken = administeredDoses[vac.id] || 0;
    const isComplete = taken >= total;
    const isPartial = taken > 0 && !isComplete;

    if (isContraindicated) {
        triageBadge.style.display = 'inline-block';
        triageBadge.className = 'modal-triage-badge';
        triageBadge.style.background = 'rgba(239, 68, 68, 0.15)';
        triageBadge.style.color = '#f87171';
        triageBadge.style.border = '1px solid rgba(239, 68, 68, 0.4)';
        triageBadge.textContent = 'CONTRAINDICADA (NÃO APLICAR)';
    } else {
        triageBadge.style.display = 'inline-block';
        if (isComplete) {
            triageBadge.className = 'modal-triage-badge triage-ok';
            triageBadge.textContent = `✓ STATUS: EM DIA (${total}/${total})`;
        } else if (isPartial) {
            triageBadge.className = 'modal-triage-badge';
            triageBadge.style.background = 'rgba(245, 158, 11, 0.2)';
            triageBadge.style.color = '#fbbf24';
            triageBadge.style.border = '1px solid rgba(245, 158, 11, 0.4)';
            triageBadge.textContent = `🟡 STATUS: PARCIAL (${taken}/${total} doses)`;
        } else {
            triageBadge.className = 'modal-triage-badge triage-pending';
            triageBadge.style.background = '';
            triageBadge.style.color = '';
            triageBadge.style.border = '';
            triageBadge.textContent = `⏳ STATUS: PENDENTE (0/${total})`;
        }
    }

    // Renderizar Bloco de Triagem de Doses Anteriores (Regra Clínica SBIm)
    renderModalHistoryTriage(vac);

    // Botão de alternar mark no modal
    const btnToggle = document.getElementById('btnModalToggleMark');
    if (isContraindicated) {
        btnToggle.style.display = 'none';
    } else {
        btnToggle.style.display = 'inline-flex';
        btnToggle.className = `btn-modal-toggle-mark ${isComplete ? 'btn-is-ok' : ''}`;
        btnToggle.innerHTML = isComplete ? '↺ Desmarcar Todas as Doses' : '✓ Completar Todas as Doses';
    }

    // Nota de contraindicação
    const noteBox = document.getElementById('modalVacNoteBox');
    if (noteBox) {
        noteBox.className = isContraindicated ? 'modal-note-box note-danger' : 'modal-note-box';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function toggleCurrentModalVaccine() {
    if (!currentModalVac) return;
    const total = getVaccineTotalDoses(currentModalVac);
    const taken = administeredDoses[currentModalVac.id] || 0;
    if (taken >= total) {
        delete administeredDoses[currentModalVac.id];
    } else {
        administeredDoses[currentModalVac.id] = total;
    }
    renderMatrixBoard();
    openVaccineModal(currentModalVac, currentModalMilestone);
}

// Renderizar Pergunta de Triagem de Doses Anteriores no Modal
function renderModalHistoryTriage(vac) {
    const historyBox = document.getElementById('modalHistoryBox');
    if (!historyBox) return;

    if (vac.isDanger) {
        historyBox.style.display = 'none';
        return;
    }

    historyBox.style.display = 'flex';

    const total = getVaccineTotalDoses(vac);
    const current = administeredDoses[vac.id] || 0;
    const optionsEl = document.getElementById('modalHistoryOptions');
    const feedbackEl = document.getElementById('modalHistoryFeedback');
    const feedbackTextEl = document.getElementById('modalFeedbackText');
    const subEl = document.getElementById('modalHistorySub');
    const questionEl = document.getElementById('modalHistoryQuestion');

    optionsEl.innerHTML = '';
    feedbackEl.style.display = 'none';

    // 1. Caso Especial: dT / dTpa Decenal (Antitetânica / Coqueluche)
    if (vac.id.includes('dt') && !vac.id.includes('penta')) {
        subEl.textContent = 'Avaliação de Esquema Primário e Reforço Decenal';
        questionEl.textContent = 'O paciente possui comprovação do esquema primário (3 doses) e reforço nos últimos 10 anos?';

        const opts = [
            {
                badge: '0 doses / Incerto',
                title: '❌ Nunca vacinado ou esquema primário incerto',
                desc: 'Iniciar esquema básico do zero (3 doses: 0, 2 e 4 meses com dT/dTpa).',
                count: 0,
                feedbackType: 'feedback-zero',
                feedback: '⚠️ <strong>Conduta UBS:</strong> Iniciar esquema primário do zero imediatamente com 3 doses. Administrar a 1ª dose hoje e agendar 2ª dose para 60 dias.'
            },
            {
                badge: 'Reforço Atrasado',
                title: '⏳ Esquema primário completo, porém última dose há ≥ 10 anos',
                desc: 'Necessita de 1 dose de reforço imediata com dT ou dTpa.',
                count: 0,
                feedbackType: 'feedback-partial',
                feedback: '📌 <strong>Conduta UBS:</strong> Administrar 1 dose de reforço de dT ou dTpa hoje. Próximo reforço em 10 anos.'
            },
            {
                badge: 'Em Dia',
                title: '🟢 Esquema primário completo e última dose há < 10 anos',
                desc: 'Reforço decenal em dia. Paciente protegido contra Tétano e Difteria.',
                count: 1,
                feedbackType: 'feedback-ok',
                feedback: '✅ <strong>Conduta UBS:</strong> Carteira vacinal em dia para Tétano e Difteria. Agendar próximo reforço para quando completar 10 anos da última dose.'
            }
        ];

        renderOptionsList(opts, vac.id, current);
        return;
    }

    // 2. Caso Especial: Febre Amarela (Regra Vitalícia)
    if (vac.id.includes('fa')) {
        subEl.textContent = 'Avaliação de Dose Única Vitalícia';
        questionEl.textContent = 'O paciente já recebeu alguma dose da vacina de Febre Amarela na vida?';

        const opts = [
            {
                badge: '0 doses',
                title: '❌ Nunca vacinado / Sem comprovante',
                desc: 'Iniciar agora com dose única.',
                count: 0,
                feedbackType: 'feedback-zero',
                feedback: '⚠️ <strong>Conduta UBS:</strong> Administrar dose única de Febre Amarela hoje.'
            },
            {
                badge: 'Reforço Pendente',
                title: '⏳ Tomou apenas 1 dose antes dos 5 anos de idade',
                desc: 'Necessita de 1 dose de reforço aos 4 anos ou na adolescência/adulto.',
                count: 0,
                feedbackType: 'feedback-partial',
                feedback: '📌 <strong>Conduta UBS:</strong> Administrar 1 dose de reforço para garantir imunidade duradoura pela vida toda.'
            },
            {
                badge: 'Dose Vitalícia',
                title: '🟢 Tomou 1 dose aos 5 anos de idade ou mais',
                desc: 'Considerado imunizado para o resto da vida (Dose Única Vitalícia).',
                count: 1,
                feedbackType: 'feedback-ok',
                feedback: '✅ <strong>Conduta UBS:</strong> Paciente com dose única vitalícia comprovada. Não há indicação de revacinação.'
            }
        ];

        renderOptionsList(opts, vac.id, current);
        return;
    }

    // 3. Vacinas Multidose Padrão (2 ou 3 doses: Hepatite B, Dengue, Herpes Zóster, SCR, HPV, etc.)
    if (total > 1) {
        subEl.textContent = `Esquema recomendado: ${total} doses (${vac.dose})`;
        questionEl.textContent = `O paciente já recebeu alguma dose desta vacina anteriormente?`;

        const opts = [
            {
                badge: '0 doses tomadas',
                title: '❌ Não / Nunca vacinado / Iniciar do zero',
                desc: `Iniciar esquema do zero (total de ${total} doses necessárias).`,
                count: 0,
                feedbackType: 'feedback-zero',
                feedback: `⚠️ <strong>Conduta Farmacêutica UBS:</strong> Iniciar esquema do zero imediatamente. Administrar a 1ª dose hoje e registrar agendamento da 2ª dose no cartão.`
            },
            {
                badge: '1 dose tomada',
                title: '🟡 Sim, já tomou 1 dose anteriormente',
                desc: `Falta(m) ${total - 1} dose(s). Esquema vacinal NUNCA se reinicia, apenas se completa!`,
                count: 1,
                feedbackType: 'feedback-partial',
                feedback: `📌 <strong>Conduta Farmacêutica UBS:</strong> Administrar a 2ª dose hoje. <strong>Regra de ouro SBIm:</strong> Esquema vacinal atrasado ou interrompido NUNCA se reinicia independente do tempo decorrido!`
            }
        ];

        if (total >= 3) {
            opts.push({
                badge: '2 doses tomadas',
                title: '🟡 Sim, já tomou 2 doses anteriormente',
                desc: `Falta apenas a 3ª dose para encerramento do esquema primário.`,
                count: 2,
                feedbackType: 'feedback-partial',
                feedback: `📌 <strong>Conduta Farmacêutica UBS:</strong> Administrar a 3ª dose hoje para finalizar o esquema primário.`
            });
        }

        opts.push({
            badge: `${total} doses tomadas`,
            title: `🟢 Sim, já tomou todas as ${total} doses recomendadas`,
            desc: `Esquema completo comprovado em carteira.`,
            count: total,
            feedbackType: 'feedback-ok',
            feedback: `✅ <strong>Conduta Farmacêutica UBS:</strong> Esquema primário completo e comprovado. Paciente imunizado e em dia!`
        });

        renderOptionsList(opts, vac.id, current);
        return;
    }

    // 4. Vacinas de Dose Única ou Pontuais do Mês
    subEl.textContent = 'Verificação de Dose Pontual';
    questionEl.textContent = 'Esta dose já foi administrada ao paciente?';

    const opts = [
        {
            badge: 'Pendente',
            title: '❌ Não administrada (Pendente)',
            desc: 'Dose necessária conforme o calendário da faixa etária.',
            count: 0,
            feedbackType: 'feedback-zero',
            feedback: '⚠️ <strong>Conduta UBS:</strong> Administrar dose hoje conforme indicação do calendário.'
        },
        {
            badge: 'Em Dia',
            title: '🟢 Sim, dose já administrada (Em Dia)',
            desc: 'Dose comprovada no cartão de vacinas.',
            count: 1,
            feedbackType: 'feedback-ok',
            feedback: '✅ <strong>Conduta UBS:</strong> Dose administrada e registrada com sucesso na carteira.'
        }
    ];

    renderOptionsList(opts, vac.id, current);
}

// Auxiliar para gerar os botões de opções de histórico
function renderOptionsList(opts, vacId, currentCount) {
    const optionsEl = document.getElementById('modalHistoryOptions');
    const feedbackEl = document.getElementById('modalHistoryFeedback');
    const feedbackTextEl = document.getElementById('modalFeedbackText');

    opts.forEach(opt => {
        const btn = document.createElement('button');
        const isSelected = (opt.count === currentCount && (currentCount > 0 || !administeredDoses[vacId]));

        let optClass = 'opt-complete';
        if (opt.count === 0) optClass = 'opt-zero';
        else if (opt.count < getVaccineTotalDoses(getVaccineById(vacId))) optClass = 'opt-partial';

        btn.className = `history-option-btn ${optClass} ${isSelected ? 'selected' : ''}`;
        btn.innerHTML = `
            <span class="history-opt-badge">${opt.badge}</span>
            <div class="history-opt-info">
                <span class="history-opt-title">${opt.title}</span>
                <span class="history-opt-desc">${opt.desc}</span>
            </div>
        `;

        btn.onclick = () => {
            if (opt.count === 0) {
                delete administeredDoses[vacId];
            } else {
                administeredDoses[vacId] = opt.count;
            }

            // Exibir feedback clínico imediato
            feedbackEl.className = `history-feedback-box ${opt.feedbackType || ''}`;
            feedbackTextEl.innerHTML = opt.feedback;
            feedbackEl.style.display = 'flex';

            // Atualizar status no cabeçalho do modal
            const triageBadge = document.getElementById('modalTriageStatus');
            const total = getVaccineTotalDoses(getVaccineById(vacId));
            if (triageBadge) {
                if (opt.count >= total) {
                    triageBadge.className = 'modal-triage-badge triage-ok';
                    triageBadge.style.background = '';
                    triageBadge.style.color = '';
                    triageBadge.style.border = '';
                    triageBadge.textContent = `✓ STATUS: EM DIA (${total}/${total})`;
                } else if (opt.count > 0) {
                    triageBadge.className = 'modal-triage-badge';
                    triageBadge.style.background = 'rgba(245, 158, 11, 0.2)';
                    triageBadge.style.color = '#fbbf24';
                    triageBadge.style.border = '1px solid rgba(245, 158, 11, 0.4)';
                    triageBadge.textContent = `🟡 STATUS: PARCIAL (${opt.count}/${total} doses)`;
                } else {
                    triageBadge.className = 'modal-triage-badge triage-pending';
                    triageBadge.style.background = '';
                    triageBadge.style.color = '';
                    triageBadge.style.border = '';
                    triageBadge.textContent = `⏳ STATUS: PENDENTE (0/${total})`;
                }
            }

            // Atualizar botão de completar
            const btnToggle = document.getElementById('btnModalToggleMark');
            if (btnToggle) {
                const isComplete = opt.count >= total;
                btnToggle.className = `btn-modal-toggle-mark ${isComplete ? 'btn-is-ok' : ''}`;
                btnToggle.innerHTML = isComplete ? '↺ Desmarcar Todas as Doses' : '✓ Completar Todas as Doses';
            }

            // Destacar botão clicado
            optionsEl.querySelectorAll('.history-option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            // Atualizar os cards no tabuleiro em tempo real
            renderMatrixBoard();
        };

        optionsEl.appendChild(btn);

        // Se já está selecionado e tem dose > 0, exibe o feedback
        if (isSelected && currentCount > 0) {
            feedbackEl.className = `history-feedback-box ${opt.feedbackType || ''}`;
            feedbackTextEl.innerHTML = opt.feedback;
            feedbackEl.style.display = 'flex';
        }
    });
}

function closeVaccineModal() {
    const modal = document.getElementById('vaccineModal');
    if (modal) {
        modal.classList.remove('active');
        const milestoneModal = document.getElementById('milestoneModal');
        if (!milestoneModal || !milestoneModal.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    }
}

function handleBackdropClick(e) {
    if (e.target.id === 'vaccineModal') {
        closeVaccineModal();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const googleModal = document.getElementById('googleSignInModal');
        if (googleModal && googleModal.classList.contains('active')) {
            closeGoogleSignInModal();
            return;
        }
        const basketModal = document.getElementById('basketPreviewModal');
        if (basketModal && basketModal.classList.contains('active')) {
            closeBasketPreviewModal();
            return;
        }
        const prescModal = document.getElementById('prescriptionDataModal');
        if (prescModal && prescModal.classList.contains('active')) {
            closePrescriptionDataModal();
            return;
        }
        const specialModal = document.getElementById('specialPatientsModal');
        if (specialModal && specialModal.classList.contains('active')) {
            closeSpecialPatientsModal();
            return;
        }
        const vacModal = document.getElementById('vaccineModal');
        if (vacModal && vacModal.classList.contains('active')) {
            closeVaccineModal();
            return;
        }
        const milestoneModal = document.getElementById('milestoneModal');
        if (milestoneModal && milestoneModal.classList.contains('active')) {
            closeMilestoneModal();
        }
    }
});

// Fechar dropdown de autenticação ao clicar fora
document.addEventListener('click', (e) => {
    const wrap = document.getElementById('floatingAuthWrap');
    const dropdown = document.getElementById('authDropdownMenu');
    if (wrap && dropdown && !wrap.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});

// Inicialização da Página e Alternar Tema Claro/Escuro
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');

    if (btn) {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            icon.textContent = isLight ? '☀️' : '🌙';
        });
    }

    // Carregar Estado de Autenticação Google
    loadGoogleAuthState();
    initGoogleAuth();

    // Inicializar Roteamento SPA
    initRouter();
});

// =========================================================================
// ETAPA 3: MOTOR DE PRESCRIÇÃO FARMACÊUTICA DE IMUNOBIOLÓGICOS (CFF 585/586)
// =========================================================================

// Mapeamento Oficial de Marcas Comerciais Sugeridas (Registradas Anvisa / SBIm)
const VACCINE_BRAND_MAP = {
    'menacwy': 'Nimenrix (Pfizer) / MenQuadfi (Sanofi)',
    'menb': 'Bexsero (GSK)',
    'menc': 'NeisVac-C (Pfizer) / Meningitec',
    'influenza': 'Fluarix Tetra (GSK) / Flucelvax (CSL Sequirus)',
    'gripe': 'Fluarix Tetra (GSK) / Flucelvax (CSL Sequirus)',
    'pneumo': 'Prevenar 13 (Pfizer) / Pneumovax 23 (MSD)',
    'pneumocócica': 'Prevenar 13 (Pfizer) / Vaxneuvance 15 (MSD) / Pneumovax 23',
    'zoster': 'Shingrix (GSK)',
    'zóster': 'Shingrix (GSK)',
    'hpv': 'Gardasil 9 (MSD)',
    'dengue': 'Qdenga (Takeda)',
    'dtpa': 'Boostrix (GSK) / Adacel (Sanofi)',
    'dt': 'Dupla Adulto (Instituto Butantan)',
    'hepb': 'Engerix-B (GSK) / Euvax-B',
    'hepatite b': 'Engerix-B (GSK) / Euvax-B',
    'hepa': 'Havrix (GSK) / Vaqta (MSD)',
    'hepatite a': 'Havrix (GSK) / Vaqta (MSD)',
    'varicela': 'Varilrix (GSK) / Varivax (MSD)',
    'catapora': 'Varilrix (GSK) / Varivax (MSD)',
    'scr': 'Priorix (GSK) / M-M-R II (MSD)',
    'tríplice viral': 'Priorix (GSK) / M-M-R II (MSD)',
    'fa': 'Bio-Manguinhos / Stamaril (Sanofi)',
    'febre amarela': 'Bio-Manguinhos / Stamaril (Sanofi)',
    'rota': 'Rotarix (GSK) / RotaTeq (MSD)',
    'rotavírus': 'Rotarix (GSK) / RotaTeq (MSD)',
    'vip': 'Imovax Polio (Sanofi)',
    'pólio': 'Imovax Polio (Sanofi)',
    'bcg': 'BCG Brasil (Fundação Ataulpho de Paiva)',
    'penta': 'Hexyon (Sanofi) / Infanrix Hexa (GSK)',
    'hexa': 'Hexyon (Sanofi) / Infanrix Hexa (GSK)',
    'covid': 'Spikevax (Moderna) / Comirnaty (Pfizer)'
};

// =========================================================================
// SISTEMA DE AUTENTICAÇÃO GOOGLE (BLOQUEIO DE PRESCRIÇÃO PROFISSIONAL)
// =========================================================================
const GOOGLE_AUTH_STORAGE_KEY = 'guia_vacinal_google_auth';
const PRESCRIBERS_REGISTRY_KEY = 'guia_vacinal_prescribers_registry';
const PATIENTS_AUTH_REGISTRY_KEY = 'guia_vacinal_patients_auth_registry';
const REFERRALS_DB_KEY = 'guia_vacinal_referrals_db';

let googleAuthState = {
    isLoggedIn: false,
    userType: 'professional', // 'professional' | 'patient'
    email: '',
    name: '',
    avatar: '👤',
    roleTag: '',
    councilType: 'CRF',
    councilUf: '',
    councilNumber: '',
    cpf: '',
    companyName: '',
    companyCnpj: '',
    birthDate: '',
    referralCode: '',
    bonusMonths: 0,
    subscriptionExpiresAt: '',
    digitalSignature: ''
};

let currentModalRole = 'patient';
let tempGoogleAuthData = { email: '', name: '', picture: '' };
let currentRegistrationRole = 'professional';

// Helpers globais de formatação e sanitização segura (LGPD & Anti-vazamento)
function formatCpfInput(el) {
    if (!el) return;
    let v = el.value.replace(/\D/g, '').slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    el.value = v;
}

function formatCnpjInput(el) {
    if (!el) return;
    let v = el.value.replace(/\D/g, '').slice(0, 14);
    v = v.replace(/^(\d{2})(\d)/, '$1.$2');
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
    v = v.replace(/(\d{4})(\d)/, '$1-$2');
    el.value = v;
}

function maskCpfForDisplay(cpf) {
    if (!cpf) return 'Não informado';
    const digits = cpf.replace(/\D/g, '');
    if (digits.length !== 11) return cpf;
    return `${digits.slice(0, 3)}.***.***-${digits.slice(9, 11)}`;
}

window.formatCpfInput = formatCpfInput;
window.formatCnpjInput = formatCnpjInput;
window.maskCpfForDisplay = maskCpfForDisplay;

// Dados da Sessão e Perfis de Emissão (Estabelecimento, Profissional ou Paciente) - Sem mocks
let userSessionData = {
    role: 'patient', // 'clinic' | 'professional' | 'patient'
    companyName: '',
    companyCnpj: '',
    professionalName: '',
    councilType: 'CRF',
    councilUf: '',
    councilNumber: '',
    professionalCpf: '',
    patientName: '',
    patientBirth: '',
    patientAge: '',
    patientCpf: '',
    configured: false,
    digitalSignature: ''
};

// Sincronizar rótulo de faixa etária baseado no perfil selecionado, sem injetar dados fictícios
function adaptPrescriptionPatientToProfile(profileKey) {
    if (userSessionData.configured && userSessionData.patientAge) return;

    const ageMap = {
        'baby': 'Criança / Bebê (0 a 4 anos)',
        'teen': 'Adolescente (10 a 19 anos)',
        'adult': 'Adulto (20 a 59 anos)',
        'pregnant': 'Gestante',
        'elderly': 'Pessoa Idosa (60+ anos)'
    };
    if (ageMap[profileKey] && !userSessionData.patientAge) {
        userSessionData.patientAge = ageMap[profileKey];
    }
}

// Obter Marca Comercial Sugerida
function getSuggestedBrand(vac) {
    const vName = (vac.nome || '').toLowerCase();
    const vId = (vac.id || '').toLowerCase();

    for (const key in VACCINE_BRAND_MAP) {
        if (vId.includes(key) || vName.includes(key)) {
            return VACCINE_BRAND_MAP[key];
        }
    }
    return "Referência Anvisa / Farmacopeia";
}

// Obter Via e Sítio Anatômico Recomendado
function getVaccinePrescriptionVia(vac) {
    const vName = (vac.nome || '').toLowerCase();
    const isBaby = currentProfileKey === 'baby';

    if (vName.includes('rotavírus') || vName.includes('rota')) {
        return "Via Oral (VO)";
    }
    if (vName.includes('bcg')) {
        return "Intradérmica (ID) (Inserção do músculo deltoide direito)";
    }
    if (vName.includes('varicela') || vName.includes('tríplice viral') || vName.includes('febre amarela')) {
        return "Subcutânea (SC) (Região deltoide ou tríceps)";
    }
    if (isBaby) {
        return "Intramuscular (IM) (Músculo vasto lateral da coxa)";
    }
    return "Intramuscular (IM) (Músculo Deltoide esquerdo/direito)";
}

// Obter Indicação / Justificativa Clínica Direta e Limpa (Sem siglas SBIm/PNI)
function getVaccinePrescriptionJustification(vac) {
    const hasComorbidity = Array.from(selectedComorbidities).some(id => id !== 'nenhuma');
    const vName = (vac.nome || '').toLowerCase();
    const vId = (vac.id || '').toLowerCase();

    // Prioridade por comorbidade clínica
    if (hasComorbidity) {
        const comorbNames = Array.from(selectedComorbidities)
            .filter(id => id !== 'nenhuma')
            .map(id => {
                const found = COMORBIDADES_LIST.find(c => c.id === id);
                return found ? found.nome.split('/')[0].split('(')[0].trim() : id;
            }).join(', ');

        if (vName.includes('pneumo')) {
            return `Indicação prioritária por comorbidade (${comorbNames}): Prevenção de pneumonia e infecções pneumocócicas invasivas.`;
        }
        if (vName.includes('influenza') || vName.includes('gripe')) {
            return `Indicação prioritária por comorbidade (${comorbNames}): Proteção respiratória anual e prevenção de descompensações clínicas.`;
        }
        if (vName.includes('mening') || vName.includes('menacwy') || vName.includes('menb')) {
            return `Indicação prioritária por comorbidade (${comorbNames}): Prevenção de doença meningocócica invasiva.`;
        }
        if (vName.includes('hepatite b')) {
            return `Indicação prioritária por comorbidade (${comorbNames}): Imunização ativa contra hepatite B.`;
        }
        if (vName.includes('zoster') || vName.includes('zóster')) {
            return `Indicação prioritária por comorbidade (${comorbNames}): Prevenção de herpes-zóster e neuropatia.`;
        }
    }

    // Indicações clínicas diretas por vacina
    if (vName.includes('rotavírus') || vId.includes('rota')) {
        return "Prevenção de gastrenterite grave e desidratação por rotavírus.";
    }
    if (vName.includes('pneumo')) {
        return "Prevenção de pneumonia bacteriana, otite e meningite pneumocócica.";
    }
    if (vName.includes('meningocócica b') || vName.includes('menb') || vId.includes('menb')) {
        return "Prevenção de meningite meningocócica e sepse bacteriana pelo sorogrupo B.";
    }
    if (vName.includes('meningocócica acwy') || vName.includes('menacwy') || vId.includes('menacwy')) {
        return "Prevenção de meningite meningocócica pelos sorogrupos A, C, W e Y.";
    }
    if (vName.includes('menc') || vName.includes('meningocócica c')) {
        return "Prevenção de meningite meningocócica pelo sorogrupo C.";
    }
    if (vName.includes('hpv')) {
        return "Prevenção de infecções oncogênicas pelo HPV, verrugas genitais e cânceres associados.";
    }
    if (vName.includes('zoster') || vName.includes('zóster')) {
        return "Prevenção de herpes-zóster e neuralgia pós-herpética.";
    }
    if (vName.includes('dengue')) {
        return "Prevenção de infecção sintomática e formas graves da dengue.";
    }
    if (vName.includes('influenza') || vName.includes('gripe')) {
        return "Imunização anual contra vírus influenza e complicações respiratórias agudas.";
    }
    if (vName.includes('hexa') || vName.includes('penta') || vName.includes('dtpa') || vName.includes('dt')) {
        return "Proteção contra difteria, tétano e coqueluche acelular.";
    }
    if (vName.includes('tríplice viral') || vName.includes('scr') || vId.includes('scr')) {
        return "Imunização protetora contra sarampo, caxumba e rubéola.";
    }
    if (vName.includes('varicela') || vName.includes('catapora')) {
        return "Prevenção da infecção pelo vírus da catapora/varicela.";
    }
    if (vName.includes('febre amarela') || vId.includes('fa')) {
        return "Imunização ativa e proteção contra febre amarela.";
    }
    if (vName.includes('hepatite a')) {
        return "Prevenção da hepatite infecciosa aguda por vírus A.";
    }
    if (vName.includes('hepatite b')) {
        return "Imunização ativa e prevenção contra infecções por hepatite B.";
    }
    if (vName.includes('covid')) {
        return "Proteção e prevenção de complicações e hospitalização por Covid-19.";
    }
    if (vName.includes('bcg')) {
        return "Prevenção de formas graves e disseminadas de tuberculose.";
    }
    if (vName.includes('poliomielite') || vName.includes('vip') || vName.includes('vop')) {
        return "Prevenção da poliomielite e paralisia infantil.";
    }

    if (vac.previne) {
        return `Prevenção de: ${vac.previne}.`;
    }

    // Fallbacks por fase
    if (currentProfileKey === 'pregnant') {
        return "Proteção materno-fetal e transferência de anticorpos ao recém-nascido.";
    }
    if (currentProfileKey === 'elderly') {
        return "Prevenção de infecções bacterianas/virais graves e hospitalizações na terceira idade.";
    }
    if (currentProfileKey === 'baby' || currentProfileKey === 'teen') {
        return "Atualização e complementação do esquema vacinal.";
    }
    return "Atualização e reforço da imunização do adulto.";
}

// Recuperar Lista de Vacinas Faltando para Prescrição (Filtrando Contraindicações)
function getPendingVaccinesForPrescription() {
    const profile = SBIM_CALENDAR_DATA[currentProfileKey];
    if (!profile) return [];

    const isImmuno = selectedComorbidities.has('imunossupressao') || selectedComorbidities.has('onco') || selectedComorbidities.has('transplante');
    const list = [];
    const seenIds = new Set();

    profile.milestones.forEach(milestone => {
        milestone.vacinas.forEach(vac => {
            if (seenIds.has(vac.id)) return;

            const vName = (vac.nome || '').toLowerCase();
            const isLiveVirus = (vName.includes('tríplice viral') || vName.includes('varicela') || vName.includes('febre amarela') || vName.includes('dengue') || vName.includes('rotavírus') || vName.includes('bcg') || vac.id.includes('scr') || vac.id.includes('varicela') || vac.id.includes('fa') || vac.id.includes('dengue') || vac.id.includes('rota') || vac.id.includes('bcg'));
            const isContraindicated = vac.isDanger || (isImmuno && isLiveVirus);

            // Vacinas contraindicadas NÃO podem ser prescritas para administração!
            if (isContraindicated) return;

            const total = getVaccineTotalDoses(vac);
            const taken = administeredDoses[vac.id] || 0;

            if (taken < total) {
                seenIds.add(vac.id);
                let posologia = '';
                if (taken === 0) {
                    if (total === 1) {
                        posologia = vac.dose || 'Dose Única';
                    } else {
                        posologia = `1ª Dose (de ${total} doses recomendadas)`;
                    }
                } else {
                    posologia = `${taken + 1}ª Dose (Esquema em andamento, faltam ${total - taken} dose(s))`;
                }

                list.push({
                    vac: vac,
                    milestone: milestone,
                    totalDoses: total,
                    takenDoses: taken,
                    missingDoses: total - taken,
                    posologia: posologia,
                    marca: getSuggestedBrand(vac),
                    via: getVaccinePrescriptionVia(vac),
                    justificativa: getVaccinePrescriptionJustification(vac),
                    prioridade: 'Imediata'
                });
            }
        });
    });

    return list;
}

// Atualizar o Cesto Flutuante na Tela 2
function updatePrescriptionBasket() {
    const basketBar = document.getElementById('prescriptionBasketBar');
    if (!basketBar) return;

    if (currentActiveScreenId !== 'screen-vaccines') {
        basketBar.style.display = 'none';
        return;
    }

    basketBar.style.display = 'flex';
    const pendingList = getPendingVaccinesForPrescription();
    const count = pendingList.length;

    const countPill = document.getElementById('basketCountPill');
    const subtitle = document.getElementById('basketSubtitle');
    const btnCount = document.getElementById('basketBtnCount');
    const btnAdvance = document.getElementById('btnBasketAdvance');

    if (countPill) {
        if (count > 0) {
            countPill.className = 'basket-count-pill';
            countPill.textContent = `${count} Pendente${count > 1 ? 's' : ''}`;
        } else {
            countPill.className = 'basket-count-pill empty';
            countPill.textContent = '0 Pendentes (Em Dia)';
        }
    }

    if (subtitle) {
        if (count > 0) {
            subtitle.textContent = `${count} imunobiológico(s) pendente(s) identificado(s) para receituário técnico`;
        } else {
            subtitle.textContent = 'Todas as vacinas da faixa etária avaliada constam em dia na triagem';
        }
    }

    if (btnCount) btnCount.textContent = count;

    if (btnAdvance) {
        if (count > 0) {
            btnAdvance.removeAttribute('disabled');
            btnAdvance.innerHTML = 'Gerar prescrição';
        } else {
            btnAdvance.setAttribute('disabled', 'true');
            btnAdvance.innerHTML = 'Gerar prescrição';
        }
    }
}

// =========================================================================
// =========================================================================
// CONTROLES DE ZOOM E VISUALIZADOR DE PDF
// =========================================================================
let currentPrescriptionZoom = 1.0;

function zoomPrescription(delta) {
    currentPrescriptionZoom = Math.max(0.6, Math.min(1.5, Math.round((currentPrescriptionZoom + delta) * 10) / 10));
    applyPrescriptionZoom();
}

function resetPrescriptionZoom() {
    currentPrescriptionZoom = 1.0;
    applyPrescriptionZoom();
}

function applyPrescriptionZoom() {
    const wrap = document.getElementById('prescriptionPaperWrap');
    const zoomLevelEl = document.getElementById('prescriptionZoomLevel');
    if (wrap) {
        wrap.style.transform = `scale(${currentPrescriptionZoom})`;
        wrap.style.transformOrigin = 'top center';
    }
    if (zoomLevelEl) {
        zoomLevelEl.textContent = `${Math.round(currentPrescriptionZoom * 100)}%`;
    }
}

// Disparo Seguro de Impressão e Salvamento em PDF
function triggerDocumentPrint() {
    window.focus();
    try {
        window.print();
    } catch (e) {
        console.warn('Erro ao disparar impressão direta:', e);
        openPrescriptionInNewTab();
    }
}

// Abrir em Nova Guia isolada para Visualização e Impressão Direta
function openPrescriptionInNewTab() {
    const paper = document.getElementById('prescription-paper') || document.getElementById('patient-informative-paper');
    if (!paper) return;

    const newWin = window.open('', '_blank');
    if (!newWin) {
        alert('Por favor, autorize pop-ups no seu navegador para abrir a visualização em nova guia.');
        return;
    }

    const title = userSessionData.role === 'patient' 
        ? 'Relatório Informativo Vacinal' 
        : 'Prescrição Oficial de Imunobiológicos';

    const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Guia Vacinal</title>
    <link rel="stylesheet" href="style.css">
    <style>
        body {
            background: #525659;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 24px 16px 60px 16px;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            overflow-y: auto !important;
        }
        .preview-action-bar {
            background: #1e293b;
            color: #ffffff;
            padding: 10px 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.35);
            width: 100%;
            max-width: 920px;
            justify-content: space-between;
        }
        .btn-print-action {
            background: #00e5a3;
            color: #032117;
            border: none;
            padding: 8px 18px;
            border-radius: 6px;
            font-weight: 800;
            cursor: pointer;
            font-size: 13px;
        }
        .btn-print-action:hover {
            background: #00ffb4;
        }
        #prescription-paper, #patient-informative-paper {
            box-shadow: 0 16px 40px rgba(0,0,0,0.5) !important;
            background: #ffffff !important;
            width: 100%;
            max-width: 920px;
        }
        @media print {
            .preview-action-bar { display: none !important; }
            body { background: #ffffff !important; padding: 0 !important; }
            #prescription-paper, #patient-informative-paper { box-shadow: none !important; }
        }
    </style>
</head>
<body>
    <div class="preview-action-bar">
        <span style="font-weight: 700; font-size: 13px;">📄 Visualizador de Documento A4 • ${title}</span>
        <button class="btn-print-action" onclick="window.print()">🖨️ Imprimir / Salvar em PDF</button>
    </div>
    ${paper.outerHTML}
</body>
</html>`;

    newWin.document.open();
    newWin.document.write(htmlContent);
    newWin.document.close();
}

// Clique em "Gerar prescrição"
function handleGeneratePrescriptionClick() {
    if (!userSessionData.configured) {
        openPrescriptionDataModal();
    } else {
        // Se estiver configurado com perfil profissional mas o usuário não está logado no Google, exigir login
        if ((userSessionData.role === 'clinic' || userSessionData.role === 'professional') && !googleAuthState.isLoggedIn) {
            openPrescriptionDataModal();
            return;
        }
        renderCurrentDocument();
        resetPrescriptionZoom();
        showScreen('screen-prescription');
    }
}

function goToPrescriptionScreen() {
    handleGeneratePrescriptionClick();
}

// Atualizar Visibilidade e Status de Autenticação Google no Formulário de Papel
function refreshRoleAuthVisibility(role) {
    const isProfessionalRole = (role === 'clinic' || role === 'professional');
    const lockBanner = document.getElementById('googleAuthLockBanner');
    const connectedBanner = document.getElementById('googleAuthConnectedBanner');
    const btnSubmit = document.getElementById('btnSubmitRoleForm');

    if (isProfessionalRole) {
        if (googleAuthState.isLoggedIn) {
            if (lockBanner) lockBanner.style.display = 'none';
            if (connectedBanner) connectedBanner.style.display = 'flex';
            if (btnSubmit) {
                btnSubmit.textContent = 'Gerar Prescrição Oficial →';
                btnSubmit.style.background = '';
                btnSubmit.style.borderColor = '';
            }
        } else {
            if (lockBanner) lockBanner.style.display = 'flex';
            if (connectedBanner) connectedBanner.style.display = 'none';
            if (btnSubmit) {
                btnSubmit.textContent = '🔒 Fazer Login com o Google para Emitir';
                btnSubmit.style.background = '#dc2626';
                btnSubmit.style.borderColor = '#b91c1c';
            }
        }
    } else {
        // Papel de Paciente: Acesso Livre (Orientação e Triagem)
        if (lockBanner) lockBanner.style.display = 'none';
        if (connectedBanner) connectedBanner.style.display = 'none';
        if (btnSubmit) {
            btnSubmit.textContent = 'Gerar Relatório Informativo →';
            btnSubmit.style.background = '';
            btnSubmit.style.borderColor = '';
        }
    }
}

// Selecionar Papel/Perfil na Identificação
function selectUserRole(role) {
    currentModalRole = role;

    ['clinic', 'professional', 'patient'].forEach(r => {
        const card = document.getElementById(`roleCard${r.charAt(0).toUpperCase() + r.slice(1)}`);
        if (card) {
            if (r === role) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        }
    });

    const secEst = document.getElementById('sectionEstablishment');
    const secProf = document.getElementById('sectionProfessional');
    const secPat = document.getElementById('sectionPatient');
    const badgeModal = document.getElementById('modalPrescriptionBadge');
    const patientCpfStar = document.getElementById('patientCpfStar');
    const inputPatientCpf = document.getElementById('inputPatientCpf');

    if (role === 'clinic') {
        if (secEst) secEst.style.display = 'block';
        if (secProf) secProf.style.display = 'block';
        if (secPat) secPat.style.display = 'block';
        if (badgeModal) badgeModal.textContent = 'Estabelecimento Habilitado';
        if (patientCpfStar) patientCpfStar.style.display = 'none';
        if (inputPatientCpf) inputPatientCpf.removeAttribute('required');
    } else if (role === 'professional') {
        if (secEst) secEst.style.display = 'none';
        if (secProf) secProf.style.display = 'block';
        if (secPat) secPat.style.display = 'block';
        if (badgeModal) badgeModal.textContent = 'Profissional Habilitado';
        if (patientCpfStar) patientCpfStar.style.display = 'none';
        if (inputPatientCpf) inputPatientCpf.removeAttribute('required');
    } else {
        // patient
        if (secEst) secEst.style.display = 'none';
        if (secProf) secProf.style.display = 'none';
        if (secPat) secPat.style.display = 'block';
        if (badgeModal) badgeModal.textContent = 'Somente Paciente';
        if (patientCpfStar) patientCpfStar.style.display = 'inline';
        if (inputPatientCpf) inputPatientCpf.setAttribute('required', 'true');
    }

    refreshRoleAuthVisibility(role);
}

// Renderizar Documento Atual conforme o Perfil
function renderCurrentDocument() {
    const waPopout = document.getElementById('patientWhatsAppPopout');
    const btnTopWa = document.getElementById('btnTopWhatsApp');
    const badge = document.getElementById('prescriptionScreenBadge');

    if (userSessionData.role === 'patient') {
        renderPatientInformativePaper();
        if (waPopout) waPopout.style.display = 'flex';
        if (btnTopWa) btnTopWa.style.display = 'inline-flex';
        if (badge) badge.textContent = 'Informativo Vacinal • Orientação Individual';
    } else {
        renderPrescriptionPaper();
        if (waPopout) waPopout.style.display = 'none';
        if (btnTopWa) btnTopWa.style.display = 'none';
        if (badge) {
            if (userSessionData.role === 'clinic') {
                badge.textContent = 'Estabelecimento Habilitado • RDC 197/2017';
            } else {
                badge.textContent = `${userSessionData.councilType}/${userSessionData.councilUf} ${userSessionData.councilNumber}`;
            }
        }
    }
}

// Renderizar Folha de Prescrição Oficial (Profissionais e Estabelecimentos)
function renderPrescriptionPaper() {
    const container = document.getElementById('prescriptionPaperWrap');
    if (!container) return;

    const pendingList = getPendingVaccinesForPrescription();
    const today = new Date().toLocaleDateString('pt-BR');

    const comorbActive = Array.from(selectedComorbidities).filter(id => id !== 'nenhuma');
    let comorbText = '';
    if (comorbActive.length > 0) {
        comorbText = comorbActive.map(id => {
            const found = COMORBIDADES_LIST.find(c => c.id === id);
            return found ? found.nome : id;
        }).join(' • ');
    }

    let tableRowsHtml = '';
    if (pendingList.length === 0) {
        tableRowsHtml = `
            <tr>
                <td colspan="6" class="py-6 text-center text-slate-500 italic">
                    ✓ Nenhuma vacina pendente no momento. Todas as imunizações recomendadas para este perfil encontram-se em dia.
                </td>
            </tr>
        `;
    } else {
        tableRowsHtml = pendingList.map(item => `
            <tr class="text-slate-800">
                <td class="py-2.5 px-3 font-bold text-slate-950">${item.vac.nome}</td>
                <td class="py-2.5 px-3 font-semibold text-emerald-800">${item.posologia}</td>
                <td class="py-2.5 px-3 font-medium text-slate-700">${item.marca}</td>
                <td class="py-2.5 px-3">${item.via}</td>
                <td class="py-2.5 px-3">
                    <span class="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                        ${item.prioridade}
                    </span>
                </td>
                <td class="py-2.5 px-3 text-slate-700 text-xs">${item.justificativa}</td>
            </tr>
        `).join('');
    }

    const isClinic = userSessionData.role === 'clinic';
    const prescriberRegistration = `${userSessionData.councilType}/${userSessionData.councilUf} ${userSessionData.councilNumber}`;

    container.innerHTML = `
        <div id="prescription-paper" class="bg-white rounded-2xl border border-slate-300 shadow-md p-8 sm:p-12 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0 print:m-0 text-slate-900 font-sans">
            <div class="border-b-2 border-slate-900 pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-xs font-black uppercase tracking-widest text-emerald-800">
                            ${isClinic ? 'ESTABELECIMENTO HABILITADO À PRESTAÇÃO DE SERVIÇO DE VACINAÇÃO' : 'CONSULTÓRIO PROFISSIONAL DE SAÚDE'}
                        </span>
                        <span class="text-xs text-slate-400">|</span>
                        <span class="text-xs text-slate-600 font-semibold">
                            ${isClinic ? 'RDC ANVISA Nº 197/2017 &amp; REGULAÇÃO' : 'PRESCRIÇÃO TÉCNICA HABILITADA'}
                        </span>
                    </div>
                    <h1 class="text-2xl font-black tracking-tight text-slate-950 uppercase">PRESCRIÇÃO DE IMUNOBIOLÓGICOS</h1>
                    <p class="text-xs text-slate-600 font-medium mt-0.5">Receituário e Recomendação Técnica de Vacinação</p>
                </div>
                <div class="text-left sm:text-right text-xs text-slate-700">
                    ${isClinic ? `
                        <span class="font-extrabold text-sm block">${userSessionData.companyName}</span>
                        <span class="text-slate-600 block">CNPJ: ${userSessionData.companyCnpj}</span>
                        <span class="text-emerald-800 font-semibold block text-[11px]">Serviço de Vacinação Habilitado</span>
                    ` : `
                        <span class="font-extrabold text-sm block">Dr(a). ${userSessionData.professionalName}</span>
                        <span class="text-slate-600 block">${prescriberRegistration}</span>
                        <span class="text-slate-500 block text-[11px]">CPF: ${userSessionData.professionalCpf}</span>
                    `}
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-xs">
                <div>
                    <span class="text-slate-500 uppercase tracking-wider text-[10px] font-bold block">Dados do Paciente:</span>
                    <p class="font-bold text-sm text-slate-950 mt-0.5">${userSessionData.patientName}</p>
                    <p class="text-slate-700">Data de Nascimento / Idade: <span class="font-semibold">${userSessionData.patientBirth || '-'}</span> (${userSessionData.patientAge})</p>
                    <p class="text-slate-700">Documento / CPF: <span class="font-semibold">${userSessionData.patientCpf || 'Não informado'}</span></p>
                    ${comorbText ? `<p class="text-slate-700 mt-1"><span class="font-bold text-emerald-800">Condições Clínicas:</span> ${comorbText}</p>` : ''}
                </div>
                <div>
                    <span class="text-slate-500 uppercase tracking-wider text-[10px] font-bold block">Profissional Prescritor Habilitado:</span>
                    <p class="font-bold text-sm text-slate-950 mt-0.5">Dr(a). ${userSessionData.professionalName}</p>
                    <p class="text-slate-700">Registro Profissional: <span class="font-bold text-emerald-800">${prescriberRegistration}</span></p>
                    <p class="text-slate-700">CPF do Prescritor: <span class="font-semibold">${userSessionData.professionalCpf}</span></p>
                    <p class="text-slate-700">Data da Prescrição: <span class="font-semibold">${today}</span></p>
                </div>
            </div>

            <div class="mb-6">
                <div class="flex items-center justify-between mb-2 border-b border-slate-200 pb-1">
                    <h3 class="text-xs font-bold uppercase tracking-wider text-slate-800">Imunobiológicos Prescritos &amp; Posologia</h3>
                    <span class="text-[10px] text-slate-500 italic">* Ato privativo de prescrição técnica. Registro de lote/validade privativo da dispensação física e aplicação.</span>
                </div>
                <table class="w-full text-xs text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-100 text-slate-700 font-bold border-y border-slate-200">
                            <th class="py-2.5 px-3">Imunobiológico Prescrito</th>
                            <th class="py-2.5 px-3">Dose / Posologia</th>
                            <th class="py-2.5 px-3">Nome Comercial (Marca)</th>
                            <th class="py-2.5 px-3">Via / Aplicação</th>
                            <th class="py-2.5 px-3">Prioridade</th>
                            <th class="py-2.5 px-3">Indicação Clínica</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200">
                        ${tableRowsHtml}
                    </tbody>
                </table>
            </div>

            <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/50 mb-8 text-xs text-slate-700 space-y-1.5">
                <span class="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">Orientações Clínicas e Farmacovigilância:</span>
                <p>• A presente prescrição fundamenta-se na avaliação da situação vacinal prévia e diretrizes técnicas vigentes.</p>
                <p>• A administração deve ser realizada em sala de vacinação habilitada pela Vigilância Sanitária (RDC 197/2017).</p>
                <p>• Recomenda-se aguardar de 15 a 20 minutos no serviço de vacinação após a aplicação para monitoramento preventivo.</p>
                <p>• Qualquer evento adverso pós-vacinal deve ser comunicado ao prescritor para notificação sanitária oficial (Notivisa/VigiMed).</p>
            </div>

            <div class="pt-8 border-t border-slate-300 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs">
                <div class="text-slate-500 text-[11px]">
                    <p>Documento emitido eletronicamente conforme resoluções de regulação da prescrição de imunobiológicos.</p>
                    <p>Guia Vacinal - Sistema de Apoio à Decisão Clínica e Prescrição.</p>
                </div>
                <div class="text-center sm:text-right min-w-[240px] flex flex-col items-center sm:items-end">
                    ${(userSessionData.digitalSignature || googleAuthState.digitalSignature) ? `
                        <div class="mb-1 flex flex-col items-center sm:items-end">
                            <img src="${userSessionData.digitalSignature || googleAuthState.digitalSignature}" alt="Assinatura Digital Dr(a). ${userSessionData.professionalName}" class="h-12 max-w-[200px] object-contain" />
                            <span class="text-[9px] text-emerald-800 font-bold tracking-wider">ASSINATURA DIGITAL REGISTRADA</span>
                        </div>
                    ` : `
                        <div class="h-8"></div>
                    `}
                    <div class="border-b border-slate-400 pb-1 mb-1 font-bold text-slate-950 w-full text-center sm:text-right">Dr(a). ${userSessionData.professionalName}</div>
                    <span class="text-slate-600 block text-[11px]">${prescriberRegistration} • CPF: ${userSessionData.professionalCpf}</span>
                </div>
            </div>
        </div>
    `;

    // Grava automaticamente a prescrição emitida no histórico clínico do profissional
    if (typeof recordCurrentPrescriptionToHistory === 'function') {
        recordCurrentPrescriptionToHistory(pendingList);
    }
}

// Renderizar Relatório Informativo ao Paciente (Caráter Educativo)
function renderPatientInformativePaper() {
    const container = document.getElementById('prescriptionPaperWrap');
    if (!container) return;

    const pendingList = getPendingVaccinesForPrescription();
    const today = new Date().toLocaleDateString('pt-BR');

    const comorbActive = Array.from(selectedComorbidities).filter(id => id !== 'nenhuma');
    let comorbText = 'Nenhuma comorbidade relatada (Calendário de Rotina)';
    if (comorbActive.length > 0) {
        comorbText = comorbActive.map(id => {
            const found = COMORBIDADES_LIST.find(c => c.id === id);
            return found ? found.nome : id;
        }).join(' • ');
    }

    let rowsHtml = '';
    if (pendingList.length === 0) {
        rowsHtml = `
            <tr>
                <td colspan="4" class="py-6 text-center text-slate-500 italic">
                    ✓ Parabéns! Todas as vacinas recomendadas para sua faixa etária constam em dia nesta triagem.
                </td>
            </tr>
        `;
    } else {
        rowsHtml = pendingList.map(item => `
            <tr class="text-slate-800">
                <td class="py-3 px-3 font-bold text-slate-950">${item.vac.nome}</td>
                <td class="py-3 px-3 font-semibold text-emerald-800">${item.posologia}</td>
                <td class="py-3 px-3 font-medium text-slate-700">${item.marca}</td>
                <td class="py-3 px-3 text-slate-700 text-xs">${item.justificativa}</td>
            </tr>
        `).join('');
    }

    container.innerHTML = `
        <div id="patient-informative-paper" class="bg-white rounded-2xl border border-slate-300 shadow-md p-8 sm:p-12 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0 print:m-0 text-slate-900 font-sans">
            <div class="informative-header flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                    <span class="informative-badge">CONSULTA VACINAL • ORIENTAÇÃO PREVENTIVA INDIVIDUAL</span>
                    <h1 class="informative-title">RELATÓRIO DE ORIENTAÇÃO VACINAL AO PACIENTE</h1>
                    <p class="informative-subtitle">Documento de Triagem Clínica Preventiva • Caráter Exclusivamente Informativo</p>
                </div>
                <div class="text-left sm:text-right text-xs text-slate-600">
                    <span class="font-bold block text-slate-900">Emissão: ${today}</span>
                    <span class="text-[11px] block">Perfil Avaliado: ${userSessionData.patientAge}</span>
                </div>
            </div>

            <!-- ALERTA LEGAL E CLÍNICO OBRIGATÓRIO -->
            <div class="informative-alert-box">
                <div class="informative-alert-header">
                    <span class="informative-alert-badge">⚠️ CARÁTER ESTRITAMENTE INFORMATIVO</span>
                    <strong class="informative-alert-title">Aviso Importante: Não substitui prescrição profissional</strong>
                </div>
                <p class="informative-alert-body">
                    Este documento reúne orientações preventivas com base nos calendários oficiais de imunização. 
                    <strong>Não possui validade de receituário e não autoriza a aplicação direta sem avaliação.</strong> 
                    Para receber qualquer vacina com segurança, <strong>é indispensável consultar presencialmente um profissional de saúde habilitado (médico ou farmacêutico em estabelecimento credenciado)</strong> para confirmação de contraindicações individuais, emissão da prescrição técnica oficial e acompanhamento pós-vacinal.
                </p>
            </div>

            <!-- IDENTIFICAÇÃO DO PACIENTE -->
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <span class="text-slate-500 uppercase tracking-wider text-[10px] font-bold block">Identificação do Paciente:</span>
                    <p class="font-bold text-sm text-slate-950 mt-0.5">${userSessionData.patientName}</p>
                    <p class="text-slate-700">Documento / CPF: <span class="font-semibold">${userSessionData.patientCpf ? maskCpfForDisplay(userSessionData.patientCpf) : 'Não informado'}</span></p>
                    <p class="text-slate-700">Idade / Fase: <span class="font-semibold">${userSessionData.patientAge}</span> ${userSessionData.patientBirth ? `(${userSessionData.patientBirth})` : ''}</p>
                </div>
                <div>
                    <span class="text-slate-500 uppercase tracking-wider text-[10px] font-bold block">Condições Clínicas / Comorbidades Declaradas:</span>
                    <p class="text-slate-800 font-medium mt-1 leading-relaxed">${comorbText}</p>
                </div>
            </div>

            <!-- TABELA DE VACINAS PENDENTES -->
            <div class="mb-6">
                <div class="flex items-center justify-between mb-2 border-b border-slate-200 pb-1">
                    <h3 class="text-xs font-bold uppercase tracking-wider text-slate-800">Vacinas Recomendadas para o seu Perfil (${pendingList.length})</h3>
                    <span class="text-[10px] text-slate-500 italic">* Apresente este relatório ao profissional de saúde.</span>
                </div>
                <table class="w-full text-xs text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-100 text-slate-700 font-bold border-y border-slate-200">
                            <th class="py-2.5 px-3">Vacina Recomendada</th>
                            <th class="py-2.5 px-3">Dose / Posologia</th>
                            <th class="py-2.5 px-3">Nome Comercial (Marca)</th>
                            <th class="py-2.5 px-3">Indicação Clínica</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200">
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>

            <!-- CTA BOX PARA WHATSAPP -->
            <div class="informative-cta-box">
                <div class="cta-box-left">
                    <span class="cta-box-icon">🩺</span>
                    <div>
                        <h4 class="cta-box-title">Precisa da sua Prescrição Oficial?</h4>
                        <p class="cta-box-desc">
                            Você pode encaminhar os dados desta triagem diretamente para um profissional de saúde habilitado avaliar seu perfil clínico e providenciar sua prescrição técnica.
                        </p>
                    </div>
                </div>
                <button class="btn-doc-whatsapp" onclick="openWhatsAppPrescription()">
                    💬 Solicitar Prescrição via WhatsApp
                </button>
            </div>

            <!-- ORIENTAÇÕES GERAIS -->
            <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/50 mb-8 text-xs text-slate-700 space-y-1">
                <span class="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">Passos Recomendados para Vacinar:</span>
                <p>1. Leve seu documento oficial com foto e carteira de vacinação anterior ao serviço de saúde.</p>
                <p>2. Informe ao profissional se você apresenta febre, alergias a componentes vacinais ou uso de medicamentos contínuos.</p>
                <p>3. Respeite os intervalos mínimos preconizados entre doses para garantir a proteção imunológica completa.</p>
            </div>

            <div class="pt-6 border-t border-slate-300 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
                <p>Guia Vacinal • Calendários e Diretrizes Técnicas de Imunização.</p>
                <p>Documento gerado para orientação individual do paciente.</p>
            </div>
        </div>
    `;
}

// Gerador da URL e Mensagem do WhatsApp com Dados Clínicos (Sem vazamento de CPF - LGPD)
function generateWhatsAppPrescriptionUrl() {
    const pending = getPendingVaccinesForPrescription();
    const patientName = userSessionData.patientName || 'Paciente';
    const patientAge = userSessionData.patientAge || 'Não informada';

    const comorbActive = Array.from(selectedComorbidities).filter(id => id !== 'nenhuma');
    let comorbStr = "Nenhuma comorbidade relatada (Rotina de Imunização)";
    if (comorbActive.length > 0) {
        comorbStr = comorbActive.map(id => {
            const found = COMORBIDADES_LIST.find(c => c.id === id);
            return found ? found.nome.split('/')[0].trim() : id;
        }).join(', ');
    }

    let vacinasTexto = "";
    if (pending.length > 0) {
        vacinasTexto = pending.map((item, idx) => {
            return `${idx + 1}. *${item.vac.nome}*\n   • *Dose:* ${item.posologia}\n   • *Nome comercial:* ${item.marca}\n   • *Indicação:* ${item.justificativa}`;
        }).join('\n\n');
    } else {
        vacinasTexto = "Todas as vacinas avaliadas constam em dia.";
    }

    const mensagem = 
`🩺 *SOLICITAÇÃO DE PRESCRIÇÃO VACINAL*
Olá! Realizei a triagem no Guia Vacinal e gostaria de solicitar a avaliação de um profissional de saúde habilitado para emissão da prescrição e agendamento da vacinação.

👤 *DADOS PARA TRIAGEM:*
• *Paciente:* ${patientName}
• *Faixa Etária / Perfil:* ${patientAge}
• *Condições Clínicas:* ${comorbStr}

💉 *VACINAS IDENTIFICADAS NA TRIAGEM (${pending.length}):*
${vacinasTexto}

Aguardo orientações para emissão da prescrição técnica oficial e vacinação. Obrigado!`;

    const encoded = encodeURIComponent(mensagem);
    return `https://api.whatsapp.com/send?phone=5521982212654&text=${encoded}`;
}

// Abrir WhatsApp com Mensagem Pré-formatada
function openWhatsAppPrescription() {
    const url = generateWhatsAppPrescriptionUrl();
    window.open(url, '_blank');
}

// Fechar Popout Flutuante do WhatsApp
function closeWhatsAppPopout() {
    const popout = document.getElementById('patientWhatsAppPopout');
    if (popout) popout.style.display = 'none';
}

// Modal de Identificação / Edição de Dados
function openPrescriptionDataModal() {
    const modal = document.getElementById('prescriptionDataModal');
    if (!modal) return;

    if (userSessionData.companyName) {
        const el = document.getElementById('inputCompanyName');
        if (el) el.value = userSessionData.companyName;
    }
    if (userSessionData.companyCnpj) {
        const el = document.getElementById('inputCompanyCnpj');
        if (el) el.value = userSessionData.companyCnpj;
    }
    if (userSessionData.professionalName) {
        const el = document.getElementById('inputProfessionalName');
        if (el) el.value = userSessionData.professionalName;
    }
    if (userSessionData.professionalCpf) {
        const el = document.getElementById('inputProfessionalCpf');
        if (el) el.value = userSessionData.professionalCpf;
    }
    if (userSessionData.councilType) {
        const el = document.getElementById('inputCouncilType');
        if (el) el.value = userSessionData.councilType;
    }
    if (userSessionData.councilUf) {
        const el = document.getElementById('inputCouncilUf');
        if (el) el.value = userSessionData.councilUf;
    }
    if (userSessionData.councilNumber) {
        const el = document.getElementById('inputCouncilNumber');
        if (el) el.value = userSessionData.councilNumber;
    }
    if (userSessionData.patientName) {
        const el = document.getElementById('inputPatientName');
        if (el) el.value = userSessionData.patientName;
    }
    if (userSessionData.patientCpf) {
        const el = document.getElementById('inputPatientCpf');
        if (el) el.value = userSessionData.patientCpf;
    }
    if (userSessionData.patientAge) {
        const el = document.getElementById('inputPatientAge');
        if (el) el.value = userSessionData.patientAge;
    }
    if (userSessionData.patientBirth) {
        const el = document.getElementById('inputPatientBirth');
        if (el) el.value = userSessionData.patientBirth;
    }

    selectUserRole(userSessionData.role || 'patient');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePrescriptionDataModal() {
    const modal = document.getElementById('prescriptionDataModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handlePrescriptionDataModalBackdropClick(e) {
    if (e.target.id === 'prescriptionDataModal') {
        closePrescriptionDataModal();
    }
}

// Salvar Dados do Formulário de Identificação
function savePrescriptionData(event) {
    if (event) event.preventDefault();

    const role = currentModalRole || 'patient';
    userSessionData.role = role;

    // REGRA DE BLOQUEIO ABSOLUTO: Prescrição profissional exige autenticação Google
    if ((role === 'clinic' || role === 'professional') && !googleAuthState.isLoggedIn) {
        openGoogleSignInModal();
        return;
    }

    if (role === 'clinic') {
        const cName = document.getElementById('inputCompanyName').value.trim();
        const cCnpj = document.getElementById('inputCompanyCnpj').value.trim();
        const pName = document.getElementById('inputProfessionalName').value.trim();
        const pCpf = document.getElementById('inputProfessionalCpf').value.trim();
        const cNum = document.getElementById('inputCouncilNumber').value.trim();

        if (!cName || !cCnpj) {
            alert('Por favor, preencha a Razão Social e o CNPJ do estabelecimento.');
            return;
        }
        if (!pName || !pCpf || !cNum) {
            alert('Por favor, preencha os dados do profissional de saúde prescritor (Nome, Conselho, UF, Nº e CPF).');
            return;
        }

        userSessionData.companyName = cName;
        userSessionData.companyCnpj = cCnpj;
        userSessionData.professionalName = pName;
        userSessionData.professionalCpf = pCpf;
        userSessionData.councilType = document.getElementById('inputCouncilType').value;
        userSessionData.councilUf = document.getElementById('inputCouncilUf').value;
        userSessionData.councilNumber = cNum;
    } else if (role === 'professional') {
        const pName = document.getElementById('inputProfessionalName').value.trim();
        const pCpf = document.getElementById('inputProfessionalCpf').value.trim();
        const cNum = document.getElementById('inputCouncilNumber').value.trim();

        if (!pName || !pCpf || !cNum) {
            alert('Por favor, preencha os dados do profissional de saúde prescritor (Nome, Conselho, UF, Nº e CPF).');
            return;
        }

        userSessionData.professionalName = pName;
        userSessionData.professionalCpf = pCpf;
        userSessionData.councilType = document.getElementById('inputCouncilType').value;
        userSessionData.councilUf = document.getElementById('inputCouncilUf').value;
        userSessionData.councilNumber = cNum;
    } else {
        // patient
        const patName = document.getElementById('inputPatientName').value.trim();
        const patCpf = document.getElementById('inputPatientCpf').value.trim();
        const patAge = document.getElementById('inputPatientAge').value.trim();

        if (!patName || !patCpf || !patAge) {
            alert('Por favor, informe seu Nome Completo, CPF e Idade.');
            return;
        }
    }

    userSessionData.patientName = document.getElementById('inputPatientName').value.trim() || 'Paciente';
    userSessionData.patientCpf = document.getElementById('inputPatientCpf').value.trim() || '';
    userSessionData.patientAge = document.getElementById('inputPatientAge').value.trim() || '';
    userSessionData.patientBirth = document.getElementById('inputPatientBirth').value.trim() || '';
    userSessionData.configured = true;

    closePrescriptionDataModal();
    renderCurrentDocument();
    showScreen('screen-prescription');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Modal de Pré-visualização Rápida dos Itens do Cesto
function openBasketPreviewModal() {
    const modal = document.getElementById('basketPreviewModal');
    if (!modal) return;

    const pendingList = getPendingVaccinesForPrescription();
    document.getElementById('basketModalCount').textContent = pendingList.length;

    const listEl = document.getElementById('basketPreviewItemsList');
    listEl.innerHTML = '';

    if (pendingList.length === 0) {
        listEl.innerHTML = `
            <div class="py-4 text-center text-slate-400 italic">
                Nenhuma vacina pendente no momento. Todas as imunizações deste perfil estão em dia!
            </div>
        `;
    } else {
        pendingList.forEach(item => {
            const row = document.createElement('div');
            row.className = 'basket-preview-row';
            row.innerHTML = `
                <div class="basket-item-main">
                    <span class="basket-item-name">${item.vac.nome}</span>
                    <span class="basket-item-meta">${item.posologia} • ${item.marca}</span>
                </div>
                <span class="basket-item-tag">${item.prioridade}</span>
            `;
            listEl.appendChild(row);
        });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBasketPreviewModal() {
    const modal = document.getElementById('basketPreviewModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleBasketModalBackdropClick(e) {
    if (e.target.id === 'basketPreviewModal') {
        closeBasketPreviewModal();
    }
}

// =========================================================================
// MÉTODOS DE GERENCIAMENTO DE AUTENTICAÇÃO GOOGLE EM 3 ETAPAS
// =========================================================================

const DEFAULT_GOOGLE_CLIENT_ID = '986855077085-n9sgr3399521gfo9mc5h1lggjvj3gbnt.apps.googleusercontent.com';
let googleClientId = DEFAULT_GOOGLE_CLIENT_ID;

function parseJwt(token) {
    if (!token) return null;
    try {
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.warn('Erro ao decodificar JWT Google:', e);
        return null;
    }
}

async function initGoogleAuth() {
    try {
        const resp = await fetch('/api/auth/google/config');
        if (resp.ok) {
            const data = await resp.json();
            if (data && data.clientId) {
                googleClientId = data.clientId.trim();
            }
        }
    } catch (err) {
        // Ambiente estático (ex: GitHub Pages), mantém DEFAULT_GOOGLE_CLIENT_ID
    }

    // Inicializar Google Identity Services (GIS) caso a biblioteca esteja pronta
    setupGoogleIdentityServices();

    // Listener para mensagens da janela popup OAuth (/auth/callback)
    window.addEventListener('message', (event) => {
        if (!event.data) return;
        if (event.data.type === 'OAUTH_AUTH_SUCCESS') {
            handleOAuthPopupCallbackSuccess(event.data);
        }
    });

    // Verificar se usuário acessou por link de indicação
    checkPendingReferral();
}

function setupGoogleIdentityServices() {
    if (typeof window.google === 'undefined' || !window.google.accounts || !window.google.accounts.id) {
        // Tenta novamente após pequeno intervalo caso o script gsi/client ainda esteja carregando
        setTimeout(setupGoogleIdentityServices, 300);
        return;
    }

    if (!googleClientId) {
        return;
    }

    try {
        window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true
        });

        const officialSlot = document.getElementById('gsiOfficialRenderSlot');
        if (officialSlot) {
            officialSlot.innerHTML = '';
            window.google.accounts.id.renderButton(officialSlot, {
                theme: 'outline',
                size: 'large',
                type: 'standard',
                text: 'continue_with',
                shape: 'rectangular',
                locale: 'pt-BR',
                width: 320
            });

            // Se o botão oficial for renderizado pelo Google com sucesso, oculta o botão customizado
            setTimeout(() => {
                if (officialSlot.children && officialSlot.children.length > 0) {
                    const nativeBtn = document.getElementById('btnGoogleNativeAction');
                    if (nativeBtn) nativeBtn.style.display = 'none';
                }
            }, 350);
        }
    } catch (e) {
        console.warn('Erro ao inicializar GIS:', e);
    }
}

function handleGoogleCredentialResponse(response) {
    if (!response || !response.credential) {
        console.warn('Resposta de credencial Google vazia.');
        return;
    }

    const payload = parseJwt(response.credential);
    if (!payload || !payload.email) {
        alert('Não foi possível ler as credenciais da Conta Google.');
        return;
    }

    const email = payload.email;
    const name = payload.name || payload.given_name || email.split('@')[0];
    const picture = payload.picture || '';

    processVerifiedGoogleIdentity(email, name, picture);
}

function handleOAuthPopupCallbackSuccess(data) {
    if (data.error) {
        alert(`Erro na autenticação Google: ${data.error}`);
        return;
    }

    let email = '';
    let name = '';
    let picture = '';

    if (data.idToken) {
        const payload = parseJwt(data.idToken);
        if (payload) {
            email = payload.email;
            name = payload.name || email.split('@')[0];
            picture = payload.picture || '';
        }
    }

    if (!email && data.accessToken) {
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { 'Authorization': `Bearer ${data.accessToken}` }
        })
        .then(res => res.json())
        .then(profile => {
            if (profile && profile.email) {
                processVerifiedGoogleIdentity(profile.email, profile.name || profile.email.split('@')[0], profile.picture || '');
            }
        })
        .catch(err => {
            console.warn('Erro ao consultar userinfo Google:', err);
        });
        return;
    }

    if (email) {
        processVerifiedGoogleIdentity(email, name, picture);
    }
}

function processVerifiedGoogleIdentity(email, name, picture) {
    tempGoogleAuthData = { email: email.trim(), name: name.trim(), picture: picture || '' };

    // 1. Verificar se já possui cadastro prévio como Profissional
    try {
        const regSaved = localStorage.getItem(PRESCRIBERS_REGISTRY_KEY);
        const registry = regSaved ? JSON.parse(regSaved) : {};
        const existingProf = registry[email.toLowerCase()];

        if (existingProf && existingProf.councilNumber) {
            googleAuthState = {
                isLoggedIn: true,
                userType: 'professional',
                email: email,
                name: existingProf.name || name,
                avatar: picture || existingProf.picture || '🩺',
                roleTag: `${existingProf.councilType}/${existingProf.councilUf} ${existingProf.councilNumber}`,
                councilType: existingProf.councilType,
                councilUf: existingProf.councilUf,
                councilNumber: existingProf.councilNumber,
                cpf: existingProf.cpf || '',
                companyName: existingProf.companyName || '',
                companyCnpj: existingProf.companyCnpj || '',
                birthDate: '',
                referralCode: existingProf.referralCode || generateUserReferralCode(email),
                bonusMonths: existingProf.bonusMonths || 0,
                subscriptionExpiresAt: existingProf.subscriptionExpiresAt || '',
                digitalSignature: existingProf.digitalSignature || ''
            };
            saveGoogleAuthState();
            syncGoogleDataToPrescriptionForm();
            closeGoogleSignInModal();
            return;
        }
    } catch (e) {
        console.warn('Erro ao verificar registro de profissionais:', e);
    }

    // 2. Verificar se já possui cadastro prévio como Paciente
    try {
        const patSaved = localStorage.getItem(PATIENTS_AUTH_REGISTRY_KEY);
        const patRegistry = patSaved ? JSON.parse(patSaved) : {};
        const existingPatient = patRegistry[email.toLowerCase()];

        if (existingPatient && existingPatient.cpf) {
            googleAuthState = {
                isLoggedIn: true,
                userType: 'patient',
                email: email,
                name: existingPatient.name || name,
                avatar: picture || existingPatient.picture || '👤',
                roleTag: 'Paciente Cadastrado',
                councilType: '',
                councilUf: '',
                councilNumber: '',
                cpf: existingPatient.cpf || '',
                companyName: '',
                companyCnpj: '',
                birthDate: existingPatient.birthDate || '',
                referralCode: existingPatient.referralCode || generateUserReferralCode(email),
                bonusMonths: existingPatient.bonusMonths || 0,
                subscriptionExpiresAt: existingPatient.subscriptionExpiresAt || ''
            };
            saveGoogleAuthState();
            closeGoogleSignInModal();
            return;
        }
    } catch (e) {
        console.warn('Erro ao verificar registro de pacientes:', e);
    }

    // 3. Novo cadastro: Preenche o resumo da conta conectada na Etapa 2
    const step2Avatar = document.getElementById('step2Avatar');
    const step2Name = document.getElementById('step2Name');
    const step2Email = document.getElementById('step2Email');

    if (step2Avatar) {
        if (picture) {
            step2Avatar.innerHTML = `<img src="${picture}" alt="Avatar Google" style="width:36px;height:36px;border-radius:50%;object-fit:cover;">`;
        } else {
            step2Avatar.textContent = '👤';
        }
    }
    if (step2Name) step2Name.textContent = name;
    if (step2Email) step2Email.textContent = email;

    goToGoogleStep(2);
}

function showGoogleOriginNotice() {
    const noticeEl = document.getElementById('googleAuthOriginNotice');
    if (noticeEl) {
        noticeEl.style.display = 'block';
        noticeEl.innerHTML = `
            <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 8px; padding: 10px 14px; font-size: 0.82rem; color: var(--text-primary, #1e293b); margin: 10px 0 14px 0; text-align: left; line-height: 1.45;">
                <div style="font-weight: 600; color: #b45309; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                    <span>⚠️</span> Orientação para o Domínio Personalizado
                </div>
                <div>Para o pop-up nativo do Google abrir diretamente no domínio <strong>${window.location.host}</strong>, cadastre <code>${window.location.origin}</code> nas <em>Origens JavaScript Autorizadas</em> no painel do <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;">Google Cloud Console</a>.</div>
                <div style="margin-top: 6px; font-weight: 500; color: #047857;">👉 Você pode prosseguir agora mesmo informando seu e-mail e nome nos campos abaixo:</div>
            </div>
        `;
    }
}

async function triggerGoogleLoginFlow() {
    // 1. Tentar OAuth2 Token Client client-side (oficial do Google Identity Services para Web/SPA)
    if (window.google && window.google.accounts && window.google.accounts.oauth2 && googleClientId) {
        try {
            const tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: googleClientId,
                scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
                prompt: 'select_account',
                callback: async (tokenResponse) => {
                    if (tokenResponse && tokenResponse.error) {
                        console.warn('Google OAuth Token error:', tokenResponse.error);
                        if (tokenResponse.error !== 'access_denied') {
                            showGoogleOriginNotice();
                        }
                        return;
                    }
                    if (tokenResponse && tokenResponse.access_token) {
                        try {
                            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                                headers: { 'Authorization': `Bearer ${tokenResponse.access_token}` }
                            });
                            const profile = await res.json();
                            if (profile && profile.email) {
                                processVerifiedGoogleIdentity(
                                    profile.email,
                                    profile.name || profile.given_name || profile.email.split('@')[0],
                                    profile.picture || ''
                                );
                                return;
                            }
                        } catch (err) {
                            console.warn('Erro ao consultar perfil Google:', err);
                        }
                    }
                },
                error_callback: (err) => {
                    console.warn('Erro no Google OAuth Token Client:', err);
                    showGoogleOriginNotice();
                }
            });
            tokenClient.requestAccessToken({ prompt: 'select_account' });
            return;
        } catch (e) {
            console.warn('Erro ao disparar initTokenClient:', e);
        }
    }

    // 2. Tentar fluxo oficial de popup via servidor se houver endpoint ativo (ex: AI Studio)
    try {
        const resp = await fetch('/api/auth/google/url');
        if (resp.ok) {
            const data = await resp.json();
            if (data && data.configured && data.url) {
                const width = 520;
                const height = 640;
                const left = window.screen.width / 2 - width / 2;
                const top = window.screen.height / 2 - height / 2;
                const popup = window.open(
                    data.url,
                    'google_oauth_popup',
                    `width=${width},height=${height},top=${top},left=${left},menubar=no,status=no,toolbar=no`
                );
                if (popup) return;
            }
        }
    } catch (e) {
        // Silencioso em ambiente estático
    }

    // 3. Se GIS estiver inicializado, tentar prompt One Tap
    if (window.google && window.google.accounts && window.google.accounts.id && googleClientId) {
        try {
            window.google.accounts.id.prompt();
        } catch (e) {
            console.warn('Erro no prompt GIS:', e);
        }
    }

    // 4. Fallback inteligente: exibir aviso se aplicável e focar no campo de e-mail e nome
    showGoogleOriginNotice();
    const emailInput = document.getElementById('step1GoogleEmail');
    if (emailInput) {
        emailInput.focus();
        emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function fillDemoGoogleAccount() {
    const demoEmail = 'lacee.mds@gmail.com';
    const demoName = 'Dr. Walace Mendes dos Santos';

    tempGoogleAuthData = {
        email: demoEmail,
        name: demoName,
        picture: ''
    };

    googleAuthState = {
        isLoggedIn: true,
        userType: 'professional',
        email: demoEmail,
        name: demoName,
        avatar: '🩺',
        roleTag: 'CRF/RJ 12345',
        councilType: 'CRF',
        councilUf: 'RJ',
        councilNumber: '12345',
        cpf: '118.002.337-44',
        companyName: 'Consultório Farmacêutico Guia Vacinal',
        companyCnpj: '11.800.233/0001-44',
        birthDate: '',
        referralCode: 'walace12',
        bonusMonths: 1,
        subscriptionExpiresAt: ''
    };

    saveGoogleAuthState();

    try {
        const regSaved = localStorage.getItem(PRESCRIBERS_REGISTRY_KEY);
        const registry = regSaved ? JSON.parse(regSaved) : {};
        registry[demoEmail.toLowerCase()] = {
            name: demoName,
            councilType: 'CRF',
            councilUf: 'RJ',
            councilNumber: '12345',
            cpf: '118.002.337-44',
            companyName: 'Consultório Farmacêutico Guia Vacinal',
            companyCnpj: '11.800.233/0001-44',
            referralCode: 'walace12',
            bonusMonths: 1
        };
        localStorage.setItem(PRESCRIBERS_REGISTRY_KEY, JSON.stringify(registry));
    } catch (err) {
        console.warn('Erro ao salvar conta de demonstração:', err);
    }

    syncGoogleDataToPrescriptionForm();
    closeGoogleSignInModal();
}

function loadGoogleAuthState() {
    try {
        const saved = localStorage.getItem(GOOGLE_AUTH_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            const isCorruptedOrLegacy = !parsed || !parsed.email || !parsed.email.includes('@') || parsed.name?.toLowerCase().includes('larissa') || parsed.name?.toLowerCase().includes('roberto') || parsed.name?.toLowerCase().includes('mariana');

            if (isCorruptedOrLegacy) {
                localStorage.removeItem(GOOGLE_AUTH_STORAGE_KEY);
            } else if (parsed && parsed.isLoggedIn) {
                googleAuthState = {
                    ...googleAuthState,
                    ...parsed,
                    isLoggedIn: true,
                    referralCode: parsed.referralCode || generateUserReferralCode(parsed.email),
                    bonusMonths: parsed.bonusMonths || 0
                };
                if (googleAuthState.name && googleAuthState.userType === 'professional') {
                    userSessionData.professionalName = googleAuthState.name;
                    userSessionData.professionalCpf = googleAuthState.cpf;
                    userSessionData.councilType = googleAuthState.councilType;
                    userSessionData.councilUf = googleAuthState.councilUf;
                    userSessionData.councilNumber = googleAuthState.councilNumber;
                    if (googleAuthState.companyName) userSessionData.companyName = googleAuthState.companyName;
                    if (googleAuthState.companyCnpj) userSessionData.companyCnpj = googleAuthState.companyCnpj;
                    if (googleAuthState.digitalSignature) userSessionData.digitalSignature = googleAuthState.digitalSignature;
                }
            }
        }
    } catch (e) {
        console.warn('Erro ao carregar sessão Google:', e);
    }
    updateGoogleAuthUI();
}

function saveGoogleAuthState() {
    try {
        localStorage.setItem(GOOGLE_AUTH_STORAGE_KEY, JSON.stringify(googleAuthState));
    } catch (e) {
        console.warn('Erro ao salvar sessão Google:', e);
    }
    updateGoogleAuthUI();
}

function renderAvatarElement(avatar, fallback = '🩺') {
    if (avatar && (avatar.startsWith('http://') || avatar.startsWith('https://'))) {
        return `<img src="${avatar}" alt="Avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    }
    return avatar || fallback;
}

function updateGoogleAuthUI() {
    const headerBtn = document.getElementById('headerGoogleAuthBtn');
    const headerLabel = document.getElementById('headerAuthLabel');
    const dropdownUserName = document.getElementById('dropdownUserName');
    const dropdownUserEmail = document.getElementById('dropdownUserEmail');
    const dropdownUserRole = document.getElementById('dropdownUserRole');
    const dropdownSubBadge = document.getElementById('dropdownSubBadge');
    const dropdownAvatar = document.getElementById('dropdownAvatar');

    const lockBadgeClinic = document.getElementById('lockBadgeClinic');
    const lockBadgeProf = document.getElementById('lockBadgeProfessional');

    const modalConnectedAvatar = document.getElementById('modalConnectedAvatar');
    const modalConnectedName = document.getElementById('modalConnectedName');
    const modalConnectedEmail = document.getElementById('modalConnectedEmail');

    if (googleAuthState.isLoggedIn) {
        if (headerBtn) {
            headerBtn.classList.add('logged-in');
            headerBtn.title = `Conectado como ${googleAuthState.name} (Clique para acessar seu menu)`;
        }
        if (headerLabel) {
            const shortName = (googleAuthState.name || '').split(' ')[0] || 'Conectado';
            headerLabel.textContent = `✓ ${shortName}`;
        }
        if (dropdownUserName) dropdownUserName.textContent = googleAuthState.name;
        if (dropdownUserEmail) dropdownUserEmail.textContent = googleAuthState.email;
        
        if (dropdownUserRole) {
            if (googleAuthState.userType === 'patient') {
                dropdownUserRole.textContent = '👤 Paciente Cadastrado';
            } else {
                dropdownUserRole.textContent = googleAuthState.roleTag || `${googleAuthState.councilType}/${googleAuthState.councilUf} ${googleAuthState.councilNumber}`;
            }
        }

        if (dropdownSubBadge) {
            const bonusText = (googleAuthState.bonusMonths > 0) ? ` (+${googleAuthState.bonusMonths}m bônus)` : '';
            dropdownSubBadge.textContent = `⭐ Assinatura Ativa${bonusText}`;
        }
        
        if (dropdownAvatar) {
            if (googleAuthState.avatar && googleAuthState.avatar.startsWith('http')) {
                dropdownAvatar.innerHTML = `<img src="${googleAuthState.avatar}" alt="Avatar" style="width:32px;height:32px;border-radius:50%;object-fit:cover;">`;
            } else {
                dropdownAvatar.textContent = googleAuthState.avatar || (googleAuthState.userType === 'patient' ? '👤' : '🩺');
            }
        }

        if (lockBadgeClinic) {
            lockBadgeClinic.className = 'role-card-lock-badge unlocked';
            lockBadgeClinic.textContent = '✓ Desbloqueado';
        }
        if (lockBadgeProf) {
            lockBadgeProf.className = 'role-card-lock-badge unlocked';
            lockBadgeProf.textContent = '✓ Desbloqueado';
        }

        if (modalConnectedAvatar) {
            if (googleAuthState.avatar && googleAuthState.avatar.startsWith('http')) {
                modalConnectedAvatar.innerHTML = `<img src="${googleAuthState.avatar}" alt="Avatar" style="width:36px;height:36px;border-radius:50%;object-fit:cover;">`;
            } else {
                modalConnectedAvatar.textContent = googleAuthState.avatar || (googleAuthState.userType === 'patient' ? '👤' : '🩺');
            }
        }
        if (modalConnectedName) modalConnectedName.textContent = googleAuthState.name;
        if (modalConnectedEmail) modalConnectedEmail.textContent = googleAuthState.email;
    } else {
        if (headerBtn) {
            headerBtn.classList.remove('logged-in');
            headerBtn.title = 'Fazer Login com o Google';
        }
        if (headerLabel) {
            headerLabel.textContent = 'Entrar com Google';
        }

        if (lockBadgeClinic) {
            lockBadgeClinic.className = 'role-card-lock-badge';
            lockBadgeClinic.textContent = '🔒 Requer Login Google';
        }
        if (lockBadgeProf) {
            lockBadgeProf.className = 'role-card-lock-badge';
            lockBadgeProf.textContent = '🔒 Requer Login Google';
        }
    }

    if (typeof currentModalRole !== 'undefined') {
        refreshRoleAuthVisibility(currentModalRole);
    }
}

function openGoogleSignInModal() {
    const modal = document.getElementById('googleSignInModal');
    if (modal) {
        goToGoogleStep(1);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (googleClientId && window.google && window.google.accounts && window.google.accounts.id) {
            setupGoogleIdentityServices();
        }
    }
}

function closeGoogleSignInModal() {
    const modal = document.getElementById('googleSignInModal');
    if (modal) {
        modal.classList.remove('active');
        const prescModal = document.getElementById('prescriptionDataModal');
        if (!prescModal || !prescModal.classList.contains('active')) {
            document.body.style.overflow = '';
        }
    }
    restoreRouteAfterModalClose();
}

function handleGoogleModalBackdropClick(e) {
    if (e.target.id === 'googleSignInModal') {
        closeGoogleSignInModal();
    }
}

function handleHeaderAuthClick() {
    if (googleAuthState.isLoggedIn) {
        const dropdown = document.getElementById('authDropdownMenu');
        if (dropdown) {
            const isHidden = dropdown.style.display === 'none' || dropdown.style.display === '';
            dropdown.style.display = isHidden ? 'flex' : 'none';
        }
    } else {
        openGoogleSignInModal();
    }
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
    const headerBtn = document.getElementById('headerGoogleAuthBtn');
    const dropdown = document.getElementById('authDropdownMenu');
    if (dropdown && dropdown.style.display === 'flex') {
        if (headerBtn && !headerBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    }
});

// Navegação entre as 3 Etapas da Autenticação Google
function goToGoogleStep(step) {
    const step1Pane = document.getElementById('googleAuthStep1');
    const step2Pane = document.getElementById('googleAuthStep2');
    const step3ProfPane = document.getElementById('googleAuthStep3Prof');
    const step3PatientPane = document.getElementById('googleAuthStep3Patient');

    const stepper1 = document.getElementById('stepperStep1');
    const stepper2 = document.getElementById('stepperStep2');
    const stepper3 = document.getElementById('stepperStep3');

    const title = document.getElementById('googleModalTitle');
    const sub = document.getElementById('googleModalSubtitle');

    // Esconde todos os painéis inicialmente
    if (step1Pane) step1Pane.style.display = 'none';
    if (step2Pane) step2Pane.style.display = 'none';
    if (step3ProfPane) step3ProfPane.style.display = 'none';
    if (step3PatientPane) step3PatientPane.style.display = 'none';

    if (step === 1) {
        if (step1Pane) step1Pane.style.display = 'block';
        if (stepper1) stepper1.className = 'stepper-step active';
        if (stepper2) stepper2.className = 'stepper-step';
        if (stepper3) stepper3.className = 'stepper-step';
        if (title) title.textContent = 'Login com o Google';
        if (sub) sub.textContent = '';
    } else if (step === 2) {
        if (step2Pane) step2Pane.style.display = 'block';
        if (stepper1) stepper1.className = 'stepper-step completed';
        if (stepper2) stepper2.className = 'stepper-step active';
        if (stepper3) stepper3.className = 'stepper-step';
        if (title) title.textContent = 'Selecione seu Perfil';
        if (sub) sub.textContent = '';
    } else if (step === '3prof' || (step === 3 && currentRegistrationRole === 'professional')) {
        if (step3ProfPane) step3ProfPane.style.display = 'block';
        if (stepper1) stepper1.className = 'stepper-step completed';
        if (stepper2) stepper2.className = 'stepper-step completed';
        if (stepper3) stepper3.className = 'stepper-step active';
        if (title) title.textContent = 'Inscrição Profissional';
        if (sub) sub.textContent = '';
    } else if (step === '3patient' || (step === 3 && currentRegistrationRole === 'patient')) {
        if (step3PatientPane) step3PatientPane.style.display = 'block';
        if (stepper1) stepper1.className = 'stepper-step completed';
        if (stepper2) stepper2.className = 'stepper-step completed';
        if (stepper3) stepper3.className = 'stepper-step active';
        if (title) title.textContent = 'Identificação do Paciente';
        if (sub) sub.textContent = '';
    }
}

// Escolha do perfil de acesso (Profissional vs Paciente) na Etapa 2
function selectLoginProfileRole(role) {
    currentRegistrationRole = role;

    if (role === 'professional') {
        const profAvatar = document.getElementById('step3ProfAvatar');
        const profName = document.getElementById('step3ProfName');
        const profEmail = document.getElementById('step3ProfEmail');
        const profFullNameInput = document.getElementById('step3ProfFullName');

        if (profAvatar) {
            if (tempGoogleAuthData.picture) {
                profAvatar.innerHTML = `<img src="${tempGoogleAuthData.picture}" alt="Avatar Google" style="width:36px;height:36px;border-radius:50%;object-fit:cover;">`;
            } else {
                profAvatar.textContent = '🩺';
            }
        }
        if (profName) profName.textContent = 'Profissional de Saúde';
        if (profEmail) profEmail.textContent = tempGoogleAuthData.email || '';

        // Não utilizar o nome vinculado ao e-mail automaticamente (pode ser apelido ou incompleto)
        if (profFullNameInput) {
            try {
                const regSaved = localStorage.getItem(PRESCRIBERS_REGISTRY_KEY);
                const registry = regSaved ? JSON.parse(regSaved) : {};
                const existingProf = registry[(tempGoogleAuthData.email || '').toLowerCase()];
                if (existingProf && existingProf.name) {
                    profFullNameInput.value = existingProf.name;
                } else if (!profFullNameInput.value) {
                    profFullNameInput.value = '';
                }
            } catch (e) {
                profFullNameInput.value = '';
            }
        }

        // Pré-selecionar o conselho atual (padrão CRF ou CRM)
        const currentCouncil = document.getElementById('step3ProfCouncil')?.value || 'CRM';
        selectCouncilPill(currentCouncil);

        goToGoogleStep('3prof');

        // Inicializar canvas de assinatura digital para o profissional
        setTimeout(() => {
            initSignaturePad('step3ProfSignatureCanvas');
        }, 120);
    } else {
        const patAvatar = document.getElementById('step3PatientAvatar');
        const patName = document.getElementById('step3PatientName');
        const patEmail = document.getElementById('step3PatientEmail');
        const patFullNameInput = document.getElementById('step3PatientFullName');

        if (patAvatar) {
            if (tempGoogleAuthData.picture) {
                patAvatar.innerHTML = `<img src="${tempGoogleAuthData.picture}" alt="Avatar Google" style="width:36px;height:36px;border-radius:50%;object-fit:cover;">`;
            } else {
                patAvatar.textContent = '👤';
            }
        }
        if (patName) patName.textContent = 'Paciente';
        if (patEmail) patEmail.textContent = tempGoogleAuthData.email || '';

        // Não utilizar o nome vinculado ao e-mail automaticamente (exigir nome e sobrenome)
        if (patFullNameInput) {
            try {
                const patSaved = localStorage.getItem(PATIENTS_AUTH_REGISTRY_KEY);
                const patRegistry = patSaved ? JSON.parse(patSaved) : {};
                const existingPatient = patRegistry[(tempGoogleAuthData.email || '').toLowerCase()];
                if (existingPatient && existingPatient.name) {
                    patFullNameInput.value = existingPatient.name;
                } else if (!patFullNameInput.value) {
                    patFullNameInput.value = '';
                }
            } catch (e) {
                patFullNameInput.value = '';
            }
        }

        goToGoogleStep('3patient');
    }
}

// Seleção visual em pills dos conselhos profissionais (CRM, CRF, COREN)
function selectCouncilPill(council) {
    const inputCouncil = document.getElementById('step3ProfCouncil');
    if (inputCouncil) inputCouncil.value = council;

    ['CRM', 'CRF', 'COREN'].forEach(c => {
        const pill = document.getElementById('pill' + c);
        if (pill) {
            if (c === council) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        }
    });
}

// Cálculo dinâmico da idade e categoria do paciente ao alterar a data de nascimento
function handlePatientBirthDateChange(dateStr) {
    const feedbackEl = document.getElementById('patientAgeFeedback');
    const categoryEl = document.getElementById('patientCalculatedCategory');
    if (!feedbackEl || !categoryEl || !dateStr) {
        if (feedbackEl) feedbackEl.style.display = 'none';
        return;
    }

    const birth = new Date(dateStr + 'T00:00:00');
    const now = new Date();
    if (isNaN(birth.getTime())) {
        feedbackEl.style.display = 'none';
        return;
    }

    let ageYears = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
        ageYears--;
    }

    let category = 'Adulto (20 a 59 anos)';
    if (ageYears < 2) category = 'Lactente / Bebê (0 a 19 meses)';
    else if (ageYears < 10) category = 'Criança (2 a 9 anos)';
    else if (ageYears < 20) category = 'Adolescente (10 a 19 anos)';
    else if (ageYears >= 60) category = 'Idoso (60+ anos)';

    categoryEl.textContent = `${category} • ${ageYears >= 1 ? ageYears + ' anos' : 'Menor de 1 ano'}`;
    feedbackEl.style.display = 'flex';
}

// Submissão da Etapa 1: Autenticação Google
function handleGoogleStep1Submit(e) {
    if (e) e.preventDefault();

    const email = document.getElementById('step1GoogleEmail').value.trim();
    const name = document.getElementById('step1GoogleName').value.trim();

    if (!email || !email.includes('@') || !name) {
        alert('Por favor, informe seu e-mail do Google válido e nome completo.');
        return;
    }

    processVerifiedGoogleIdentity(email, name, '');
}

// Submissão da Etapa 3 - Profissional: CRM, CRF, COREN, UF, Inscrição, CPF, Nome e Sobrenome e Assinatura Digital
function handleGoogleStep3ProfSubmit(e) {
    if (e) e.preventDefault();

    const fullName = document.getElementById('step3ProfFullName') ? document.getElementById('step3ProfFullName').value.trim() : '';
    const council = document.getElementById('step3ProfCouncil').value || 'CRF';
    const uf = document.getElementById('step3ProfUf').value;
    const number = document.getElementById('step3ProfNumber').value.trim();
    const cpf = document.getElementById('step3ProfCpf').value.trim();
    const est = document.getElementById('step3ProfEstablishment').value.trim();

    // 1. Validação de Nome e Sobrenome (mínimo dois nomes)
    const nameParts = fullName.split(/\s+/).filter(Boolean);
    if (nameParts.length < 2) {
        alert('É obrigatório preencher seu nome e sobrenome completos (mínimo dois nomes). Por favor, informe seu nome corretamente.');
        const inputName = document.getElementById('step3ProfFullName');
        if (inputName) inputName.focus();
        return;
    }

    if (!number || !cpf) {
        alert('Por favor, informe o número de inscrição no conselho e seu CPF para validação técnica.');
        return;
    }

    // 2. Validação da Assinatura Digital do Prescritor
    let digitalSignature = googleAuthState.digitalSignature || '';
    const isNewSignatureDrawn = !isSignatureCanvasEmpty('step3ProfSignatureCanvas');

    if (isNewSignatureDrawn) {
        const sigCanvas = document.getElementById('step3ProfSignatureCanvas');
        if (sigCanvas) {
            digitalSignature = sigCanvas.toDataURL('image/png');
        }
    }

    if (!digitalSignature) {
        alert('É obrigatório desenhar sua assinatura digital no quadro antes de concluir o cadastro.');
        return;
    }

    // Aplica bônus de indicação se o usuário acessou por link de redirecionamento (?ref=...)
    const referralBonus = applyPendingReferralBonus(tempGoogleAuthData.email);
    const myReferralCode = generateUserReferralCode(tempGoogleAuthData.email);

    googleAuthState = {
        isLoggedIn: true,
        userType: 'professional',
        email: tempGoogleAuthData.email,
        name: fullName,
        avatar: tempGoogleAuthData.picture || '🩺',
        roleTag: `${council}/${uf} ${number}`,
        councilType: council,
        councilUf: uf,
        councilNumber: number,
        cpf: cpf,
        companyName: est,
        companyCnpj: '',
        birthDate: '',
        referralCode: myReferralCode,
        bonusMonths: referralBonus,
        subscriptionExpiresAt: '',
        digitalSignature: digitalSignature
    };

    saveGoogleAuthState();

    // Salva no registro permanente de prescritores indexado pelo e-mail
    try {
        const regSaved = localStorage.getItem(PRESCRIBERS_REGISTRY_KEY);
        const registry = regSaved ? JSON.parse(regSaved) : {};
        registry[tempGoogleAuthData.email.toLowerCase()] = {
            name: fullName,
            councilType: council,
            councilUf: uf,
            councilNumber: number,
            cpf: cpf,
            companyName: est,
            companyCnpj: '',
            picture: tempGoogleAuthData.picture || '',
            referralCode: myReferralCode,
            bonusMonths: referralBonus,
            digitalSignature: digitalSignature
        };
        localStorage.setItem(PRESCRIBERS_REGISTRY_KEY, JSON.stringify(registry));
    } catch (err) {
        console.warn('Erro ao salvar registro de prescritor:', err);
    }

    syncGoogleDataToPrescriptionForm();
    closeGoogleSignInModal();

    if (referralBonus > 0) {
        alert(`🎉 Parabéns, Dr(a). ${fullName}!\nSeu cadastro foi realizado com sucesso pelo link de indicação e você ganhou 1 mês grátis de assinatura PRO.`);
    }
}

// Submissão da Etapa 3 - Paciente: Nome e Sobrenome, Data de Nascimento e CPF
function handleGoogleStep3PatientSubmit(e) {
    if (e) e.preventDefault();

    const fullName = document.getElementById('step3PatientFullName').value.trim();
    const birthDate = document.getElementById('step3PatientBirthDate').value;
    const cpf = document.getElementById('step3PatientCpf').value.trim();

    // Validação de Nome e Sobrenome (mínimo dois nomes)
    const nameParts = fullName.split(/\s+/).filter(Boolean);
    if (nameParts.length < 2) {
        alert('É obrigatório preencher seu nome e sobrenome completos (mínimo dois nomes). Por favor, informe seu nome corretamente.');
        const inputName = document.getElementById('step3PatientFullName');
        if (inputName) inputName.focus();
        return;
    }

    if (!fullName || !birthDate || !cpf) {
        alert('Por favor, preencha seu nome e sobrenome completos, data de nascimento e CPF.');
        return;
    }

    // Aplica bônus de indicação se o paciente acessou por link de redirecionamento (?ref=...)
    const referralBonus = applyPendingReferralBonus(tempGoogleAuthData.email);
    const myReferralCode = generateUserReferralCode(tempGoogleAuthData.email);

    googleAuthState = {
        isLoggedIn: true,
        userType: 'patient',
        email: tempGoogleAuthData.email,
        name: fullName,
        avatar: tempGoogleAuthData.picture || '👤',
        roleTag: 'Paciente Cadastrado',
        councilType: '',
        councilUf: '',
        councilNumber: '',
        cpf: cpf,
        companyName: '',
        companyCnpj: '',
        birthDate: birthDate,
        referralCode: myReferralCode,
        bonusMonths: referralBonus,
        subscriptionExpiresAt: '',
        digitalSignature: ''
    };

    saveGoogleAuthState();

    // Salva no registro de pacientes indexado pelo e-mail
    try {
        const patSaved = localStorage.getItem(PATIENTS_AUTH_REGISTRY_KEY);
        const patRegistry = patSaved ? JSON.parse(patSaved) : {};
        patRegistry[tempGoogleAuthData.email.toLowerCase()] = {
            name: fullName,
            cpf: cpf,
            birthDate: birthDate,
            picture: tempGoogleAuthData.picture || '',
            referralCode: myReferralCode,
            bonusMonths: referralBonus
        };
        localStorage.setItem(PATIENTS_AUTH_REGISTRY_KEY, JSON.stringify(patRegistry));
    } catch (err) {
        console.warn('Erro ao salvar registro de paciente:', err);
    }

    closeGoogleSignInModal();

    if (referralBonus > 0) {
        alert(`🎉 Bem-vindo(a), ${fullName}!\nSeu cadastro foi realizado com sucesso pelo link de indicação e você ganhou 1 mês grátis de acesso.`);
    }
}

// Abertura do modal para atualizar dados cadastrais pós-login
function openEditUserDataModal() {
    const dropdown = document.getElementById('authDropdownMenu');
    if (dropdown) dropdown.style.display = 'none';

    syncUrlPath('/PERFIL/MEU CADASTRO');

    if (!googleAuthState.isLoggedIn) {
        openGoogleSignInModal();
        return;
    }

    tempGoogleAuthData = {
        email: googleAuthState.email,
        name: googleAuthState.name,
        picture: googleAuthState.avatar && googleAuthState.avatar.startsWith('http') ? googleAuthState.avatar : ''
    };

    const modal = document.getElementById('googleSignInModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (googleAuthState.userType === 'professional') {
            currentRegistrationRole = 'professional';
            // Preenche dados atuais nos campos
            if (document.getElementById('step3ProfFullName')) document.getElementById('step3ProfFullName').value = googleAuthState.name || '';
            if (document.getElementById('step3ProfCouncil')) document.getElementById('step3ProfCouncil').value = googleAuthState.councilType || 'CRF';
            if (document.getElementById('step3ProfUf')) document.getElementById('step3ProfUf').value = googleAuthState.councilUf || 'RJ';
            if (document.getElementById('step3ProfNumber')) document.getElementById('step3ProfNumber').value = googleAuthState.councilNumber || '';
            if (document.getElementById('step3ProfCpf')) document.getElementById('step3ProfCpf').value = googleAuthState.cpf || '';
            if (document.getElementById('step3ProfEstablishment')) document.getElementById('step3ProfEstablishment').value = googleAuthState.companyName || '';
            selectCouncilPill(googleAuthState.councilType || 'CRF');
            goToGoogleStep('3prof');
            setTimeout(() => {
                initSignaturePad('step3ProfSignatureCanvas');
            }, 120);
        } else {
            currentRegistrationRole = 'patient';
            if (document.getElementById('step3PatientFullName')) document.getElementById('step3PatientFullName').value = googleAuthState.name || '';
            if (document.getElementById('step3PatientBirthDate')) {
                document.getElementById('step3PatientBirthDate').value = googleAuthState.birthDate || '';
                handlePatientBirthDateChange(googleAuthState.birthDate || '');
            }
            if (document.getElementById('step3PatientCpf')) document.getElementById('step3PatientCpf').value = googleAuthState.cpf || '';
            goToGoogleStep('3patient');
        }
    }
}

function syncGoogleDataToPrescriptionForm() {
    const inputProfName = document.getElementById('inputProfessionalName');
    const inputProfCpf = document.getElementById('inputProfessionalCpf');
    const inputCouncilType = document.getElementById('inputCouncilType');
    const inputCouncilUf = document.getElementById('inputCouncilUf');
    const inputCouncilNumber = document.getElementById('inputCouncilNumber');
    const inputCompanyName = document.getElementById('inputCompanyName');
    const inputCompanyCnpj = document.getElementById('inputCompanyCnpj');

    if (inputProfName) inputProfName.value = googleAuthState.name;
    if (inputProfCpf) inputProfCpf.value = googleAuthState.cpf;
    if (inputCouncilType) inputCouncilType.value = googleAuthState.councilType;
    if (inputCouncilUf) inputCouncilUf.value = googleAuthState.councilUf;
    if (inputCouncilNumber) inputCouncilNumber.value = googleAuthState.councilNumber;
    if (inputCompanyName && googleAuthState.companyName) inputCompanyName.value = googleAuthState.companyName;
    if (inputCompanyCnpj && googleAuthState.companyCnpj) inputCompanyCnpj.value = googleAuthState.companyCnpj;

    userSessionData.professionalName = googleAuthState.name;
    userSessionData.professionalCpf = googleAuthState.cpf;
    userSessionData.councilType = googleAuthState.councilType;
    userSessionData.councilUf = googleAuthState.councilUf;
    userSessionData.councilNumber = googleAuthState.councilNumber;
    if (googleAuthState.companyName) userSessionData.companyName = googleAuthState.companyName;
    if (googleAuthState.companyCnpj) userSessionData.companyCnpj = googleAuthState.companyCnpj;
    if (googleAuthState.digitalSignature) userSessionData.digitalSignature = googleAuthState.digitalSignature;
}

function triggerGoogleLogout() {
    googleAuthState = {
        isLoggedIn: false,
        userType: 'professional',
        email: '',
        name: '',
        avatar: '👤',
        roleTag: '',
        councilType: 'CRF',
        councilUf: '',
        councilNumber: '',
        cpf: '',
        companyName: '',
        companyCnpj: '',
        birthDate: '',
        referralCode: '',
        bonusMonths: 0,
        subscriptionExpiresAt: ''
    };
    saveGoogleAuthState();

    if (window.google && window.google.accounts && window.google.accounts.id) {
        try {
            window.google.accounts.id.disableAutoSelect();
        } catch (e) {
            // Ignorar se não suportado
        }
    }

    const dropdown = document.getElementById('authDropdownMenu');
    if (dropdown) dropdown.style.display = 'none';

    if (typeof currentModalRole !== 'undefined') {
        selectUserRole(currentModalRole);
    }
}

// =========================================================================
// SISTEMA DE INDICAÇÃO (LINK DE REDIRECIONAMENTO COM 1 MÊS GRÁTIS POR NOVO CADASTRO)
// =========================================================================

function generateUserReferralCode(email) {
    if (!email) return 'guia-' + Math.floor(1000 + Math.random() * 9000);
    const prefix = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 10);
    return prefix || 'ref' + Math.floor(1000 + Math.random() * 9000);
}

function getUserReferralLink() {
    const code = googleAuthState.referralCode || generateUserReferralCode(googleAuthState.email);
    const origin = window.location.origin || 'https://vacinas.walacemendes.com.br';
    return `${origin}/?ref=${encodeURIComponent(code)}`;
}

function getReferralStats(code) {
    if (!code) return { count: 0, bonusMonths: 0 };
    try {
        const db = JSON.parse(localStorage.getItem(REFERRALS_DB_KEY) || '{}');
        const entry = db[code.toLowerCase()] || { count: 0, referredEmails: [] };
        return {
            count: entry.count || 0,
            bonusMonths: entry.count || 0
        };
    } catch (e) {
        return { count: 0, bonusMonths: 0 };
    }
}

function applyPendingReferralBonus(newUserEmail) {
    try {
        const pendingRef = localStorage.getItem('guia_vacinal_pending_ref');
        if (!pendingRef) return 0;

        const myCode = generateUserReferralCode(newUserEmail);
        if (pendingRef.toLowerCase() === myCode.toLowerCase()) {
            localStorage.removeItem('guia_vacinal_pending_ref');
            return 0; // Auto-indicação ignorada
        }

        const db = JSON.parse(localStorage.getItem(REFERRALS_DB_KEY) || '{}');
        const refKey = pendingRef.toLowerCase();

        if (!db[refKey]) {
            db[refKey] = { count: 0, referredEmails: [] };
        }

        if (!db[refKey].referredEmails.includes(newUserEmail.toLowerCase())) {
            db[refKey].count = (db[refKey].count || 0) + 1;
            db[refKey].referredEmails.push(newUserEmail.toLowerCase());
            localStorage.setItem(REFERRALS_DB_KEY, JSON.stringify(db));

            // Atualiza também os bônus do prescritor que indicou, se estiver no mesmo navegador
            const regSaved = localStorage.getItem(PRESCRIBERS_REGISTRY_KEY);
            if (regSaved) {
                const reg = JSON.parse(regSaved);
                for (const key in reg) {
                    if (reg[key].referralCode && reg[key].referralCode.toLowerCase() === refKey) {
                        reg[key].bonusMonths = (reg[key].bonusMonths || 0) + 1;
                    }
                }
                localStorage.setItem(PRESCRIBERS_REGISTRY_KEY, JSON.stringify(reg));
            }
        }

        localStorage.removeItem('guia_vacinal_pending_ref');
        return 1; // +1 mês concedido ao novo usuário!
    } catch (e) {
        console.warn('Erro ao aplicar bônus de indicação:', e);
        return 0;
    }
}

// Verifica na inicialização da página se o visitante chegou através de um link de indicação (?ref=...)
function checkPendingReferral() {
    try {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref');
        if (ref && ref.trim()) {
            localStorage.setItem('guia_vacinal_pending_ref', ref.trim());
            
            // Exibir notificação amigável na tela inicial
            setTimeout(() => {
                const toast = document.createElement('div');
                toast.className = 'referral-toast-alert';
                toast.innerHTML = `
                    <div style="display:flex;align-items:center;gap:0.75rem;">
                        <span style="font-size:1.4rem;">🎁</span>
                        <div>
                            <strong style="display:block;font-size:0.85rem;color:#0b57d0;">Você foi indicado por um colega!</strong>
                            <span style="font-size:0.75rem;color:#475569;">Cadastre-se com sua Conta Google para ganhar <strong>1 mês grátis de assinatura</strong>.</span>
                        </div>
                    </div>
                    <button type="button" onclick="openGoogleSignInModal(); this.parentElement.remove();" style="background:#0b57d0;color:#fff;border:none;padding:0.4rem 0.8rem;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer;white-space:nowrap;">Cadastrar Agora</button>
                    <button type="button" onclick="this.parentElement.remove();" style="background:transparent;border:none;color:#94a3b8;font-size:1rem;cursor:pointer;padding:0 0.3rem;">✕</button>
                `;
                toast.style.cssText = `
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 99999;
                    background: #ffffff;
                    border: 1.5px solid #0b57d0;
                    border-radius: 12px;
                    padding: 0.85rem 1.15rem;
                    box-shadow: 0 10px 30px rgba(11, 87, 208, 0.25);
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    max-width: 460px;
                    animation: slideUp 0.3s ease;
                `;
                document.body.appendChild(toast);
            }, 1000);
        }
    } catch (e) {
        console.warn('Erro ao verificar parâmetros de indicação:', e);
    }
}

// Modal de Indique e Ganhe
function openReferralModal() {
    const dropdown = document.getElementById('authDropdownMenu');
    if (dropdown) dropdown.style.display = 'none';

    if (!googleAuthState.isLoggedIn) {
        openGoogleSignInModal();
        return;
    }

    const modal = document.getElementById('referralModal');
    if (modal) {
        const link = getUserReferralLink();
        const input = document.getElementById('userReferralLinkInput');
        if (input) input.value = link;

        // Atualizar estatísticas
        const code = googleAuthState.referralCode || generateUserReferralCode(googleAuthState.email);
        const stats = getReferralStats(code);
        const countEl = document.getElementById('referralCountVal');
        const monthsEl = document.getElementById('referralMonthsBonusVal');

        if (countEl) countEl.textContent = stats.count;
        if (monthsEl) monthsEl.textContent = `+${stats.bonusMonths + (googleAuthState.bonusMonths || 0)} meses`;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeReferralModal() {
    const modal = document.getElementById('referralModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleReferralModalBackdropClick(e) {
    if (e.target.id === 'referralModal') {
        closeReferralModal();
    }
}

function copyUserReferralLink() {
    const input = document.getElementById('userReferralLinkInput');
    const btn = document.getElementById('btnCopyReferralLink');
    const textSpan = document.getElementById('copyReferralText');
    const iconSpan = document.getElementById('copyReferralIcon');

    if (!input) return;

    input.select();
    input.setSelectionRange(0, 99999);

    const link = input.value;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(() => {
            showCopySuccess(btn, textSpan, iconSpan);
        }).catch(() => {
            document.execCommand('copy');
            showCopySuccess(btn, textSpan, iconSpan);
        });
    } else {
        document.execCommand('copy');
        showCopySuccess(btn, textSpan, iconSpan);
    }
}

function showCopySuccess(btn, textSpan, iconSpan) {
    if (textSpan) textSpan.textContent = 'Copiado!';
    if (iconSpan) iconSpan.textContent = '✓';
    if (btn) btn.classList.add('copied');

    setTimeout(() => {
        if (textSpan) textSpan.textContent = 'Copiar Link';
        if (iconSpan) iconSpan.textContent = '📋';
        if (btn) btn.classList.remove('copied');
    }, 2500);
}

function shareReferralOnWhatsApp() {
    const link = getUserReferralLink();
    const text = `Olá! Conheça a plataforma Guia Vacinal para prescrição de imunobiológicos e calendários SBIm/PNI. Cadastre-se pelo meu link com a Conta Google e nós dois ganhamos 1 mês grátis de assinatura PRO:\n\n${link}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

function shareReferralWebAPI() {
    const link = getUserReferralLink();
    if (navigator.share) {
        navigator.share({
            title: 'Guia Vacinal - Indique e Ganhe 1 Mês Grátis',
            text: 'Cadastre-se na plataforma Guia Vacinal pelo meu link e ganhe 1 mês grátis de acesso PRO!',
            url: link
        }).catch(() => {});
    } else {
        copyUserReferralLink();
    }
}

// Modal de Gestão de Assinatura
function openSubscriptionModal() {
    const dropdown = document.getElementById('authDropdownMenu');
    if (dropdown) dropdown.style.display = 'none';

    if (!googleAuthState.isLoggedIn) {
        openGoogleSignInModal();
        return;
    }

    const modal = document.getElementById('subscriptionModal');
    if (modal) {
        const planTitle = document.getElementById('subPlanTitle');
        const statusVal = document.getElementById('subStatusVal');
        const expirationVal = document.getElementById('subExpirationVal');
        const bonusVal = document.getElementById('subBonusVal');

        const bonus = googleAuthState.bonusMonths || 0;
        const totalDays = 30 + (bonus * 30);

        if (planTitle) {
            planTitle.textContent = googleAuthState.userType === 'patient' 
                ? 'Plano Paciente & Família PRO' 
                : 'Plano Profissional Prescritor PRO';
        }
        if (statusVal) statusVal.textContent = 'Ativo (Acesso Ilimitado)';
        if (expirationVal) expirationVal.textContent = `${totalDays} dias restantes`;
        if (bonusVal) bonusVal.textContent = `+${bonus} ${bonus === 1 ? 'mês' : 'meses'} grátis`;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleSubscriptionModalBackdropClick(e) {
    if (e.target.id === 'subscriptionModal') {
        closeSubscriptionModal();
    }
}

// =========================================================================
// MÓDULO DE HISTÓRICO CLÍNICO: PRESCRIÇÕES EMITIDAS E PACIENTES ATENDIDOS
// =========================================================================

const HISTORY_PRESCRIPTIONS_KEY = 'guia_vacinal_history_prescriptions';
const HISTORY_PATIENTS_KEY = 'guia_vacinal_history_patients';

function getPrescriptionsHistory() {
    try {
        const raw = localStorage.getItem(HISTORY_PRESCRIPTIONS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.warn('Erro ao carregar histórico de prescrições:', e);
        return [];
    }
}

function savePrescriptionToHistory(record) {
    if (!record || !record.patientName) return;
    try {
        const list = getPrescriptionsHistory();
        // Adiciona no topo do array
        list.unshift(record);
        // Limita a 100 registros mais recentes para performance
        if (list.length > 100) list.pop();
        localStorage.setItem(HISTORY_PRESCRIPTIONS_KEY, JSON.stringify(list));

        // Atualiza também a base de pacientes atendidos
        updatePatientHistoryRecord(record);
        updateHistoryCounters();
    } catch (e) {
        console.warn('Erro ao salvar prescrição no histórico:', e);
    }
}

function getPatientsHistory() {
    try {
        const raw = localStorage.getItem(HISTORY_PATIENTS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.warn('Erro ao carregar histórico de pacientes:', e);
        return [];
    }
}

function updatePatientHistoryRecord(prescription) {
    try {
        const patients = getPatientsHistory();
        const pName = (prescription.patientName || '').trim();
        const pCpf = (prescription.patientCpf || '').trim();

        let found = patients.find(p => {
            if (pCpf && p.cpf) return p.cpf === pCpf;
            return p.name.toLowerCase() === pName.toLowerCase();
        });

        if (found) {
            found.totalPrescriptions = (found.totalPrescriptions || 1) + 1;
            found.lastVisit = prescription.date || new Date().toLocaleDateString('pt-BR');
            found.age = prescription.patientAge || found.age;
            if (prescription.comorbidities && prescription.comorbidities.length > 0) {
                found.comorbidities = prescription.comorbidities;
            }
        } else {
            patients.unshift({
                id: 'PAT-' + Date.now(),
                name: pName,
                cpf: pCpf,
                age: prescription.patientAge || '-',
                birth: prescription.patientBirth || '',
                comorbidities: prescription.comorbidities || [],
                totalPrescriptions: 1,
                lastVisit: prescription.date || new Date().toLocaleDateString('pt-BR')
            });
        }

        localStorage.setItem(HISTORY_PATIENTS_KEY, JSON.stringify(patients));
    } catch (e) {
        console.warn('Erro ao atualizar paciente no histórico:', e);
    }
}

function recordCurrentPrescriptionToHistory(pendingList) {
    if (!userSessionData.patientName || !userSessionData.professionalName) return;
    const now = new Date();
    const prescriptionRecord = {
        id: 'RX-' + now.getTime(),
        date: now.toLocaleDateString('pt-BR'),
        time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        formattedDate: `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
        patientName: userSessionData.patientName,
        patientCpf: userSessionData.patientCpf || '',
        patientAge: userSessionData.patientAge,
        patientBirth: userSessionData.patientBirth || '',
        role: userSessionData.role,
        prescriberName: userSessionData.professionalName,
        councilType: userSessionData.councilType,
        councilUf: userSessionData.councilUf,
        councilNumber: userSessionData.councilNumber,
        professionalCpf: userSessionData.professionalCpf,
        companyName: userSessionData.companyName || '',
        companyCnpj: userSessionData.companyCnpj || '',
        digitalSignature: userSessionData.digitalSignature || googleAuthState.digitalSignature || '',
        vaccines: (pendingList || []).map(item => ({
            nome: item.vac.nome,
            posologia: item.posologia,
            marca: item.marca,
            via: item.via,
            prioridade: item.prioridade,
            justificativa: item.justificativa
        })),
        comorbidities: Array.from(selectedComorbidities).filter(id => id !== 'nenhuma').map(id => {
            const found = COMORBIDADES_LIST.find(c => c.id === id);
            return found ? found.nome : id;
        })
    };
    savePrescriptionToHistory(prescriptionRecord);
}

function updateHistoryCounters() {
    const prescList = getPrescriptionsHistory();
    const patList = getPatientsHistory();

    const elPresc = document.getElementById('historyPrescCount');
    const elPat = document.getElementById('historyPatientCount');

    if (elPresc) elPresc.textContent = prescList.length;
    if (elPat) elPat.textContent = patList.length;
}

function openHistoryModal(tab = 'prescriptions') {
    const modal = document.getElementById('historyModal');
    if (!modal) return;

    const dropdown = document.getElementById('authDropdownMenu');
    if (dropdown) dropdown.style.display = 'none';

    syncUrlPath('/PERFIL/HISTORICO');

    updateHistoryCounters();
    switchHistoryTab(tab);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeHistoryModal() {
    const modal = document.getElementById('historyModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    restoreRouteAfterModalClose();
}

function handleHistoryModalBackdropClick(e) {
    if (e.target.id === 'historyModal') {
        closeHistoryModal();
    }
}

function switchHistoryTab(tab) {
    const panePresc = document.getElementById('historyPanePrescriptions');
    const panePat = document.getElementById('historyPanePatients');
    const btnPresc = document.getElementById('tabBtnPrescriptions');
    const btnPat = document.getElementById('tabBtnPatients');

    if (tab === 'prescriptions') {
        if (panePresc) panePresc.style.display = 'block';
        if (panePat) panePat.style.display = 'none';
        if (btnPresc) btnPresc.classList.add('active');
        if (btnPat) btnPat.classList.remove('active');
        renderPrescriptionsHistory('');
    } else {
        if (panePresc) panePresc.style.display = 'none';
        if (panePat) panePat.style.display = 'block';
        if (btnPresc) btnPresc.classList.remove('active');
        if (btnPat) btnPat.classList.add('active');
        renderPatientsHistory('');
    }
}

function renderPrescriptionsHistory(filterQuery = '') {
    const listEl = document.getElementById('prescriptionsHistoryList');
    if (!listEl) return;

    let items = getPrescriptionsHistory();
    if (filterQuery) {
        const q = filterQuery.toLowerCase();
        items = items.filter(it => 
            (it.patientName && it.patientName.toLowerCase().includes(q)) ||
            (it.vaccines && it.vaccines.some(v => v.nome.toLowerCase().includes(q)))
        );
    }

    if (items.length === 0) {
        listEl.innerHTML = `
            <div class="history-empty-box">
                <span class="empty-icon">📋</span>
                <p class="empty-title">Nenhuma prescrição encontrada</p>
                <span class="empty-sub">As prescrições geradas pelo profissional habilitado serão salvas automaticamente aqui.</span>
            </div>
        `;
        return;
    }

    listEl.innerHTML = items.map(item => {
        const vacTags = (item.vaccines || []).map(v => `<span class="history-vac-tag">${v.nome}</span>`).join('');
        const maskedCpf = item.patientCpf ? maskCpfForDisplay(item.patientCpf) : 'Não informado';

        return `
            <div class="history-card-item">
                <div class="history-card-header">
                    <div>
                        <strong class="history-patient-name">${item.patientName}</strong>
                        <span class="history-meta-sub">${item.patientAge} • CPF: ${maskedCpf}</span>
                    </div>
                    <div class="history-time-badge">
                        <span>🕒 ${item.formattedDate}</span>
                    </div>
                </div>

                <div class="history-vacs-preview">
                    <strong>Vacinas Prescritas (${(item.vaccines || []).length}):</strong>
                    <div class="history-tags-wrap">${vacTags || '<span class="text-slate-400 italic">Nenhuma</span>'}</div>
                </div>

                <div class="history-card-footer">
                    <span class="history-prescriber-info">Prescritor: Dr(a). ${item.prescriberName} (${item.councilType}/${item.councilUf} ${item.councilNumber})</span>
                    <div class="history-actions-row">
                        <button class="btn-history-reopen" onclick="reopenPrescriptionFromHistory('${item.id}')">📄 Ver / Reimprimir</button>
                        <button class="btn-history-delete" onclick="deletePrescriptionFromHistory('${item.id}')" title="Excluir do histórico">🗑️</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderPatientsHistory(filterQuery = '') {
    const listEl = document.getElementById('patientsHistoryList');
    if (!listEl) return;

    let items = getPatientsHistory();
    if (filterQuery) {
        const q = filterQuery.toLowerCase();
        items = items.filter(it => it.name.toLowerCase().includes(q) || (it.cpf && it.cpf.includes(q)));
    }

    if (items.length === 0) {
        listEl.innerHTML = `
            <div class="history-empty-box">
                <span class="empty-icon">👥</span>
                <p class="empty-title">Nenhum paciente registrado</p>
                <span class="empty-sub">Pacientes cadastrados em consultas e prescrições aparecerão listados aqui.</span>
            </div>
        `;
        return;
    }

    listEl.innerHTML = items.map(p => {
        const maskedCpf = p.cpf ? maskCpfForDisplay(p.cpf) : 'Não informado';
        const comorbList = (p.comorbidities && p.comorbidities.length > 0) ? p.comorbidities.join(', ') : 'Rotina';

        return `
            <div class="history-patient-row">
                <div class="patient-main-info">
                    <span class="patient-avatar-icon">👤</span>
                    <div>
                        <strong class="patient-title">${p.name}</strong>
                        <span class="patient-meta">${p.age} • CPF: ${maskedCpf}</span>
                        <span class="patient-comorb-tag">Condições: ${comorbList}</span>
                    </div>
                </div>
                <div class="patient-stats">
                    <span class="patient-presc-badge">📑 ${p.totalPrescriptions} Prescrição(ões)</span>
                    <span class="patient-last-visit">Último: ${p.lastVisit}</span>
                    <button class="btn-patient-new-consult" onclick="startNewConsultationForPatient('${p.name}')">➕ Novo Atendimento</button>
                </div>
            </div>
        `;
    }).join('');
}

function filterPrescriptionsHistory(val) {
    renderPrescriptionsHistory(val.trim());
}

function filterPatientsHistory(val) {
    renderPatientsHistory(val.trim());
}

function deletePrescriptionFromHistory(id) {
    if (!confirm('Deseja realmente remover esta prescrição do seu histórico?')) return;
    let list = getPrescriptionsHistory();
    list = list.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_PRESCRIPTIONS_KEY, JSON.stringify(list));
    updateHistoryCounters();
    renderPrescriptionsHistory('');
}

function clearPrescriptionHistoryData() {
    if (!confirm('Atenção: Deseja apagar TODO o histórico de prescrições deste navegador? Esta ação não pode ser desfeita.')) return;
    localStorage.removeItem(HISTORY_PRESCRIPTIONS_KEY);
    updateHistoryCounters();
    renderPrescriptionsHistory('');
}

function reopenPrescriptionFromHistory(id) {
    const list = getPrescriptionsHistory();
    const item = list.find(it => it.id === id);
    if (!item) {
        alert('Prescrição não localizada.');
        return;
    }

    userSessionData.patientName = item.patientName;
    userSessionData.patientCpf = item.patientCpf;
    userSessionData.patientAge = item.patientAge;
    userSessionData.patientBirth = item.patientBirth;
    userSessionData.professionalName = item.prescriberName;
    userSessionData.professionalCpf = item.professionalCpf;
    userSessionData.councilType = item.councilType;
    userSessionData.councilUf = item.councilUf;
    userSessionData.councilNumber = item.councilNumber;
    userSessionData.companyName = item.companyName;
    userSessionData.companyCnpj = item.companyCnpj;
    userSessionData.role = item.role || 'professional';
    if (item.digitalSignature) {
        userSessionData.digitalSignature = item.digitalSignature;
    }

    closeHistoryModal();
    renderCurrentDocument();
    showScreen('screen-prescription');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startNewConsultationForPatient(patientName) {
    const list = getPatientsHistory();
    const p = list.find(it => it.name.toLowerCase() === patientName.toLowerCase());
    if (p) {
        userSessionData.patientName = p.name;
        userSessionData.patientCpf = p.cpf;
        userSessionData.patientAge = p.age;
        userSessionData.patientBirth = p.birth;

        const inputName = document.getElementById('inputPatientName');
        const inputCpf = document.getElementById('inputPatientCpf');
        const inputAge = document.getElementById('inputPatientAge');
        const inputBirth = document.getElementById('inputPatientBirth');

        if (inputName) inputName.value = p.name;
        if (inputCpf) inputCpf.value = p.cpf;
        if (inputAge) inputAge.value = p.age;
        if (inputBirth) inputBirth.value = p.birth || '';
    }

    closeHistoryModal();
    goToHomeProfiles();
}

// =========================================================================
// MÓDULO DE MODAIS LEGAIS E CHECKOUT PAGBANK (HOMOLOGAÇÃO)
// =========================================================================

function openLegalModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLegalModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleLegalModalBackdropClick(e, modalId) {
    if (e.target.id === modalId) {
        closeLegalModal(modalId);
    }
}

// Checkout PagBank
let currentPagBankService = 'prescricao';

function openPagBankCheckoutModal() {
    const modal = document.getElementById('pagbankCheckoutModal');
    if (modal) {
        selectPagBankService('prescricao');
        switchPagBankPaymentMethod('pix');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePagBankCheckoutModal() {
    const modal = document.getElementById('pagbankCheckoutModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handlePagBankModalBackdropClick(e) {
    if (e.target.id === 'pagbankCheckoutModal') {
        closePagBankCheckoutModal();
    }
}

function selectPagBankService(type) {
    currentPagBankService = type;
    const cardPresc = document.getElementById('serviceCardPrescription');
    const cardPro = document.getElementById('serviceCardPro');
    const displayAmount = document.getElementById('pixAmountDisplay');
    const btnPayCard = document.getElementById('btnPayCard');
    const installmentsSelect = document.getElementById('cardInstallments');

    if (type === 'prescricao') {
        if (cardPresc) cardPresc.classList.add('active');
        if (cardPro) cardPro.classList.remove('active');
        if (displayAmount) displayAmount.textContent = 'R$ 39,90';
        if (btnPayCard) btnPayCard.textContent = '🔒 Pagar R$ 39,90 via PagBank';
        if (installmentsSelect) {
            installmentsSelect.innerHTML = `
                <option value="1">1x de R$ 39,90 sem juros</option>
                <option value="2">2x de R$ 19,95 sem juros</option>
                <option value="3">3x de R$ 13,30 sem juros</option>
            `;
        }
    } else {
        if (cardPresc) cardPresc.classList.remove('active');
        if (cardPro) cardPro.classList.add('active');
        if (displayAmount) displayAmount.textContent = 'R$ 79,90';
        if (btnPayCard) btnPayCard.textContent = '🔒 Assinar R$ 79,90/mês via PagBank';
        if (installmentsSelect) {
            installmentsSelect.innerHTML = `
                <option value="1">1x de R$ 79,90 sem juros (Mensal)</option>
            `;
        }
    }
}

function switchPagBankPaymentMethod(method) {
    const panePix = document.getElementById('payPanePix');
    const paneCard = document.getElementById('payPaneCard');
    const btnPix = document.getElementById('tabBtnPix');
    const btnCard = document.getElementById('tabBtnCard');

    if (method === 'pix') {
        if (panePix) panePix.style.display = 'block';
        if (paneCard) paneCard.style.display = 'none';
        if (btnPix) btnPix.classList.add('active');
        if (btnCard) btnCard.classList.remove('active');
    } else {
        if (panePix) panePix.style.display = 'none';
        if (paneCard) paneCard.style.display = 'block';
        if (btnPix) btnPix.classList.remove('active');
        if (btnCard) btnCard.classList.add('active');
    }
}

function copyPixCode() {
    const input = document.getElementById('pixCopiaColaInput');
    const feedback = document.getElementById('pixCopyFeedback');
    if (!input) return;

    input.select();
    input.setSelectionRange(0, 99999);

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(input.value).then(() => {
            if (feedback) {
                feedback.style.display = 'inline-block';
                setTimeout(() => { feedback.style.display = 'none'; }, 3000);
            }
        });
    } else {
        document.execCommand('copy');
        if (feedback) {
            feedback.style.display = 'inline-block';
            setTimeout(() => { feedback.style.display = 'none'; }, 3000);
        }
    }
}

function formatCardNumber(el) {
    if (!el) return;
    let v = el.value.replace(/\D/g, '').slice(0, 16);
    v = v.replace(/(\d{4})(?=\d)/g, '$1 ');
    el.value = v;
}

function formatCardExpiry(el) {
    if (!el) return;
    let v = el.value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) {
        v = v.slice(0, 2) + '/' + v.slice(2);
    }
    el.value = v;
}

function handlePagBankCardSubmit(e) {
    if (e) e.preventDefault();
    const btn = document.getElementById('btnPayCard');
    const prevText = btn ? btn.textContent : '';
    if (btn) {
        btn.disabled = true;
        btn.textContent = '⏳ Processando com PagBank...';
    }

    setTimeout(() => {
        if (btn) {
            btn.disabled = false;
            btn.textContent = prevText;
        }
        alert('✓ Pedido PagBank processado com sucesso em ambiente seguro! O comprovante foi encaminhado para seu e-mail.');
        closePagBankCheckoutModal();
    }, 1500);
}

// =========================================================================
// GESTÃO DE ASSINATURA DIGITAL (PAD EM CANVAS TOUCH/MOUSE & PRESCRIÇÃO)
// =========================================================================
const signaturePadInstances = {};

function initSignaturePad(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resolução ajustada ao devicePixelRatio para desenho nítido em telas retina
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 440;
    const height = rect.height || 140;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.scale(ratio, ratio);

    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0f172a';

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function getCoords(e) {
        const cRect = canvas.getBoundingClientRect();
        let clientX = e.clientX;
        let clientY = e.clientY;

        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        }

        return {
            x: clientX - cRect.left,
            y: clientY - cRect.top
        };
    }

    function startDrawing(e) {
        if (e.type.startsWith('touch')) {
            e.preventDefault();
        }
        isDrawing = true;
        const coords = getCoords(e);
        lastX = coords.x;
        lastY = coords.y;

        ctx.beginPath();
        ctx.arc(lastX, lastY, ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
        canvas.dataset.hasStrokes = 'true';
    }

    function draw(e) {
        if (!isDrawing) return;
        if (e.type.startsWith('touch')) {
            e.preventDefault();
        }
        const coords = getCoords(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();

        lastX = coords.x;
        lastY = coords.y;
        canvas.dataset.hasStrokes = 'true';
    }

    function stopDrawing(e) {
        if (!isDrawing) return;
        isDrawing = false;
    }

    // Remove listeners antigos se houver
    if (signaturePadInstances[canvasId]) {
        const old = signaturePadInstances[canvasId];
        canvas.removeEventListener('mousedown', old.start);
        canvas.removeEventListener('mousemove', old.draw);
        canvas.removeEventListener('mouseup', old.stop);
        canvas.removeEventListener('mouseleave', old.stop);
        canvas.removeEventListener('touchstart', old.start);
        canvas.removeEventListener('touchmove', old.draw);
        canvas.removeEventListener('touchend', old.stop);
        canvas.removeEventListener('touchcancel', old.stop);
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing, { passive: false });
    canvas.addEventListener('touchcancel', stopDrawing, { passive: false });

    signaturePadInstances[canvasId] = {
        start: startDrawing,
        draw: draw,
        stop: stopDrawing
    };

    canvas.dataset.hasStrokes = 'false';
}

function clearSignatureCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    canvas.dataset.hasStrokes = 'false';
}

function isSignatureCanvasEmpty(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return true;
    return canvas.dataset.hasStrokes !== 'true';
}

// Modal de Assinatura Digital aberto pelo menu "ASSINATURA DIGITAL"
function openSignatureModal() {
    const dropdown = document.getElementById('authDropdownMenu');
    if (dropdown) dropdown.style.display = 'none';

    syncUrlPath('/PERFIL/ASSINATURA');

    if (!googleAuthState.isLoggedIn) {
        openGoogleSignInModal();
        return;
    }

    const modal = document.getElementById('signatureModal');
    if (!modal) return;

    const currentCard = document.getElementById('modalCurrentSignatureCard');
    const previewImg = document.getElementById('modalSavedSignaturePreview');

    if (googleAuthState.digitalSignature && previewImg && currentCard) {
        previewImg.src = googleAuthState.digitalSignature;
        currentCard.style.display = 'block';
    } else if (currentCard) {
        currentCard.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        initSignaturePad('modalSignatureCanvas');
        clearSignatureCanvas('modalSignatureCanvas');
    }, 120);
}

function closeSignatureModal() {
    const modal = document.getElementById('signatureModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    restoreRouteAfterModalClose();
}

function handleSignatureModalBackdropClick(e) {
    if (e.target.id === 'signatureModal') {
        closeSignatureModal();
    }
}

function saveSignatureFromModal() {
    const canvas = document.getElementById('modalSignatureCanvas');
    if (!canvas) return;

    const isEmpty = isSignatureCanvasEmpty('modalSignatureCanvas');
    if (isEmpty && !googleAuthState.digitalSignature) {
        alert('Por favor, desenhe sua assinatura no quadro antes de salvar.');
        return;
    }

    if (!isEmpty) {
        const sigDataUrl = canvas.toDataURL('image/png');
        googleAuthState.digitalSignature = sigDataUrl;
        userSessionData.digitalSignature = sigDataUrl;
        saveGoogleAuthState();

        // Atualiza no registro de prescritores
        try {
            const regSaved = localStorage.getItem(PRESCRIBERS_REGISTRY_KEY);
            const registry = regSaved ? JSON.parse(regSaved) : {};
            if (googleAuthState.email && registry[googleAuthState.email.toLowerCase()]) {
                registry[googleAuthState.email.toLowerCase()].digitalSignature = sigDataUrl;
                localStorage.setItem(PRESCRIBERS_REGISTRY_KEY, JSON.stringify(registry));
            }
        } catch (e) {
            console.warn('Erro ao atualizar assinatura no registro:', e);
        }

        // Re-renderiza o documento se estiver visualizando a prescrição
        const prescScreen = document.getElementById('screen-prescription');
        if (prescScreen && prescScreen.classList.contains('active')) {
            renderCurrentDocument();
        }

        alert('✓ Assinatura digital salva com sucesso e vinculada às suas prescrições!');
    }

    closeSignatureModal();
}

// Exportações globais para eventos HTML
window.handleHeaderAuthClick = handleHeaderAuthClick;
window.openGoogleSignInModal = openGoogleSignInModal;
window.closeGoogleSignInModal = closeGoogleSignInModal;
window.handleGoogleModalBackdropClick = handleGoogleModalBackdropClick;
window.goToGoogleStep = goToGoogleStep;
window.selectLoginProfileRole = selectLoginProfileRole;
window.selectCouncilPill = selectCouncilPill;
window.handlePatientBirthDateChange = handlePatientBirthDateChange;
window.handleGoogleStep1Submit = handleGoogleStep1Submit;
window.handleGoogleStep3ProfSubmit = handleGoogleStep3ProfSubmit;
window.handleGoogleStep3PatientSubmit = handleGoogleStep3PatientSubmit;
window.openEditUserDataModal = openEditUserDataModal;
window.triggerGoogleLoginFlow = triggerGoogleLoginFlow;
window.fillDemoGoogleAccount = fillDemoGoogleAccount;
window.triggerGoogleLogout = triggerGoogleLogout;
window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;
window.triggerDocumentPrint = triggerDocumentPrint;
window.openPrescriptionInNewTab = openPrescriptionInNewTab;

// Modais de Assinatura e Indicação
window.openSubscriptionModal = openSubscriptionModal;
window.closeSubscriptionModal = closeSubscriptionModal;
window.handleSubscriptionModalBackdropClick = handleSubscriptionModalBackdropClick;
window.openReferralModal = openReferralModal;
window.closeReferralModal = closeReferralModal;
window.handleReferralModalBackdropClick = handleReferralModalBackdropClick;
window.copyUserReferralLink = copyUserReferralLink;
window.shareReferralOnWhatsApp = shareReferralOnWhatsApp;
window.shareReferralWebAPI = shareReferralWebAPI;
window.checkPendingReferral = checkPendingReferral;

// Assinatura Digital do Prescritor
window.initSignaturePad = initSignaturePad;
window.clearSignatureCanvas = clearSignatureCanvas;
window.isSignatureCanvasEmpty = isSignatureCanvasEmpty;
window.openSignatureModal = openSignatureModal;
window.closeSignatureModal = closeSignatureModal;
window.handleSignatureModalBackdropClick = handleSignatureModalBackdropClick;
window.saveSignatureFromModal = saveSignatureFromModal;

// Roteamento SPA e Deep Linking
window.navigateToRoute = navigateToRoute;
window.navigateToProfileRoute = navigateToProfileRoute;
window.syncUrlPath = syncUrlPath;
window.getRouteForProfile = getRouteForProfile;
window.goToHomeProfiles = goToHomeProfiles;
window.handleFloatingBack = handleFloatingBack;



