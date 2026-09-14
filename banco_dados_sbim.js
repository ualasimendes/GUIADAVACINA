/**\n * BANCO DE DADOS DE CRITÉRIOS VACINAIS SBIm & PNI 2026\n */\nconst BANCO_SBIM = {
  "metadados": {
    "titulo": "Banco de Dados Clínico de Critérios Vacinais SBIm & PNI",
    "versao": "2026.1",
    "autor": "Guia Vacinal - Núcleo de Atenção Farmacêutica em Imunizações",
    "fontes": [
      "Sociedade Brasileira de Imunizações (SBIm) - Calendários Oficiais 2025/2026",
      "Programa Nacional de Imunizações (PNI/MS) - Instrução Normativa e Manuais",
      "Manual dos Centros de Referência para Imunobiológicos Especiais (CRIE/MS)",
      "Conselho Federal de Farmácia (CFF) - Resoluções nº 585/2013 e 654/2018"
    ],
    "total_vacinas": 30
  },
  "grupos_populacionais": [
    {
      "id": "child",
      "nome": "Criança (0 a 10 anos)"
    },
    {
      "id": "preterm",
      "nome": "Prematuro"
    },
    {
      "id": "teen",
      "nome": "Adolescente (11 a 19 anos)"
    },
    {
      "id": "adult",
      "nome": "Adulto (20 a 59 anos)"
    },
    {
      "id": "elderly",
      "nome": "Pessoa Idosa (≥ 60 anos)"
    },
    {
      "id": "pregnant",
      "nome": "Gestante"
    },
    {
      "id": "puerpera",
      "nome": "Puérpera (até 45 dias pós-parto)"
    },
    {
      "id": "health_worker",
      "nome": "Trabalhador(a) da Saúde"
    },
    {
      "id": "immuno",
      "nome": "Imunodeprimido / Paciente Especial (CRIE)"
    }
  ],
  "vacinas": [
    {
      "id": "bcg",
      "nome": "BCG (Bacilo Calmette-Guérin)",
      "tipo": "Viva atenuada (Mycobacterium bovis)",
      "doencas_protegidas": "Formas graves e disseminadas de tuberculose (meníngea e miliar)",
      "esquema_pni_sus": "Dose única ao nascer (peso mínimo 2.000g)",
      "esquema_sbim": "Dose única ao nascer o mais precocemente possível",
      "idade_minima_dias": 0,
      "idade_maxima_anos": 4,
      "doses_esquema": 1,
      "intervalo_minimo_dias": 0,
      "reforcos": "Não recomendados. A ausência de cicatriz vacinal após 6 meses não exige revacinação.",
      "disponibilidade": "SUS (UBS) e Maternidades",
      "categoria": "Rotina Infantil",
      "via_administracao": "Intradérmica (ID)",
      "sitio_anatomico": "Inserção inferior do músculo deltoide do braço direito",
      "contraindicacoes": [
        "Recém-nascidos com peso inferior a 2.000g (adiar até atingir 2kg)",
        "Imunodeficiência congênita ou adquirida grave (inclusive HIV com imunossupressão)",
        "Uso de corticosteroides em dose imunossupressora",
        "Erupção cutânea generalizada no sítio de aplicação"
      ],
      "precaucoes_e_reacoes": "Evolução normal da lesão: mácula, pápula, pústula, úlcera e cicatriz (4 a 12 semanas). Não colocar pomadas ou curativos.",
      "regras_catch_up": "Crianças não vacinadas ao nascer podem receber a dose até 4 anos, 11 meses e 29 dias.",
      "diferenca_pni_vs_sbim": "Concordantes. Dose única precoce."
    },
    {
      "id": "hepatite_b",
      "nome": "Hepatite B (Recombinante)",
      "tipo": "Inativada / Subunitária recombinante (antígeno HBsAg)",
      "doencas_protegidas": "Hepatite B e complicações (cirrose e carcinoma hepatocelular)",
      "esquema_pni_sus": "1 dose ao nascer (primeiras 12h) + 3 doses na infância contidas na Pentavalente (2, 4 e 6 meses). Em adolescentes e adultos não vacinados: 3 doses (0, 1 e 6 meses).",
      "esquema_sbim": "Dose monovalente nas primeiras 12 horas de vida. Manter esquema de 3 doses adicionais (preferencialmente na hexavalente ou pentavalente aos 2, 4 e 6 meses). Em adultos: 3 doses (0, 1, 6 meses).",
      "idade_minima_dias": 0,
      "idade_maxima_anos": 120,
      "doses_esquema": 3,
      "intervalo_minimo_dias": 30,
      "reforcos": "Não há indicação de reforço para imunocompetentes com soroconversão comprovada (Anti-HBs ≥ 10 mUI/mL). Para renais crônicos e imunodeprimidos, monitorar anualmente.",
      "disponibilidade": "SUS (UBS) e Rede Privada",
      "categoria": "Rotina Universal",
      "via_administracao": "Intramuscular (IM)",
      "sitio_anatomico": "Vasto lateral da coxa (lactentes) ou Deltoide (crianças > 2 anos e adultos)",
      "contraindicacoes": [
        "Anafilaxia grave a componente da vacina (levedura)",
        "Doença febril aguda moderada a grave (adiar temporariamente)"
      ],
      "precaucoes_e_reacoes": "Dor local transitória, febrícula em menos de 5% dos casos.",
      "regras_catch_up": "Dose dada é dose contada. Se o esquema for interrompido, nunca reiniciar: apenas completar as doses faltantes respeitando intervalos mínimos (mínimo 4 semanas entre dose 1 e 2; mínimo 8 semanas entre 2 e 3; e 16 semanas entre 1 e 3).",
      "diferenca_pni_vs_sbim": "Ambos preconizam dose nas primeiras 12h para bloquear transmissão vertical. Na rede privada, as doses subsequentes costumam ser combinadas na Hexavalente acelular."
    },
    {
      "id": "pentavalente_sus",
      "nome": "Pentavalente (DTP + Hib + HepB)",
      "tipo": "Inativada combinada (bacteriana de células inteiras de Pertussis + toxoides tetânico e diftérico + HBsAg + oligossacarídeo capsular de Hib)",
      "doencas_protegidas": "Difteria, Tétano, Coqueluche, Infecções graves por Haemophilus influenzae tipo b (meningite, sepse) e Hepatite B",
      "esquema_pni_sus": "3 doses aos 2, 4 e 6 meses de vida.",
      "esquema_sbim": "Pode ser utilizada a Pentavalente do SUS ou, preferencialmente, a Hexavalente acelular (DTPa-VIP-HB-Hib) na rede privada aos 2 e 6 meses e Pentavalente acelular aos 4 meses.",
      "idade_minima_dias": 42,
      "idade_maxima_anos": 6,
      "doses_esquema": 3,
      "intervalo_minimo_dias": 30,
      "reforcos": "Reforços aos 15 meses e 4 anos com DTP (ou DTPa).",
      "disponibilidade": "SUS (UBS)",
      "categoria": "Rotina Infantil",
      "via_administracao": "Intramuscular profunda (IM)",
      "sitio_anatomico": "Vasto lateral da coxa",
      "contraindicacoes": [
        "Anafilaxia a qualquer componente",
        "Encefalopatia nos primeiros 7 dias após dose prévia",
        "Convulsão febril ou episódio hipotônico-hiporresponsivo (EHH) prévio são indicação de migração para vacina acelular (DTPa nos CRIEs)"
      ],
      "precaucoes_e_reacoes": "Febre alta, dor local, irritabilidade e choro prolongado são mais frequentes devido ao componente celular de Pertussis. Sintomas melhoram em 24-48h.",
      "regras_catch_up": "Disponível no SUS até 6 anos, 11 meses e 29 dias. A partir dos 7 anos, utiliza-se dT + HepB.",
      "diferenca_pni_vs_sbim": "A SBIm recomenda preferencialmente formulações acelulares (DTPa / Hexavalente) pelo menor índice de eventos adversos (febre, dor e choro persistente)."
    },
    {
      "id": "hexavalente_acelular",
      "nome": "Hexavalente Acelular (DTPa + VIP + HB + Hib)",
      "tipo": "Inativada combinada acelular",
      "doencas_protegidas": "Difteria, Tétano, Coqueluche acelular, Poliomielite inativada, Hepatite B e Haemophilus influenzae b",
      "esquema_pni_sus": "Disponível nos CRIEs para indicações clínicas especiais (prematuros extremos, cardiopatas, pneumopatas, neuropatas e histórico de EHH/convulsão pós-celular).",
      "esquema_sbim": "Recomendada na rotina privada aos 2 e 6 meses de idade (reduzindo picadas e eventos adversos). Aos 4 meses utiliza-se a Pentavalente acelular (sem HepB).",
      "idade_minima_dias": 42,
      "idade_maxima_anos": 6,
      "doses_esquema": 3,
      "intervalo_minimo_dias": 30,
      "reforcos": "Reforço aos 12-15 meses com DTPa-VIP-Hib (Pentavalente acelular) ou DTPa.",
      "disponibilidade": "Rede Privada e CRIEs (critérios específicos)",
      "categoria": "Rotina SBIm / CRIE",
      "via_administracao": "Intramuscular profunda (IM)",
      "sitio_anatomico": "Vasto lateral da coxa",
      "contraindicacoes": [
        "Anafilaxia a doses anteriores"
      ],
      "precaucoes_e_reacoes": "Excelente perfil de tolerabilidade. Rara ocorrência de febre alta.",
      "regras_catch_up": "Pode ser utilizada em crianças até 6 anos, 11 meses e 29 dias.",
      "diferenca_pni_vs_sbim": "Acelular exclusiva na rede privada ou CRIE com 6 antígenos em uma única injeção."
    },
    {
      "id": "polio_vip",
      "nome": "VIP (Vacina Inativada Poliomielite - Salk)",
      "tipo": "Inativada (vírus poliovírus tipos 1, 2 e 3 inativados)",
      "doencas_protegidas": "Poliomielite (Paralisia Infantil)",
      "esquema_pni_sus": "3 doses aos 2, 4 e 6 meses + 1º reforço aos 15 meses e 2º reforço aos 4 anos de idade. (Desde 2024, o Brasil aboliu a VOP de gotinha, adotando esquema 100% VIP).",
      "esquema_sbim": "3 doses primárias (2, 4 e 6 meses) + 2 reforços (15 meses e entre 4 e 5 anos).",
      "idade_minima_dias": 42,
      "idade_maxima_anos": 120,
      "doses_esquema": 3,
      "intervalo_minimo_dias": 30,
      "reforcos": "Reforços aos 15 meses e 4-5 anos de idade.",
      "disponibilidade": "SUS (UBS) e Rede Privada (geralmente combinada na hexa/penta)",
      "categoria": "Rotina Infantil",
      "via_administracao": "Intramuscular (IM)",
      "sitio_anatomico": "Vasto lateral da coxa (lactentes) ou Deltoide",
      "contraindicacoes": [
        "Anafilaxia a polimixina B, neomicina ou estreptomicina"
      ],
      "precaucoes_e_reacoes": "Dor discreta e eritema no local. Altíssimo perfil de segurança; risco zero de paralisia flácida pós-vacinal.",
      "regras_catch_up": "Crianças não vacinadas devem completar o esquema de 3 doses com intervalo mínimo de 30 dias entre as doses 1 e 2, e de 6 meses para a dose 3.",
      "diferenca_pni_vs_sbim": "Totalmente alinhados. O Brasil concluiu a transição histórica e agora utiliza exclusivamente a vacina inativada (injetável), eliminando a vacina oral."
    },
    {
      "id": "rotavirus",
      "nome": "Rotavírus Humano Atenuado",
      "tipo": "Viva atenuada oral (Monovalente G1P[8] no SUS / Pentavalente G1, G2, G3, G4, P1A no privado)",
      "doencas_protegidas": "Gastroenterite aguda por Rotavírus (diarreia e desidratação grave)",
      "esquema_pni_sus": "2 doses: 1ª dose aos 2 meses e 2ª dose aos 4 meses de idade.",
      "esquema_sbim": "Monovalente (2 doses aos 2 e 4 meses) ou Pentavalente (3 doses aos 2, 4 e 6 meses).",
      "idade_minima_dias": 42,
      "idade_maxima_anos": 1,
      "doses_esquema": 2,
      "intervalo_minimo_dias": 30,
      "reforcos": "Não indicados.",
      "disponibilidade": "SUS: Monovalente (VRH1) | Privado: Pentavalente (VRH5)",
      "categoria": "Rotina Infantil",
      "via_administracao": "Oral (VO)",
      "sitio_anatomico": "Mucosa oral",
      "contraindicacoes": [
        "Histórico de invaginação intestinal prévia",
        "Malformação congênita não corrigida do trato gastrointestinal",
        "Imunodeficiência combinada grave (SCID)",
        "IDADE FORA DOS LIMITES ESTRITOS DA BULA"
      ],
      "precaucoes_e_reacoes": "PRAZOS RÍGIDOS: 1ª dose deve ser dada entre 1 mês e 15 dias até no máximo 3 meses e 15 dias. A 2ª dose (ou 3ª) até 7 meses e 29 dias. Se a criança cuspir ou regurgitar, NÃO repetir a dose.",
      "regras_catch_up": "Se ultrapassar as idades limites (3m15d para dose 1 ou 7m29d para dose 2), A VACINA NÃO PODE MAIS SER APLICADA.",
      "diferenca_pni_vs_sbim": "O SUS adota a vacina monovalente (VRH1 - 2 doses). A SBIm contempla a monovalente (2 doses) e a pentavalente (3 doses: 2, 4 e 6m) que amplia a cobertura antigênica."
    },
    {
      "id": "pneumococica_conjugada",
      "nome": "Pneumocócica Conjugada (VPC10 / VPC13 / VPC15 / VPC20)",
      "tipo": "Inativada / Conjugada (polissacarídeos bacterianos ligados a proteína carreadora)",
      "doencas_protegidas": "Pneumonias bacterianas, meningites pneumocócicas, bacteremias e otite média aguda por Streptococcus pneumoniae",
      "esquema_pni_sus": "VPC10: 2 doses (2 e 4 meses) + Reforço aos 12 meses de idade.",
      "esquema_sbim": "VPC13 ou VPC15 preferencialmente: 3 doses (2, 4 e 6 meses) + Reforço entre 12 e 15 meses.",
      "idade_minima_dias": 42,
      "idade_maxima_anos": 120,
      "doses_esquema": 3,
      "intervalo_minimo_dias": 30,
      "reforcos": "Reforço entre 12 e 15 meses de vida.",
      "disponibilidade": "SUS: VPC10 (Rotina) e VPC13 (CRIEs) | Privado: VPC13, VPC15 e VPC20",
      "categoria": "Rotina Universal / Idosos / Especiais",
      "via_administracao": "Intramuscular (IM)",
      "sitio_anatomico": "Vasto lateral da coxa (lactentes) ou Deltoide",
      "contraindicacoes": [
        "Anafilaxia a componentes ou toxoide diftérico carreador"
      ],
      "precaucoes_e_reacoes": "Dor local, eritema, febre transitória nas primeiras 48h.",
      "regras_catch_up": "Crianças entre 1 e 4 anos não vacinadas recebem dose única (VPC10 no SUS). Crianças que iniciaram com VPC10 podem complementar proteção com VPC13 ou VPC15 na rede privada.",
      "diferenca_pni_vs_sbim": "A SBIm preconiza a VPC13 ou VPC15 com 3 doses primárias + reforço (3+1) pela maior cobertura de sorotipos (incluindo sorotipo 3 e 19A)."
    },
    {
      "id": "meningococica_c_acwy",
      "nome": "Meningocócica C e ACWY Conjugada",
      "tipo": "Inativada / Conjugada",
      "doencas_protegidas": "Doença Meningocócica Invasiva (meningite meningocócica e meningococcemia) causada por Neisseria meningitidis",
      "esquema_pni_sus": "MenC: 2 doses aos 3 e 5 meses + Reforço aos 12 meses. MenACWY: 1 dose para adolescentes de 11 a 14 anos.",
      "esquema_sbim": "MenACWY preferencial desde os 3 meses de vida: 2 doses (3 e 5 meses) + reforço entre 12-15 meses, reforço aos 5 anos e reforço na adolescência.",
      "idade_minima_dias": 60,
      "idade_maxima_anos": 120,
      "doses_esquema": 2,
      "intervalo_minimo_dias": 60,
      "reforcos": "Reforço aos 12-15 meses; reforço adicional aos 5 anos e entre 11-14 anos.",
      "disponibilidade": "SUS: MenC (Lactentes) e MenACWY (11-14 anos) | Privado: MenACWY para todas as faixas",
      "categoria": "Rotina Infantil e Adolescente",
      "via_administracao": "Intramuscular (IM)",
      "sitio_anatomico": "Vasto lateral da coxa ou Deltoide",
      "contraindicacoes": [
        "Hipersensibilidade grave a dose anterior"
      ],
      "precaucoes_e_reacoes": "Irritabilidade transitória, dor local.",
      "regras_catch_up": "Adolescentes não vacinados de 11 a 14 anos têm direito a 1 dose de MenACWY no SUS.",
      "diferenca_pni_vs_sbim": "O SUS usa MenC na infância e MenACWY aos 11-14 anos. A SBIm recomenda substituir a MenC pela MenACWY em todo o esquema infantil pelo espectro ampliado."
    },
    {
      "id": "meningococica_b",
      "nome": "Meningocócica B Recombinante (MenB)",
      "tipo": "Inativada recombinante proteica (4 componentes antigênicos)",
      "doencas_protegidas": "Doença Meningocócica invasiva causada pelo sorogrupo B de Neisseria meningitidis",
      "esquema_pni_sus": "Disponível apenas em CRIEs para pacientes com asplenia anatômica/funcional ou deficiência de frações de complemento.",
      "esquema_sbim": "Recomendada na rotina privada: 2 doses no primeiro ano (3 e 5 meses) + reforço entre 12 e 15 meses. Também indicada para adolescentes e adultos com risco.",
      "idade_minima_dias": 60,
      "idade_maxima_anos": 50,
      "doses_esquema": 2,
      "intervalo_minimo_dias": 60,
      "reforcos": "Reforço entre 12 e 15 meses de vida.",
      "disponibilidade": "Rede Privada e CRIE para indicações específicas",
      "categoria": "Rotina SBIm / CRIE",
      "via_administracao": "Intramuscular (IM)",
      "sitio_anatomico": "Vasto lateral da coxa ou Deltoide",
      "contraindicacoes": [
        "Hipersensibilidade aos componentes"
      ],
      "precaucoes_e_reacoes": "Vacina de alta reatogenicidade: febre alta comum se coadministrada com outras vacinas. A SBIm recomenda profilaxia térmica com paracetamol quando coadministrada em lactentes.",
      "regras_catch_up": "Iniciar em qualquer idade; após os 2 anos de idade o esquema é de 2 doses com intervalo de 30 a 60 dias.",
      "diferenca_pni_vs_sbim": "Não está no calendário básico do SUS. Recomendada expressamente pela SBIm e Sociedade Brasileira de Pediatria (SBP)."
    },
    {
      "id": "febre_amarela",
      "nome": "Febre Amarela (Atenuada 17DD)",
      "tipo": "Viva atenuada",
      "doencas_protegidas": "Febre Amarela urbana e silvestre",
      "esquema_pni_sus": "1 dose aos 9 meses + 1 reforço obrigatório aos 4 anos de idade. Pessoas de 5 a 59 anos não vacinadas recebem dose única.",
      "esquema_sbim": "Dose aos 9 meses + reforço aos 4 anos. Dose única após os 5 anos de idade.",
      "idade_minima_dias": 270,
      "idade_maxima_anos": 59,
      "doses_esquema": 2,
      "intervalo_minimo_dias": 30,
      "reforcos": "Dose aos 9m e reforço aos 4 anos. Quem tomou a 1ª dose após 5 anos não precisa de reforço.",
      "disponibilidade": "SUS (UBS)",
      "categoria": "Rotina Universal / Endêmica",
      "via_administracao": "Subcutânea (SC)",
      "sitio_anatomico": "Região deltoidea ou tríceps",
      "contraindicacoes": [
        "Crianças menores de 6 meses de idade",
        "Gestantes (salvo situação de surto com alto risco epidemiológico)",
        "Mulheres amamentando bebês menores de 6 meses (suspender aleitamento por 10 dias se vacinação for indispensável)",
        "Indivíduos imunodeprimidos graves, portadores de timoma ou miastenia gravis",
        "Histórico de anafilaxia a ovo de galinha grave"
      ],
      "precaucoes_e_reacoes": "Idosos (≥ 60 anos) requerem avaliação médica de risco-benefício devido ao risco aumentado de doença viscerotrópica aguda.",
      "regras_catch_up": "Quem recebeu 1 dose antes de completar 5 anos de idade DEVE receber mais uma dose de reforço.",
      "diferenca_pni_vs_sbim": "Concordantes."
    },
    {
      "id": "triplice_viral",
      "nome": "Tríplice Viral (SCR)",
      "tipo": "Viva atenuada (vírus do Sarampo, Caxumba e Rubéola)",
      "doencas_protegidas": "Sarampo, Caxumba e Rubéola (e prevenção da Síndrome da Rubéola Congênita)",
      "esquema_pni_sus": "1ª dose aos 12 meses. Aos 15 meses aplica-se a Tetraviral (SCRV) ou 2ª dose de SCR + Varicela. Até 29 anos: 2 doses. De 30 a 59 anos: 1 dose.",
      "esquema_sbim": "1ª dose aos 12 meses e 2ª dose aos 15 meses (preferencialmente como tetraviral). Adultos até 59 anos: garantir 2 doses na vida.",
      "idade_minima_dias": 365,
      "idade_maxima_anos": 59,
      "doses_esquema": 2,
      "intervalo_minimo_dias": 30,
      "reforcos": "2 doses na vida conferem proteção permanente.",
      "disponibilidade": "SUS (UBS) e Rede Privada",
      "categoria": "Rotina Universal",
      "via_administracao": "Subcutânea (SC)",
      "sitio_anatomico": "Região deltoidea ou tricipital",
      "contraindicacoes": [
        "GESTANTES (risco teórico de teratogênese)",
        "Imunossupressão grave congênita ou adquirida",
        "Uso de derivados de sangue (respeitar intervalo de 3 a 11 meses de acordo com a dose)"
      ],
      "precaucoes_e_reacoes": "Exantema morbiliforme leve e febrícula podem ocorrer entre o 7º e 12º dia pós-vacina em até 10% dos vacinados.",
      "regras_catch_up": "Todo indivíduo entre 1 e 29 anos deve ter 2 doses documentadas. Entre 30 e 59 anos, comprovar pelo menos 1 dose.",
      "diferenca_pni_vs_sbim": "A SBIm recomenda que todo adulto até 59 anos tenha 2 doses comprovadas na vida (o SUS exige 1 dose para 30 a 59 anos)."
    },
    {
      "id": "varicela",
      "nome": "Varicela (Catapora)",
      "tipo": "Viva atenuada",
      "doencas_protegidas": "Varicela (Catapora) e complicações bacterianas secundárias",
      "esquema_pni_sus": "1ª dose aos 15 meses (Tetraviral ou monovalente) e 2ª dose aos 4 anos.",
      "esquema_sbim": "2 doses: 1ª dose aos 12-15 meses e 2ª dose entre 15 e 24 meses (idealmente 3 meses após a primeira).",
      "idade_minima_dias": 365,
      "idade_maxima_anos": 120,
      "doses_esquema": 2,
      "intervalo_minimo_dias": 30,
      "reforcos": "2 doses na vida.",
      "disponibilidade": "SUS (15 meses e 4 anos) e Rede Privada",
      "categoria": "Rotina Infantil e Susceptíveis",
      "via_administracao": "Subcutânea (SC)",
      "sitio_anatomico": "Deltoide / Tricipital",
      "contraindicacoes": [
        "Gestação",
        "Imunodeficiência celular grave",
        "Uso concomitante de salicilatos (risco de Síndrome de Reye)"
      ],
      "precaucoes_e_reacoes": "Poucas pápulas ou vesículas podem surgir 1 a 3 semanas após a vacina.",
      "regras_catch_up": "Adolescentes e adultos suscetíveis (sem histórico de catapora ou vacina) devem receber 2 doses com intervalo de 1 a 2 meses.",
      "diferenca_pni_vs_sbim": "O SUS aplica a 2ª dose aos 4 anos; a SBIm antecipa a 2ª dose para a faixa de 15 a 24 meses."
    },
    {
      "id": "hepatite_a",
      "nome": "Hepatite A (Inativada)",
      "tipo": "Inativada purificada",
      "doencas_protegidas": "Hepatite A e insuficiência hepática aguda",
      "esquema_pni_sus": "Dose única aos 15 meses de idade (até 4 anos, 11 meses e 29 dias).",
      "esquema_sbim": "Esquema de 2 doses: 1ª dose aos 12 meses e 2ª dose 6 meses após a primeira.",
      "idade_minima_dias": 365,
      "idade_maxima_anos": 120,
      "doses_esquema": 2,
      "intervalo_minimo_dias": 180,
      "reforcos": "2 doses garantem imunidade protetora por décadas.",
      "disponibilidade": "SUS: 1 dose aos 15m | Privado e CRIE: 2 doses",
      "categoria": "Rotina Infantil / Viajantes / Hepatopatas",
      "via_administracao": "Intramuscular (IM)",
      "sitio_anatomico": "Deltoide ou Vasto lateral",
      "contraindicacoes": [
        "Hipersensibilidade grave anterior"
      ],
      "precaucoes_e_reacoes": "Reações leves no local de aplicação.",
      "regras_catch_up": "Crianças não vacinadas até 5 anos podem tomar na rede privada. Adultos com doença hepática crônica têm indicação formal no CRIE.",
      "diferenca_pni_vs_sbim": "O SUS fornece apenas 1 dose aos 15 meses. A SBIm preconiza esquema completo de 2 doses (0 e 6 meses) para proteção duradoura."
    },
    {
      "id": "hpv_papilomavirus",
      "nome": "HPV (Papilomavírus Humano Quadrivalente / Nonavalente)",
      "tipo": "Inativada recombinante (VLPs - partículas semelhantes a vírus)",
      "doencas_protegidas": "Câncer de colo do útero, vulva, vagina, ânus, pênis, orofaringe e verrugas anogenitais causadas pelos tipos 6, 11, 16 e 18",
      "esquema_pni_sus": "DOSE ÚNICA para meninas e meninos de 9 a 14 anos (desde 2024). Para imunodeprimidos e vítimas de violência sexual de 9 a 45 anos: 3 doses (0, 2 e 6 meses).",
      "esquema_sbim": "Recomenda a HPV nonavalente (HPV9) ou quadrivalente (HPV4). Em menores de 15 anos: 2 doses (0 e 6 meses). A partir dos 15 anos: 3 doses (0, 1-2 e 6 meses).",
      "idade_minima_dias": 3285,
      "idade_maxima_anos": 45,
      "doses_esquema": 1,
      "intervalo_minimo_dias": 60,
      "reforcos": "Não há recomendação de doses de reforço após o esquema completo.",
      "disponibilidade": "SUS: HPV4 (Dose única 9-14 anos) | Privado: HPV9 (9 a 45 anos)",
      "categoria": "Adolescentes e Adultos Jovens",
      "via_administracao": "Intramuscular (IM)",
      "sitio_anatomico": "Deltoide",
      "contraindicacoes": [
        "Gestação (iniciar ou continuar após o parto)",
        "Anafilaxia grave a componente"
      ],
      "precaucoes_e_reacoes": "Dor local e síncope vasovagal (típica de adolescentes). Manter o paciente sentado por 15 minutos pós-injeção.",
      "regras_catch_up": "Jovens até 19 anos que não se vacinaram na idade correta podem ser resgatados conforme campanhas ou rede privada.",
      "diferenca_pni_vs_sbim": "O SUS adotou dose única para ampliar cobertura. A SBIm preconiza 2 doses para 9-14 anos e 3 doses para ≥ 15 anos, além de recomendar a vacina Nonavalente (que cobre mais 5 tipos oncogênicos)."
    },
    {
      "id": "influenza_gripe",
      "nome": "Influenza (Vacina da Gripe)",
      "tipo": "Inativada fracionada (Trivalente no SUS / Quadrivalente e Alta Dose na Rede Privada)",
      "doencas_protegidas": "Gripe sazonal, pneumonias virais e bacterianas secundárias causadas por Influenza A (H1N1, H3N2) e Influenza B",
      "esquema_pni_sus": "Dose anual durante as campanhas nacionais para grupos prioritários (crianças de 6m a 5a, gestantes, puérperas, idosos ≥ 60a, profissionais de saúde e comorbidades).",
      "esquema_sbim": "Dose anual universal para todas as pessoas a partir dos 6 meses de vida, preferencialmente com formulação quadrivalente.",
      "idade_minima_dias": 180,
      "idade_maxima_anos": 120,
      "doses_esquema": 1,
      "intervalo_minimo_dias": 30,
      "reforcos": "Dose anual. Crianças de 6 meses a 8 anos vacinadas pela PRIMEIRA vez recebem 2 doses com intervalo de 30 dias.",
      "disponibilidade": "SUS: Trivalente (Campanhas) | Privado: Quadrivalente e Alta Dose (Efluelda para ≥ 60 anos)",
      "categoria": "Rotina Anual Universal",
      "via_administracao": "Intramuscular (IM)",
      "sitio_anatomico": "Deltoide ou Vasto lateral (lactentes)",
      "contraindicacoes": [
        "Histórico de anafilaxia grave a doses anteriores"
      ],
      "precaucoes_e_reacoes": "Alergia a ovo de galinha NÃO contraindica a vacina; apenas casos de anafilaxia extrema exigem aplicação em ambiente supervisionado.",
      "regras_catch_up": "Vacinar anualmente no outono/inverno.",
      "diferenca_pni_vs_sbim": "O SUS utiliza a vacina Trivalente voltada a grupos prioritários. A SBIm recomenda a Quadrivalente (cobrindo 2 cepas de influenza B) para toda a população a partir de 6 meses e vacina de Alta Dose para idosos."
    },
    {
      "id": "dtpa_gestante_adulto",
      "nome": "dTpa (Tríplice bacteriana acelular adulto)",
      "tipo": "Inativada acelular (toxoides diftérico e tetânico + antígenos purificados de Bordetella pertussis)",
      "doencas_protegidas": "Difteria, Tétano e Coqueluche",
      "esquema_pni_sus": "Gestantes a partir da 20ª semana a cada gestação. Puérperas não vacinadas na gestação (até 45 dias). Trabalhadores da saúde atuando em maternidades/UTI neonatal.",
      "esquema_sbim": "Gestantes em toda gravidez (20ª semana). Substituir pelo menos uma dose de reforço da vacina dT pela dTpa em todos os adultos e idosos a cada 10 anos.",
      "idade_minima_dias": 3650,
      "idade_maxima_anos": 120,
      "doses_esquema": 1,
      "intervalo_minimo_dias": 30,
      "reforcos": "A cada gestação para grávidas; a cada 10 anos para adultos em substituição à dT.",
      "disponibilidade": "SUS: Grávidas e profissionais específicos | Privado: Toda população",
      "categoria": "Gestantes e Adultos",
      "via_administracao": "Intramuscular (IM)",
      "sitio_anatomico": "Deltoide",
      "contraindicacoes": [
        "Encefalopatia nos primeiros 7 dias após vacina prévia"
      ],
      "precaucoes_e_reacoes": "Dor local leve e edema transitório.",
      "regras_catch_up": "Gestante que perdeu o prazo da 20ª semana deve ser vacinada até o momento do parto ou puerpério imediato.",
      "diferenca_pni_vs_sbim": "O SUS restringe a dTpa a gestantes e profissionais específicos. A SBIm recomenda a dTpa para todos os adultos em vez da dT simples para reduzir a circulação da coqueluche na comunidade."
    },
    {
      "id": "herpes_zoster_shingrix",
      "nome": "Herpes Zóster Recombinante (Shingrix - RZV)",
      "tipo": "Inativada recombinante (glicoproteína E com adjuvante AS01B)",
      "doencas_protegidas": "Herpes Zóster ('Cobreiro'), neuralgia pós-herpética e complicações oftálmicas",
      "esquema_pni_sus": "Não incorporada no SUS até o momento.",
      "esquema_sbim": "2 doses com intervalo de 2 meses para todos os adultos a partir de 50 anos e imunodeprimidos a partir de 18 anos.",
      "idade_minima_dias": 6570,
      "idade_maxima_anos": 120,
      "doses_esquema": 2,
      "intervalo_minimo_dias": 60,
      "reforcos": "Não há recomendação de doses de reforço (eficácia comprovada por mais de 10 anos).",
      "disponibilidade": "Rede Privada exclusivamente",
      "categoria": "Pessoas Idosas e Imunodeprimidos",
      "via_administracao": "Intramuscular (IM)",
      "sitio_anatomico": "Deltoide",
      "contraindicacoes": [
        "Hipersensibilidade grave aos componentes",
        "Quadro agudo de Herpes Zóster ativo (aguardar resolução completa das vesículas)"
      ],
      "precaucoes_e_reacoes": "Vacina de alta eficácia (> 90%), mas reatogênica: dor local intensa, fadiga e mialgia em 30-50% nas primeiras 48h.",
      "regras_catch_up": "Quem já teve Herpes Zóster deve receber a vacina após 6 meses do episódio agudo para evitar recidivas.",
      "diferenca_pni_vs_sbim": "A SBIm recomenda com prioridade máxima para ≥ 50 anos e pacientes oncológicos/imunossuprimidos ≥ 18 anos."
    },
    {
      "id": "dengue_qdenga",
      "nome": "Dengue Atenuada Tetravalente (Qdenga - TAK-003)",
      "tipo": "Viva atenuada recombinante quimérica",
      "doencas_protegidas": "Dengue causada pelos sorotipos 1, 2, 3 e 4",
      "esquema_pni_sus": "2 doses (intervalo de 3 meses) para público prioritário (10 a 14 anos) em municípios selecionados pelo Ministério da Saúde.",
      "esquema_sbim": "2 doses (intervalo de 3 meses) para indivíduos de 4 a 60 anos, independentemente de infecção prévia por dengue (soronegativos e soropositivos).",
      "idade_minima_dias": 1460,
      "idade_maxima_anos": 60,
      "doses_esquema": 2,
      "intervalo_minimo_dias": 90,
      "reforcos": "Não há definição de reforço no momento.",
      "disponibilidade": "SUS: 10 a 14 anos (municípios prioritários) | Privado: 4 a 60 anos",
      "categoria": "Endêmica / Prevenção de Epidemias",
      "via_administracao": "Subcutânea (SC)",
      "sitio_anatomico": "Deltoide",
      "contraindicacoes": [
        "Gestantes e lactantes",
        "Imunodeficiência congênita ou adquirida grave (inclusive terapias biológicas imunossupressoras)",
        "Indivíduos com mais de 60 anos (salvo bula aprovada ou autorização médica criteriosa)"
      ],
      "precaucoes_e_reacoes": "Dor local, cefaleia, febrícula leve nos primeiros dias.",
      "regras_catch_up": "Caso haja atraso na 2ª dose, aplicar assim que possível sem reiniciar o esquema.",
      "diferenca_pni_vs_sbim": "O SUS disponibiliza com faixa etária restrita por escassez de doses globais. A SBIm orienta para qualquer pessoa entre 4 e 60 anos."
    },
    {
      "id": "pneumococica_23v",
      "nome": "Pneumocócica 23-valente Polissacarídica (VPP23)",
      "tipo": "Inativada polissacarídica não conjugada",
      "doencas_protegidas": "Pneumonias, meningites e septicemias pneumocócicas causadas por 23 sorotipos",
      "esquema_pni_sus": "1 dose aos 60 anos ou mais para idosos acamados, asilados ou institucionalizados + 1 reforço após 5 anos. Também disponível em CRIEs para diabéticos, cardiopatas, nefropatas e asplênicos.",
      "esquema_sbim": "Esquema sequencial combinado: aplicar primeiro uma vacina conjugada (VPC13, VPC15 ou VPC20) e, 6 a 12 meses depois, aplicar a VPP23, com um único reforço após 5 anos.",
      "idade_minima_dias": 730,
      "idade_maxima_anos": 120,
      "doses_esquema": 2,
      "intervalo_minimo_dias": 180,
      "reforcos": "Apenas 1 reforço após 5 anos da primeira dose (máximo de 2 doses na vida).",
      "disponibilidade": "SUS: Idosos institucionalizados e CRIEs | Privado: Rede privada",
      "categoria": "Idosos e Condições de Risco",
      "via_administracao": "Intramuscular (IM) ou Subcutânea (SC)",
      "sitio_anatomico": "Deltoide",
      "contraindicacoes": [
        "Anafilaxia a componentes"
      ],
      "precaucoes_e_reacoes": "Dor local e rubor transitório.",
      "regras_catch_up": "Nunca aplicar antes da conjugada quando ambas estiverem disponíveis. Respeitar o intervalo mínimo de 6 a 12 meses após a vacina conjugada.",
      "diferenca_pni_vs_sbim": "A SBIm não recomenda o uso isolado da VPP23; preconiza sempre o esquema sequencial iniciado com uma vacina conjugada."
    },
    {
      "id": "vsr_abrysvo_arexvy",
      "nome": "Vírus Sincicial Respiratório (VSR)",
      "tipo": "Inativada proteica recombinante (Abrysvo / Arexvy)",
      "doencas_protegidas": "Bronquiolite e pneumonia grave causadas pelo VSR em recém-nascidos (via gestante) e infecções respiratórias graves em idosos",
      "esquema_pni_sus": "Em avaliação de incorporação na Conitec.",
      "esquema_sbim": "Recomendada para GESTANTES (Abrysvo) entre 24 e 36 semanas de gestação (dose única) para proteger o bebê por até 6 meses. Recomendada para IDOSOS ≥ 60 anos (dose única).",
      "idade_minima_dias": 6570,
      "idade_maxima_anos": 120,
      "doses_esquema": 1,
      "intervalo_minimo_dias": 0,
      "reforcos": "Não estabelecidos até o momento.",
      "disponibilidade": "Rede Privada atualmente",
      "categoria": "Gestantes e Idosos",
      "via_administracao": "Intramuscular (IM)",
      "sitio_anatomico": "Deltoide",
      "contraindicacoes": [
        "Hipersensibilidade grave anterior"
      ],
      "precaucoes_e_reacoes": "Dor local, cefaleia transitória.",
      "regras_catch_up": "Para gestantes, respeitar a janela ideal de aplicação entre a 24ª e 36ª semana gestacional.",
      "diferenca_pni_vs_sbim": "Inovação tecnológica recomendada pelas diretrizes internacionais e SBIm para redução drástica de hospitalizações pediátricas por bronquiolite."
    }
  ]
};\n