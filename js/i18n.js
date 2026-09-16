"use strict";


/* =========================================================
   LANGUAGE CONFIGURATION
   ========================================================= */

const LANGUAGE_STORAGE_KEY =
  "bitcoin-wallet-language";

const DEFAULT_LANGUAGE =
  "en";


export const SUPPORTED_LANGUAGES =
  Object.freeze({

    en: {
      code: "EN",
      name: "English",
      direction: "ltr"
    },

    es: {
      code: "ES",
      name: "Español",
      direction: "ltr"
    },

    "zh-CN": {
      code: "中文",
      name: "简体中文",
      direction: "ltr"
    },

    "pt-BR": {
      code: "PT",
      name: "Português (Brasil)",
      direction: "ltr"
    },

    de: {
      code: "DE",
      name: "Deutsch",
      direction: "ltr"
    },

    fr: {
      code: "FR",
      name: "Français",
      direction: "ltr"
    },

    ja: {
      code: "日本語",
      name: "日本語",
      direction: "ltr"
    },

    ar: {
      code: "العربية",
      name: "العربية",
      direction: "rtl"
    },

    hi: {
      code: "हिन्दी",
      name: "हिन्दी",
      direction: "ltr"
    },

    id: {
      code: "ID",
      name: "Bahasa Indonesia",
      direction: "ltr"
    }

  });


/* =========================================================
   ENGLISH
   ========================================================= */

const ENGLISH = Object.freeze({

  language:
    "Language",

  languageMenu:
    "Select language",

  download:
    "Download",

  online:
    "ONLINE",


  networkTitle:
    "Network for derivation and checks",

  network:
    "Network",

  bitcoin:
    "Bitcoin",

  mainnet:
    "Bitcoin Mainnet",

  testnet:
    "Bitcoin Testnet",

  signet:
    "Bitcoin Signet",

  regtest:
    "Bitcoin Regtest",

  networkNote:
    "This page never connects to a Bitcoin network. The selection determines address formats, key versions, and derivation parameters.",


  createWallet:
    "Create a New Wallet",

  localGeneration:
    "Your wallet is generated locally. No private keys or recovery phrases are sent to a server.",

  recoveryPhrase:
    "Recovery Phrase",

  twelveWords:
    "12 words",

  twentyFourWords:
    "24 words",

  generateWallet:
    "Generate New Wallet",

  generating:
    "Generating...",


  checkingSecurity:
    "Checking browser security...",

  secureRandomAvailable:
    "Secure random number generator available",

  secureRandomUnavailable:
    "Secure random number generation unavailable",

  secureContextRequired:
    "A secure browser context or verified local file is required",

  cryptographicSelfTestFailed:
    "Cryptographic self-test failed. Wallet generation has been disabled.",


  offlineRecommended:
    "Offline use recommended",

  offlineExplanation:
    "For wallets containing real funds, download and verify this application before disconnecting the computer from the internet and generating your wallet.",


  yourWallet:
    "Your Wallet",

  walletBackupInstruction:
    "Write down your recovery phrase and store it somewhere secure.",

  neverSharePhrase:
    "Never share your recovery phrase.",

  phraseDanger:
    "Anyone who has your recovery phrase can control the Bitcoin in this wallet. We will never ask you to enter it into a website.",

  phraseBackup:
    "Your recovery phrase is the backup for this wallet.",


  hidePhrase:
    "Hide Recovery Phrase",

  revealPhrase:
    "Reveal Recovery Phrase",

  copyPhrase:
    "Copy Recovery Phrase",


  receivingAddress:
    "First Receiving Address",

  receivingAddressDescription:
    "This is your first native SegWit Bitcoin receiving address.",

  copyAddress:
    "Copy Address",

  derivationPath:
    "Derivation path",


  consistencyCheckPassed:
    "Wallet consistency check passed",

  consistencyCheckDescription:
    "The recovery phrase was re-derived with the bundled libraries and matched the displayed address and extended public key.",


  advancedInformation:
    "Advanced Wallet Information",

  masterFingerprint:
    "Master Fingerprint",

  extendedPublicKey:
    "Account Extended Public Key",

  derivationStandard:
    "Derivation Standard",


  backup:
    "Backup",

  backupDescription:
    "Store your recovery phrase securely before clearing this wallet data from the browser.",

  printBackup:
    "Print Backup",

  clearWalletData:
    "Clear Wallet Data",


  aboutGenerator:
    "About This Generator",

  aboutDescription:
    "This application generates a deterministic Bitcoin wallet using established Bitcoin wallet standards.",

  hierarchicalKeys:
    "Hierarchical deterministic keys",

  nativeSegwit:
    "Native SegWit addresses",


  important:
    "Important",

  auditWarning:
    "This software has not been independently audited. Do not use it with significant funds until the implementation, dependencies, and generated wallets have been thoroughly verified.",


  sinceBlock:
    "SINCE BLOCK",

  version:
    "VERSION",

  commit:
    "COMMIT",


  switchToLight:
    "Switch to light mode",

  switchToDark:
    "Switch to dark mode",


  copied:
    "Copied",


  invalidNetwork:
    "Invalid Bitcoin network.",

  invalidPhraseLength:
    "Invalid recovery phrase length.",

  unsupportedEntropy:
    "Unsupported entropy size.",

  invalidGeneratedPhrase:
    "Generated recovery phrase failed BIP39 validation.",

  privateKeyFailure:
    "Unable to derive private key.",

  addressFailure:
    "Unable to generate Bitcoin address.",

  verificationFailure:
    "Wallet consistency check failed.",

  generationFailed:
    "Wallet generation failed.",

  clipboardFailed:
    "Unable to copy automatically. Please copy the value manually.",


  copyPhraseConfirmation:
    "Your recovery phrase gives complete control of this wallet.\n\nCopying it may expose the phrase to clipboard history, clipboard managers, synchronization services, or other software on this device.\n\nNever paste it into a website or send it to another person.\n\nCopy the recovery phrase?",

  printConfirmation:
    "Before printing your recovery phrase:\n\n• Make sure nobody can see your screen.\n• Use a printer you trust.\n• Avoid network or cloud printers when possible.\n• Remember that operating systems and printers may retain print jobs.\n• Never upload or photograph the phrase.\n• Store the printed backup securely.\n\nContinue?",

  clearWalletConfirmation:
    "Clear this wallet data from the page?\n\nMake absolutely certain that you have securely backed up the recovery phrase first.\n\nThe application will remove its references and clear the displayed data, but JavaScript cannot guarantee forensic erasure of browser memory."

});


/* =========================================================
   SPANISH
   ========================================================= */

const SPANISH = Object.freeze({

  language:
    "Idioma",

  languageMenu:
    "Seleccionar idioma",

  download:
    "Descargar",

  online:
    "EN LÍNEA",

  networkTitle:
    "Red para derivación y verificaciones",

  network:
    "Red",

  bitcoin:
    "Bitcoin",

  mainnet:
    "Red principal de Bitcoin",

  testnet:
    "Red de pruebas de Bitcoin",

  signet:
    "Bitcoin Signet",

  regtest:
    "Bitcoin Regtest",

  networkNote:
    "Esta página nunca se conecta a una red Bitcoin. La selección determina los formatos de dirección, las versiones de claves y los parámetros de derivación.",

  createWallet:
    "Crear una nueva cartera",

  localGeneration:
    "Tu cartera se genera localmente. Ninguna clave privada ni frase de recuperación se envía a un servidor.",

  recoveryPhrase:
    "Frase de recuperación",

  twelveWords:
    "12 palabras",

  twentyFourWords:
    "24 palabras",

  generateWallet:
    "Generar una nueva cartera",

  generating:
    "Generando...",

  checkingSecurity:
    "Comprobando la seguridad del navegador...",

  secureRandomAvailable:
    "Generador seguro de números aleatorios disponible",

  secureRandomUnavailable:
    "El generador seguro de números aleatorios no está disponible",

  secureContextRequired:
    "Se requiere un contexto seguro del navegador o un archivo local verificado",

  cryptographicSelfTestFailed:
    "La autocomprobación criptográfica falló. La generación de carteras ha sido desactivada.",

  offlineRecommended:
    "Se recomienda usar sin conexión",

  offlineExplanation:
    "Para carteras con fondos reales, descarga y verifica esta aplicación antes de desconectar el equipo de Internet y generar tu cartera.",

  yourWallet:
    "Tu cartera",

  walletBackupInstruction:
    "Anota tu frase de recuperación y guárdala en un lugar seguro.",

  neverSharePhrase:
    "Nunca compartas tu frase de recuperación.",

  phraseDanger:
    "Cualquier persona que tenga tu frase de recuperación puede controlar el Bitcoin de esta cartera. Nunca te pediremos que la introduzcas en un sitio web.",

  phraseBackup:
    "Tu frase de recuperación es la copia de seguridad de esta cartera.",

  hidePhrase:
    "Ocultar frase de recuperación",

  revealPhrase:
    "Mostrar frase de recuperación",

  copyPhrase:
    "Copiar frase de recuperación",

  receivingAddress:
    "Primera dirección de recepción",

  receivingAddressDescription:
    "Esta es tu primera dirección nativa SegWit de recepción de Bitcoin.",

  copyAddress:
    "Copiar dirección",

  derivationPath:
    "Ruta de derivación",

  consistencyCheckPassed:
    "La comprobación de consistencia de la cartera fue correcta",

  consistencyCheckDescription:
    "La frase de recuperación se derivó nuevamente con las bibliotecas incluidas y coincidió con la dirección y la clave pública extendida mostradas.",

  advancedInformation:
    "Información avanzada de la cartera",

  masterFingerprint:
    "Huella maestra",

  extendedPublicKey:
    "Clave pública extendida de la cuenta",

  derivationStandard:
    "Estándar de derivación",

  backup:
    "Copia de seguridad",

  backupDescription:
    "Guarda tu frase de recuperación de forma segura antes de borrar los datos de esta cartera del navegador.",

  printBackup:
    "Imprimir copia de seguridad",

  clearWalletData:
    "Borrar datos de la cartera",

  aboutGenerator:
    "Acerca de este generador",

  aboutDescription:
    "Esta aplicación genera una cartera determinista de Bitcoin utilizando estándares establecidos.",

  hierarchicalKeys:
    "Claves deterministas jerárquicas",

  nativeSegwit:
    "Direcciones SegWit nativas",

  important:
    "Importante",

  auditWarning:
    "Este software no ha sido auditado de forma independiente. No lo uses con fondos importantes hasta verificar completamente la implementación, las dependencias y las carteras generadas.",

  sinceBlock:
    "DESDE EL BLOQUE",

  version:
    "VERSIÓN",

  commit:
    "COMMIT",

  switchToLight:
    "Cambiar al modo claro",

  switchToDark:
    "Cambiar al modo oscuro",

  copied:
    "Copiado",

  invalidNetwork:
    "Red de Bitcoin no válida.",

  invalidPhraseLength:
    "Longitud de frase de recuperación no válida.",

  unsupportedEntropy:
    "Tamaño de entropía no compatible.",

  invalidGeneratedPhrase:
    "La frase generada no superó la validación BIP39.",

  privateKeyFailure:
    "No se pudo derivar la clave privada.",

  addressFailure:
    "No se pudo generar la dirección de Bitcoin.",

  verificationFailure:
    "Falló la comprobación de consistencia de la cartera.",

  generationFailed:
    "No se pudo generar la cartera.",

  clipboardFailed:
    "No se pudo copiar automáticamente. Copia el valor manualmente.",

  copyPhraseConfirmation:
    "Tu frase de recuperación da control total sobre esta cartera.\n\nCopiarla puede exponerla al historial del portapapeles, gestores de portapapeles, servicios de sincronización u otro software del dispositivo.\n\nNunca la pegues en un sitio web ni se la envíes a otra persona.\n\n¿Copiar la frase de recuperación?",

  printConfirmation:
    "Antes de imprimir tu frase de recuperación:\n\n• Asegúrate de que nadie pueda ver tu pantalla.\n• Utiliza una impresora de confianza.\n• Evita impresoras de red o en la nube cuando sea posible.\n• El sistema operativo o la impresora pueden conservar trabajos de impresión.\n• Nunca subas ni fotografíes la frase.\n• Guarda la copia impresa de forma segura.\n\n¿Continuar?",

  clearWalletConfirmation:
    "¿Borrar los datos de esta cartera de la página?\n\nAsegúrate completamente de haber guardado la frase de recuperación.\n\nLa aplicación eliminará sus referencias y limpiará los datos visibles, pero JavaScript no puede garantizar el borrado forense de la memoria del navegador."

});


/* =========================================================
   SIMPLIFIED CHINESE
   ========================================================= */

const CHINESE = Object.freeze({

  language: "语言",
  languageMenu: "选择语言",
  download: "下载",
  online: "在线",

  networkTitle: "用于派生和检查的网络",
  network: "网络",
  bitcoin: "比特币",
  mainnet: "比特币主网",
  testnet: "比特币测试网",
  signet: "比特币 Signet",
  regtest: "比特币 Regtest",

  networkNote:
    "此页面不会连接任何比特币网络。所选网络仅决定地址格式、密钥版本和派生参数。",

  createWallet: "创建新钱包",

  localGeneration:
    "钱包在本地生成。私钥和助记词不会发送到服务器。",

  recoveryPhrase: "助记词",
  twelveWords: "12 个单词",
  twentyFourWords: "24 个单词",
  generateWallet: "生成新钱包",
  generating: "正在生成...",

  checkingSecurity: "正在检查浏览器安全性...",
  secureRandomAvailable: "安全随机数生成器可用",
  secureRandomUnavailable: "安全随机数生成器不可用",

  secureContextRequired:
    "需要安全的浏览器环境或已验证的本地文件",

  cryptographicSelfTestFailed:
    "加密自检失败。钱包生成功能已禁用。",

  offlineRecommended: "建议离线使用",

  offlineExplanation:
    "如果钱包将存放真实资金，请先下载并验证此应用，然后断开互联网连接再生成钱包。",

  yourWallet: "您的钱包",

  walletBackupInstruction:
    "请抄写助记词并将其存放在安全的位置。",

  neverSharePhrase:
    "切勿分享您的助记词。",

  phraseDanger:
    "任何获得助记词的人都可以控制此钱包中的比特币。我们绝不会要求您在网站中输入助记词。",

  phraseBackup:
    "助记词是此钱包的备份。",

  hidePhrase: "隐藏助记词",
  revealPhrase: "显示助记词",
  copyPhrase: "复制助记词",

  receivingAddress: "第一个接收地址",

  receivingAddressDescription:
    "这是您的第一个原生 SegWit 比特币接收地址。",

  copyAddress: "复制地址",
  derivationPath: "派生路径",

  consistencyCheckPassed:
    "钱包一致性检查通过",

  consistencyCheckDescription:
    "已使用内置库重新派生助记词，并确认其与显示的地址和扩展公钥一致。",

  advancedInformation: "高级钱包信息",
  masterFingerprint: "主密钥指纹",
  extendedPublicKey: "账户扩展公钥",
  derivationStandard: "派生标准",

  backup: "备份",

  backupDescription:
    "从浏览器清除此钱包数据之前，请安全保存助记词。",

  printBackup: "打印备份",
  clearWalletData: "清除钱包数据",

  aboutGenerator: "关于此生成器",

  aboutDescription:
    "此应用使用成熟的比特币钱包标准生成确定性比特币钱包。",

  hierarchicalKeys: "分层确定性密钥",
  nativeSegwit: "原生 SegWit 地址",

  important: "重要提示",

  auditWarning:
    "此软件尚未经过独立审计。在彻底验证实现、依赖项和生成的钱包之前，请勿用于存放大量资金。",

  sinceBlock: "起始区块",
  version: "版本",
  commit: "提交",

  switchToLight: "切换到浅色模式",
  switchToDark: "切换到深色模式",

  copied: "已复制",

  invalidNetwork: "无效的比特币网络。",
  invalidPhraseLength: "助记词长度无效。",
  unsupportedEntropy: "不支持的熵长度。",

  invalidGeneratedPhrase:
    "生成的助记词未通过 BIP39 验证。",

  privateKeyFailure: "无法派生私钥。",
  addressFailure: "无法生成比特币地址。",

  verificationFailure:
    "钱包一致性检查失败。",

  generationFailed:
    "钱包生成失败。",

  clipboardFailed:
    "无法自动复制，请手动复制。",

  copyPhraseConfirmation:
    "助记词可以完全控制此钱包。\n\n复制助记词可能会使其暴露给剪贴板历史记录、剪贴板管理器、同步服务或设备上的其他软件。\n\n切勿将其粘贴到网站或发送给他人。\n\n是否复制助记词？",

  printConfirmation:
    "打印助记词之前：\n\n• 确保无人能看到屏幕。\n• 使用可信的打印机。\n• 尽可能避免使用网络或云打印机。\n• 操作系统或打印机可能保留打印任务。\n• 切勿上传或拍摄助记词。\n• 安全保存打印的备份。\n\n是否继续？",

  clearWalletConfirmation:
    "是否从页面清除此钱包数据？\n\n请务必确认已安全备份助记词。\n\n应用会删除自身引用并清除显示的数据，但 JavaScript 无法保证从浏览器内存中进行取证级擦除。"

});


/* =========================================================
   PORTUGUESE — BRAZIL
   ========================================================= */

const PORTUGUESE = Object.freeze({

  language: "Idioma",
  languageMenu: "Selecionar idioma",
  download: "Baixar",
  online: "ONLINE",

  networkTitle: "Rede para derivação e verificações",
  network: "Rede",
  bitcoin: "Bitcoin",
  mainnet: "Rede principal do Bitcoin",
  testnet: "Rede de testes do Bitcoin",
  signet: "Bitcoin Signet",
  regtest: "Bitcoin Regtest",

  networkNote:
    "Esta página nunca se conecta a uma rede Bitcoin. A seleção define os formatos de endereço, versões de chave e parâmetros de derivação.",

  createWallet: "Criar uma nova carteira",

  localGeneration:
    "Sua carteira é gerada localmente. Nenhuma chave privada ou frase de recuperação é enviada a um servidor.",

  recoveryPhrase: "Frase de recuperação",
  twelveWords: "12 palavras",
  twentyFourWords: "24 palavras",
  generateWallet: "Gerar nova carteira",
  generating: "Gerando...",

  checkingSecurity:
    "Verificando a segurança do navegador...",

  secureRandomAvailable:
    "Gerador seguro de números aleatórios disponível",

  secureRandomUnavailable:
    "Gerador seguro de números aleatórios indisponível",

  secureContextRequired:
    "É necessário um contexto seguro do navegador ou um arquivo local verificado",

  cryptographicSelfTestFailed:
    "O autoteste criptográfico falhou. A geração de carteiras foi desativada.",

  offlineRecommended:
    "Uso offline recomendado",

  offlineExplanation:
    "Para carteiras com fundos reais, baixe e verifique este aplicativo antes de desconectar o computador da internet e gerar sua carteira.",

  yourWallet: "Sua carteira",

  walletBackupInstruction:
    "Anote sua frase de recuperação e guarde-a em um local seguro.",

  neverSharePhrase:
    "Nunca compartilhe sua frase de recuperação.",

  phraseDanger:
    "Qualquer pessoa com sua frase de recuperação pode controlar o Bitcoin desta carteira. Nunca pediremos que você a insira em um site.",

  phraseBackup:
    "Sua frase de recuperação é o backup desta carteira.",

  hidePhrase:
    "Ocultar frase de recuperação",

  revealPhrase:
    "Mostrar frase de recuperação",

  copyPhrase:
    "Copiar frase de recuperação",

  receivingAddress:
    "Primeiro endereço de recebimento",

  receivingAddressDescription:
    "Este é seu primeiro endereço nativo SegWit para receber Bitcoin.",

  copyAddress:
    "Copiar endereço",

  derivationPath:
    "Caminho de derivação",

  consistencyCheckPassed:
    "Verificação de consistência da carteira concluída",

  consistencyCheckDescription:
    "A frase de recuperação foi derivada novamente com as bibliotecas incluídas e correspondeu ao endereço e à chave pública estendida exibidos.",

  advancedInformation:
    "Informações avançadas da carteira",

  masterFingerprint:
    "Impressão digital mestra",

  extendedPublicKey:
    "Chave pública estendida da conta",

  derivationStandard:
    "Padrão de derivação",

  backup:
    "Backup",

  backupDescription:
    "Guarde sua frase de recuperação com segurança antes de limpar os dados desta carteira do navegador.",

  printBackup:
    "Imprimir backup",

  clearWalletData:
    "Limpar dados da carteira",

  aboutGenerator:
    "Sobre este gerador",

  aboutDescription:
    "Este aplicativo gera uma carteira determinística de Bitcoin usando padrões estabelecidos.",

  hierarchicalKeys:
    "Chaves determinísticas hierárquicas",

  nativeSegwit:
    "Endereços SegWit nativos",

  important:
    "Importante",

  auditWarning:
    "Este software não foi auditado de forma independente. Não o utilize com valores significativos até que a implementação, as dependências e as carteiras geradas tenham sido verificadas.",

  sinceBlock:
    "DESDE O BLOCO",

  version:
    "VERSÃO",

  commit:
    "COMMIT",

  switchToLight:
    "Mudar para o modo claro",

  switchToDark:
    "Mudar para o modo escuro",

  copied:
    "Copiado",

  invalidNetwork:
    "Rede de Bitcoin inválida.",

  invalidPhraseLength:
    "Comprimento da frase de recuperação inválido.",

  unsupportedEntropy:
    "Tamanho de entropia não suportado.",

  invalidGeneratedPhrase:
    "A frase gerada falhou na validação BIP39.",

  privateKeyFailure:
    "Não foi possível derivar a chave privada.",

  addressFailure:
    "Não foi possível gerar o endereço Bitcoin.",

  verificationFailure:
    "A verificação de consistência da carteira falhou.",

  generationFailed:
    "Falha ao gerar a carteira.",

  clipboardFailed:
    "Não foi possível copiar automaticamente. Copie o valor manualmente.",

  copyPhraseConfirmation:
    "Sua frase de recuperação fornece controle completo desta carteira.\n\nCopiá-la pode expor a frase ao histórico da área de transferência, gerenciadores de área de transferência, serviços de sincronização ou outros programas neste dispositivo.\n\nNunca cole a frase em um site nem a envie para outra pessoa.\n\nCopiar a frase de recuperação?",

  printConfirmation:
    "Antes de imprimir sua frase de recuperação:\n\n• Certifique-se de que ninguém possa ver sua tela.\n• Use uma impressora confiável.\n• Evite impressoras de rede ou em nuvem quando possível.\n• O sistema operacional ou a impressora pode reter trabalhos de impressão.\n• Nunca envie ou fotografe a frase.\n• Armazene o backup impresso com segurança.\n\nContinuar?",

  clearWalletConfirmation:
    "Limpar os dados desta carteira da página?\n\nCertifique-se de que a frase de recuperação foi armazenada com segurança.\n\nO aplicativo removerá suas referências e limpará os dados exibidos, mas o JavaScript não pode garantir a remoção forense da memória do navegador."

});


/* =========================================================
   GERMAN
   ========================================================= */

const GERMAN = Object.freeze({

  language: "Sprache",
  languageMenu: "Sprache auswählen",
  download: "Herunterladen",
  online: "ONLINE",

  networkTitle:
    "Netzwerk für Ableitung und Prüfungen",

  network: "Netzwerk",
  bitcoin: "Bitcoin",
  mainnet: "Bitcoin Mainnet",
  testnet: "Bitcoin Testnet",
  signet: "Bitcoin Signet",
  regtest: "Bitcoin Regtest",

  networkNote:
    "Diese Seite stellt niemals eine Verbindung zu einem Bitcoin-Netzwerk her. Die Auswahl bestimmt Adressformate, Schlüsselversionen und Ableitungsparameter.",

  createWallet:
    "Neue Wallet erstellen",

  localGeneration:
    "Ihre Wallet wird lokal erzeugt. Private Schlüssel und Wiederherstellungsphrasen werden nicht an einen Server gesendet.",

  recoveryPhrase:
    "Wiederherstellungsphrase",

  twelveWords: "12 Wörter",
  twentyFourWords: "24 Wörter",

  generateWallet:
    "Neue Wallet erzeugen",

  generating:
    "Wird erzeugt...",

  checkingSecurity:
    "Browsersicherheit wird geprüft...",

  secureRandomAvailable:
    "Sicherer Zufallszahlengenerator verfügbar",

  secureRandomUnavailable:
    "Sicherer Zufallszahlengenerator nicht verfügbar",

  secureContextRequired:
    "Ein sicherer Browserkontext oder eine verifizierte lokale Datei ist erforderlich",

  cryptographicSelfTestFailed:
    "Der kryptografische Selbsttest ist fehlgeschlagen. Die Wallet-Erzeugung wurde deaktiviert.",

  offlineRecommended:
    "Offline-Nutzung empfohlen",

  offlineExplanation:
    "Für Wallets mit echten Guthaben sollten Sie diese Anwendung herunterladen und überprüfen, bevor Sie den Computer vom Internet trennen und die Wallet erzeugen.",

  yourWallet:
    "Ihre Wallet",

  walletBackupInstruction:
    "Notieren Sie Ihre Wiederherstellungsphrase und bewahren Sie sie sicher auf.",

  neverSharePhrase:
    "Geben Sie Ihre Wiederherstellungsphrase niemals weiter.",

  phraseDanger:
    "Jeder mit Ihrer Wiederherstellungsphrase kann die Bitcoin in dieser Wallet kontrollieren. Wir werden Sie niemals auffordern, sie auf einer Website einzugeben.",

  phraseBackup:
    "Ihre Wiederherstellungsphrase ist die Sicherung dieser Wallet.",

  hidePhrase:
    "Wiederherstellungsphrase verbergen",

  revealPhrase:
    "Wiederherstellungsphrase anzeigen",

  copyPhrase:
    "Wiederherstellungsphrase kopieren",

  receivingAddress:
    "Erste Empfangsadresse",

  receivingAddressDescription:
    "Dies ist Ihre erste native SegWit-Bitcoin-Empfangsadresse.",

  copyAddress:
    "Adresse kopieren",

  derivationPath:
    "Ableitungspfad",

  consistencyCheckPassed:
    "Wallet-Konsistenzprüfung bestanden",

  consistencyCheckDescription:
    "Die Wiederherstellungsphrase wurde mit den enthaltenen Bibliotheken erneut abgeleitet und mit der angezeigten Adresse und dem erweiterten öffentlichen Schlüssel abgeglichen.",

  advancedInformation:
    "Erweiterte Wallet-Informationen",

  masterFingerprint:
    "Master-Fingerabdruck",

  extendedPublicKey:
    "Erweiterter öffentlicher Kontoschlüssel",

  derivationStandard:
    "Ableitungsstandard",

  backup:
    "Sicherung",

  backupDescription:
    "Bewahren Sie Ihre Wiederherstellungsphrase sicher auf, bevor Sie die Wallet-Daten aus dem Browser löschen.",

  printBackup:
    "Sicherung drucken",

  clearWalletData:
    "Wallet-Daten löschen",

  aboutGenerator:
    "Über diesen Generator",

  aboutDescription:
    "Diese Anwendung erzeugt eine deterministische Bitcoin-Wallet nach etablierten Bitcoin-Wallet-Standards.",

  hierarchicalKeys:
    "Hierarchisch-deterministische Schlüssel",

  nativeSegwit:
    "Native SegWit-Adressen",

  important:
    "Wichtig",

  auditWarning:
    "Diese Software wurde nicht unabhängig geprüft. Verwenden Sie sie nicht für bedeutende Beträge, bevor Implementierung, Abhängigkeiten und erzeugte Wallets vollständig verifiziert wurden.",

  sinceBlock:
    "SEIT BLOCK",

  version:
    "VERSION",

  commit:
    "COMMIT",

  switchToLight:
    "Zum hellen Modus wechseln",

  switchToDark:
    "Zum dunklen Modus wechseln",

  copied:
    "Kopiert",

  invalidNetwork:
    "Ungültiges Bitcoin-Netzwerk.",

  invalidPhraseLength:
    "Ungültige Länge der Wiederherstellungsphrase.",

  unsupportedEntropy:
    "Nicht unterstützte Entropiegröße.",

  invalidGeneratedPhrase:
    "Die erzeugte Wiederherstellungsphrase hat die BIP39-Prüfung nicht bestanden.",

  privateKeyFailure:
    "Privater Schlüssel konnte nicht abgeleitet werden.",

  addressFailure:
    "Bitcoin-Adresse konnte nicht erzeugt werden.",

  verificationFailure:
    "Wallet-Konsistenzprüfung fehlgeschlagen.",

  generationFailed:
    "Wallet-Erzeugung fehlgeschlagen.",

  clipboardFailed:
    "Automatisches Kopieren nicht möglich. Bitte kopieren Sie den Wert manuell.",

  copyPhraseConfirmation:
    "Ihre Wiederherstellungsphrase ermöglicht die vollständige Kontrolle über diese Wallet.\n\nBeim Kopieren kann sie im Zwischenablageverlauf, in Zwischenablage-Managern, Synchronisierungsdiensten oder anderer Software auf diesem Gerät gespeichert werden.\n\nFügen Sie sie niemals auf einer Website ein und senden Sie sie nicht an andere Personen.\n\nWiederherstellungsphrase kopieren?",

  printConfirmation:
    "Vor dem Drucken Ihrer Wiederherstellungsphrase:\n\n• Stellen Sie sicher, dass niemand Ihren Bildschirm sehen kann.\n• Verwenden Sie einen vertrauenswürdigen Drucker.\n• Vermeiden Sie nach Möglichkeit Netzwerk- oder Cloud-Drucker.\n• Betriebssystem oder Drucker können Druckaufträge speichern.\n• Laden Sie die Phrase niemals hoch und fotografieren Sie sie nicht.\n• Bewahren Sie die gedruckte Sicherung sicher auf.\n\nFortfahren?",

  clearWalletConfirmation:
    "Wallet-Daten von dieser Seite löschen?\n\nVergewissern Sie sich unbedingt, dass die Wiederherstellungsphrase sicher gesichert wurde.\n\nDie Anwendung entfernt ihre Referenzen und löscht die angezeigten Daten, JavaScript kann jedoch keine forensische Löschung des Browserspeichers garantieren."

});


/* =========================================================
   FRENCH
   ========================================================= */

const FRENCH = Object.freeze({

  language: "Langue",
  languageMenu: "Choisir la langue",
  download: "Télécharger",
  online: "EN LIGNE",

  networkTitle:
    "Réseau pour la dérivation et les vérifications",

  network: "Réseau",
  bitcoin: "Bitcoin",
  mainnet: "Réseau principal Bitcoin",
  testnet: "Réseau de test Bitcoin",
  signet: "Bitcoin Signet",
  regtest: "Bitcoin Regtest",

  networkNote:
    "Cette page ne se connecte jamais à un réseau Bitcoin. Le choix détermine les formats d'adresse, les versions de clés et les paramètres de dérivation.",

  createWallet:
    "Créer un nouveau portefeuille",

  localGeneration:
    "Votre portefeuille est généré localement. Aucune clé privée ni phrase de récupération n'est envoyée à un serveur.",

  recoveryPhrase:
    "Phrase de récupération",

  twelveWords:
    "12 mots",

  twentyFourWords:
    "24 mots",

  generateWallet:
    "Générer un nouveau portefeuille",

  generating:
    "Génération...",

  checkingSecurity:
    "Vérification de la sécurité du navigateur...",

  secureRandomAvailable:
    "Générateur aléatoire sécurisé disponible",

  secureRandomUnavailable:
    "Générateur aléatoire sécurisé indisponible",

  secureContextRequired:
    "Un contexte de navigateur sécurisé ou un fichier local vérifié est requis",

  cryptographicSelfTestFailed:
    "L'auto-test cryptographique a échoué. La génération de portefeuilles a été désactivée.",

  offlineRecommended:
    "Utilisation hors ligne recommandée",

  offlineExplanation:
    "Pour un portefeuille contenant des fonds réels, téléchargez et vérifiez cette application avant de déconnecter l'ordinateur d'Internet et de générer votre portefeuille.",

  yourWallet:
    "Votre portefeuille",

  walletBackupInstruction:
    "Notez votre phrase de récupération et conservez-la dans un endroit sûr.",

  neverSharePhrase:
    "Ne partagez jamais votre phrase de récupération.",

  phraseDanger:
    "Toute personne possédant votre phrase de récupération peut contrôler les bitcoins de ce portefeuille. Nous ne vous demanderons jamais de la saisir sur un site web.",

  phraseBackup:
    "Votre phrase de récupération constitue la sauvegarde de ce portefeuille.",

  hidePhrase:
    "Masquer la phrase de récupération",

  revealPhrase:
    "Afficher la phrase de récupération",

  copyPhrase:
    "Copier la phrase de récupération",

  receivingAddress:
    "Première adresse de réception",

  receivingAddressDescription:
    "Il s'agit de votre première adresse de réception Bitcoin SegWit native.",

  copyAddress:
    "Copier l'adresse",

  derivationPath:
    "Chemin de dérivation",

  consistencyCheckPassed:
    "Contrôle de cohérence du portefeuille réussi",

  consistencyCheckDescription:
    "La phrase de récupération a été redérivée avec les bibliothèques intégrées et correspond à l'adresse et à la clé publique étendue affichées.",

  advancedInformation:
    "Informations avancées du portefeuille",

  masterFingerprint:
    "Empreinte principale",

  extendedPublicKey:
    "Clé publique étendue du compte",

  derivationStandard:
    "Norme de dérivation",

  backup:
    "Sauvegarde",

  backupDescription:
    "Conservez votre phrase de récupération en sécurité avant d'effacer les données de ce portefeuille du navigateur.",

  printBackup:
    "Imprimer la sauvegarde",

  clearWalletData:
    "Effacer les données du portefeuille",

  aboutGenerator:
    "À propos de ce générateur",

  aboutDescription:
    "Cette application génère un portefeuille Bitcoin déterministe selon les normes établies.",

  hierarchicalKeys:
    "Clés déterministes hiérarchiques",

  nativeSegwit:
    "Adresses SegWit natives",

  important:
    "Important",

  auditWarning:
    "Ce logiciel n'a pas été audité de manière indépendante. Ne l'utilisez pas avec des fonds importants avant d'avoir entièrement vérifié son implémentation, ses dépendances et les portefeuilles générés.",

  sinceBlock:
    "DEPUIS LE BLOC",

  version:
    "VERSION",

  commit:
    "COMMIT",

  switchToLight:
    "Passer au mode clair",

  switchToDark:
    "Passer au mode sombre",

  copied:
    "Copié",

  invalidNetwork:
    "Réseau Bitcoin invalide.",

  invalidPhraseLength:
    "Longueur de phrase de récupération invalide.",

  unsupportedEntropy:
    "Taille d'entropie non prise en charge.",

  invalidGeneratedPhrase:
    "La phrase de récupération générée a échoué à la validation BIP39.",

  privateKeyFailure:
    "Impossible de dériver la clé privée.",

  addressFailure:
    "Impossible de générer l'adresse Bitcoin.",

  verificationFailure:
    "Le contrôle de cohérence du portefeuille a échoué.",

  generationFailed:
    "La génération du portefeuille a échoué.",

  clipboardFailed:
    "Impossible de copier automatiquement. Veuillez copier la valeur manuellement.",

  copyPhraseConfirmation:
    "Votre phrase de récupération donne le contrôle complet de ce portefeuille.\n\nLa copier peut l'exposer à l'historique du presse-papiers, aux gestionnaires de presse-papiers, aux services de synchronisation ou à d'autres logiciels de cet appareil.\n\nNe la collez jamais sur un site web et ne l'envoyez jamais à une autre personne.\n\nCopier la phrase de récupération ?",

  printConfirmation:
    "Avant d'imprimer votre phrase de récupération :\n\n• Assurez-vous que personne ne peut voir votre écran.\n• Utilisez une imprimante de confiance.\n• Évitez si possible les imprimantes réseau ou cloud.\n• Le système d'exploitation ou l'imprimante peut conserver les travaux d'impression.\n• Ne téléversez et ne photographiez jamais la phrase.\n• Conservez la sauvegarde imprimée en lieu sûr.\n\nContinuer ?",

  clearWalletConfirmation:
    "Effacer les données de ce portefeuille de la page ?\n\nAssurez-vous absolument d'avoir sauvegardé la phrase de récupération.\n\nL'application supprimera ses références et effacera les données affichées, mais JavaScript ne peut pas garantir l'effacement forensique de la mémoire du navigateur."

});


/* =========================================================
   JAPANESE
   ========================================================= */

const JAPANESE = Object.freeze({

  language: "言語",
  languageMenu: "言語を選択",
  download: "ダウンロード",
  online: "オンライン",

  networkTitle: "導出と検証に使用するネットワーク",
  network: "ネットワーク",
  bitcoin: "ビットコイン",
  mainnet: "ビットコイン メインネット",
  testnet: "ビットコイン テストネット",
  signet: "ビットコイン Signet",
  regtest: "ビットコイン Regtest",

  networkNote:
    "このページは Bitcoin ネットワークへ接続しません。選択したネットワークはアドレス形式、鍵バージョン、導出パラメータのみを決定します。",

  createWallet:
    "新しいウォレットを作成",

  localGeneration:
    "ウォレットはローカルで生成されます。秘密鍵やリカバリーフレーズがサーバーへ送信されることはありません。",

  recoveryPhrase:
    "リカバリーフレーズ",

  twelveWords:
    "12単語",

  twentyFourWords:
    "24単語",

  generateWallet:
    "新しいウォレットを生成",

  generating:
    "生成中...",

  checkingSecurity:
    "ブラウザのセキュリティを確認しています...",

  secureRandomAvailable:
    "安全な乱数生成器が利用できます",

  secureRandomUnavailable:
    "安全な乱数生成器を利用できません",

  secureContextRequired:
    "安全なブラウザ環境または検証済みのローカルファイルが必要です",

  cryptographicSelfTestFailed:
    "暗号学的セルフテストに失敗しました。ウォレット生成は無効になりました。",

  offlineRecommended:
    "オフラインでの使用を推奨",

  offlineExplanation:
    "実際の資金を保管する場合は、このアプリをダウンロードして検証した後、インターネットから切断してウォレットを生成してください。",

  yourWallet:
    "あなたのウォレット",

  walletBackupInstruction:
    "リカバリーフレーズを書き留め、安全な場所に保管してください。",

  neverSharePhrase:
    "リカバリーフレーズを他人と共有しないでください。",

  phraseDanger:
    "リカバリーフレーズを知っている人は、このウォレットの Bitcoin を完全に管理できます。ウェブサイトへの入力を求めることはありません。",

  phraseBackup:
    "リカバリーフレーズがこのウォレットのバックアップです。",

  hidePhrase:
    "リカバリーフレーズを隠す",

  revealPhrase:
    "リカバリーフレーズを表示",

  copyPhrase:
    "リカバリーフレーズをコピー",

  receivingAddress:
    "最初の受取アドレス",

  receivingAddressDescription:
    "これは最初のネイティブ SegWit ビットコイン受取アドレスです。",

  copyAddress:
    "アドレスをコピー",

  derivationPath:
    "導出パス",

  consistencyCheckPassed:
    "ウォレット整合性チェック成功",

  consistencyCheckDescription:
    "リカバリーフレーズを同梱ライブラリで再導出し、表示されているアドレスと拡張公開鍵に一致することを確認しました。",

  advancedInformation:
    "ウォレットの詳細情報",

  masterFingerprint:
    "マスターフィンガープリント",

  extendedPublicKey:
    "アカウント拡張公開鍵",

  derivationStandard:
    "導出規格",

  backup:
    "バックアップ",

  backupDescription:
    "ブラウザからウォレットデータを消去する前に、リカバリーフレーズを安全に保管してください。",

  printBackup:
    "バックアップを印刷",

  clearWalletData:
    "ウォレットデータを消去",

  aboutGenerator:
    "このジェネレーターについて",

  aboutDescription:
    "このアプリは確立されたビットコインウォレット規格を使用して、決定論的ウォレットを生成します。",

  hierarchicalKeys:
    "階層的決定性鍵",

  nativeSegwit:
    "ネイティブ SegWit アドレス",

  important:
    "重要",

  auditWarning:
    "このソフトウェアは独立監査を受けていません。実装、依存関係、生成されたウォレットを十分に検証するまで、多額の資金には使用しないでください。",

  sinceBlock:
    "開始ブロック",

  version:
    "バージョン",

  commit:
    "コミット",

  switchToLight:
    "ライトモードに切り替える",

  switchToDark:
    "ダークモードに切り替える",

  copied:
    "コピーしました",

  invalidNetwork:
    "無効な Bitcoin ネットワークです。",

  invalidPhraseLength:
    "リカバリーフレーズの長さが無効です。",

  unsupportedEntropy:
    "サポートされていないエントロピーサイズです。",

  invalidGeneratedPhrase:
    "生成されたリカバリーフレーズが BIP39 検証に失敗しました。",

  privateKeyFailure:
    "秘密鍵を導出できませんでした。",

  addressFailure:
    "Bitcoin アドレスを生成できませんでした。",

  verificationFailure:
    "ウォレット整合性チェックに失敗しました。",

  generationFailed:
    "ウォレット生成に失敗しました。",

  clipboardFailed:
    "自動コピーに失敗しました。手動でコピーしてください。",

  copyPhraseConfirmation:
    "リカバリーフレーズがあれば、このウォレットを完全に管理できます。\n\nコピーすると、クリップボード履歴、クリップボード管理ソフト、同期サービス、その他のソフトウェアにフレーズが残る可能性があります。\n\nウェブサイトに貼り付けたり他人へ送信したりしないでください。\n\nコピーしますか？",

  printConfirmation:
    "リカバリーフレーズを印刷する前に：\n\n• 他人から画面が見えないことを確認してください。\n• 信頼できるプリンターを使用してください。\n• 可能であればネットワークまたはクラウドプリンターを避けてください。\n• OS やプリンターが印刷ジョブを保存する場合があります。\n• フレーズをアップロードしたり撮影したりしないでください。\n• 印刷したバックアップを安全に保管してください。\n\n続行しますか？",

  clearWalletConfirmation:
    "このページからウォレットデータを消去しますか？\n\nリカバリーフレーズを安全にバックアップ済みであることを必ず確認してください。\n\nアプリは参照と表示データを削除しますが、JavaScript ではブラウザメモリの完全な消去を保証できません。"

});


/* =========================================================
   ARABIC
   ========================================================= */

const ARABIC = Object.freeze({

  language: "اللغة",
  languageMenu: "اختر اللغة",
  download: "تنزيل",
  online: "متصل",

  networkTitle:
    "شبكة الاشتقاق والتحقق",

  network: "الشبكة",
  bitcoin: "بيتكوين",
  mainnet: "شبكة بيتكوين الرئيسية",
  testnet: "شبكة بيتكوين التجريبية",
  signet: "شبكة Signet",
  regtest: "شبكة Regtest",

  networkNote:
    "لا تتصل هذه الصفحة بأي شبكة بيتكوين. يحدد الاختيار تنسيقات العناوين وإصدارات المفاتيح ومعلمات الاشتقاق فقط.",

  createWallet:
    "إنشاء محفظة جديدة",

  localGeneration:
    "يتم إنشاء محفظتك محليًا. لا تُرسل المفاتيح الخاصة أو عبارة الاسترداد إلى أي خادم.",

  recoveryPhrase:
    "عبارة الاسترداد",

  twelveWords:
    "12 كلمة",

  twentyFourWords:
    "24 كلمة",

  generateWallet:
    "إنشاء محفظة جديدة",

  generating:
    "جارٍ الإنشاء...",

  checkingSecurity:
    "جارٍ التحقق من أمان المتصفح...",

  secureRandomAvailable:
    "مولد الأرقام العشوائية الآمن متاح",

  secureRandomUnavailable:
    "مولد الأرقام العشوائية الآمن غير متاح",

  secureContextRequired:
    "يلزم سياق متصفح آمن أو ملف محلي تم التحقق منه",

  cryptographicSelfTestFailed:
    "فشل الاختبار الذاتي للتشفير. تم تعطيل إنشاء المحافظ.",

  offlineRecommended:
    "يوصى بالاستخدام دون اتصال",

  offlineExplanation:
    "للمحافظ التي تحتوي على أموال حقيقية، نزّل هذا التطبيق وتحقق منه قبل فصل الكمبيوتر عن الإنترنت وإنشاء المحفظة.",

  yourWallet:
    "محفظتك",

  walletBackupInstruction:
    "اكتب عبارة الاسترداد واحفظها في مكان آمن.",

  neverSharePhrase:
    "لا تشارك عبارة الاسترداد مطلقًا.",

  phraseDanger:
    "يمكن لأي شخص يمتلك عبارة الاسترداد التحكم في البيتكوين الموجود في هذه المحفظة. لن نطلب منك إدخالها في موقع ويب.",

  phraseBackup:
    "عبارة الاسترداد هي النسخة الاحتياطية لهذه المحفظة.",

  hidePhrase:
    "إخفاء عبارة الاسترداد",

  revealPhrase:
    "إظهار عبارة الاسترداد",

  copyPhrase:
    "نسخ عبارة الاسترداد",

  receivingAddress:
    "عنوان الاستلام الأول",

  receivingAddressDescription:
    "هذا هو أول عنوان استلام Bitcoin من نوع SegWit الأصلي.",

  copyAddress:
    "نسخ العنوان",

  derivationPath:
    "مسار الاشتقاق",

  consistencyCheckPassed:
    "نجح فحص اتساق المحفظة",

  consistencyCheckDescription:
    "تم اشتقاق عبارة الاسترداد مرة أخرى باستخدام المكتبات المضمنة وتطابقت مع العنوان والمفتاح العام الممتد المعروضين.",

  advancedInformation:
    "معلومات المحفظة المتقدمة",

  masterFingerprint:
    "بصمة المفتاح الرئيسي",

  extendedPublicKey:
    "المفتاح العام الممتد للحساب",

  derivationStandard:
    "معيار الاشتقاق",

  backup:
    "نسخة احتياطية",

  backupDescription:
    "احفظ عبارة الاسترداد بأمان قبل مسح بيانات هذه المحفظة من المتصفح.",

  printBackup:
    "طباعة النسخة الاحتياطية",

  clearWalletData:
    "مسح بيانات المحفظة",

  aboutGenerator:
    "حول هذا المولد",

  aboutDescription:
    "ينشئ هذا التطبيق محفظة Bitcoin حتمية باستخدام معايير محافظ Bitcoin المعتمدة.",

  hierarchicalKeys:
    "مفاتيح حتمية هرمية",

  nativeSegwit:
    "عناوين SegWit أصلية",

  important:
    "مهم",

  auditWarning:
    "لم يخضع هذا البرنامج لتدقيق مستقل. لا تستخدمه مع مبالغ كبيرة حتى يتم التحقق الكامل من التنفيذ والاعتماديات والمحافظ الناتجة.",

  sinceBlock:
    "منذ الكتلة",

  version:
    "الإصدار",

  commit:
    "COMMIT",

  switchToLight:
    "التبديل إلى الوضع الفاتح",

  switchToDark:
    "التبديل إلى الوضع الداكن",

  copied:
    "تم النسخ",

  invalidNetwork:
    "شبكة Bitcoin غير صالحة.",

  invalidPhraseLength:
    "طول عبارة الاسترداد غير صالح.",

  unsupportedEntropy:
    "حجم العشوائية غير مدعوم.",

  invalidGeneratedPhrase:
    "فشلت عبارة الاسترداد الناتجة في تحقق BIP39.",

  privateKeyFailure:
    "تعذر اشتقاق المفتاح الخاص.",

  addressFailure:
    "تعذر إنشاء عنوان Bitcoin.",

  verificationFailure:
    "فشل فحص اتساق المحفظة.",

  generationFailed:
    "فشل إنشاء المحفظة.",

  clipboardFailed:
    "تعذر النسخ تلقائيًا. يرجى نسخ القيمة يدويًا.",

  copyPhraseConfirmation:
    "تمنح عبارة الاسترداد سيطرة كاملة على هذه المحفظة.\n\nقد يؤدي نسخها إلى كشفها في سجل الحافظة أو برامج إدارة الحافظة أو خدمات المزامنة أو برامج أخرى على الجهاز.\n\nلا تلصقها في موقع ويب ولا ترسلها إلى شخص آخر.\n\nهل تريد نسخ عبارة الاسترداد؟",

  printConfirmation:
    "قبل طباعة عبارة الاسترداد:\n\n• تأكد من عدم قدرة أي شخص على رؤية الشاشة.\n• استخدم طابعة موثوقة.\n• تجنب طابعات الشبكة أو السحابة إن أمكن.\n• قد يحتفظ نظام التشغيل أو الطابعة بمهام الطباعة.\n• لا ترفع العبارة أو تلتقط صورة لها.\n• احفظ النسخة المطبوعة بأمان.\n\nمتابعة؟",

  clearWalletConfirmation:
    "هل تريد مسح بيانات هذه المحفظة من الصفحة؟\n\nتأكد تمامًا من أنك قمت بحفظ عبارة الاسترداد بأمان.\n\nسيزيل التطبيق مراجعه ويمسح البيانات المعروضة، لكن JavaScript لا يمكنه ضمان المسح الجنائي لذاكرة المتصفح."

});


/* =========================================================
   HINDI
   ========================================================= */

const HINDI = Object.freeze({

  language: "भाषा",
  languageMenu: "भाषा चुनें",
  download: "डाउनलोड",
  online: "ऑनलाइन",

  networkTitle:
    "डेरिवेशन और जाँच के लिए नेटवर्क",

  network: "नेटवर्क",
  bitcoin: "बिटकॉइन",
  mainnet: "बिटकॉइन मेननेट",
  testnet: "बिटकॉइन टेस्टनेट",
  signet: "बिटकॉइन Signet",
  regtest: "बिटकॉइन Regtest",

  networkNote:
    "यह पृष्ठ किसी Bitcoin नेटवर्क से कनेक्ट नहीं होता। चयन केवल पता प्रारूप, कुंजी संस्करण और डेरिवेशन पैरामीटर निर्धारित करता है।",

  createWallet:
    "नया वॉलेट बनाएँ",

  localGeneration:
    "आपका वॉलेट स्थानीय रूप से बनाया जाता है। निजी कुंजी या रिकवरी वाक्यांश किसी सर्वर को नहीं भेजे जाते।",

  recoveryPhrase:
    "रिकवरी वाक्यांश",

  twelveWords:
    "12 शब्द",

  twentyFourWords:
    "24 शब्द",

  generateWallet:
    "नया वॉलेट बनाएँ",

  generating:
    "बनाया जा रहा है...",

  checkingSecurity:
    "ब्राउज़र सुरक्षा की जाँच हो रही है...",

  secureRandomAvailable:
    "सुरक्षित रैंडम नंबर जनरेटर उपलब्ध है",

  secureRandomUnavailable:
    "सुरक्षित रैंडम नंबर जनरेटर उपलब्ध नहीं है",

  secureContextRequired:
    "सुरक्षित ब्राउज़र संदर्भ या सत्यापित स्थानीय फ़ाइल आवश्यक है",

  cryptographicSelfTestFailed:
    "क्रिप्टोग्राफ़िक स्व-परीक्षण विफल हुआ। वॉलेट निर्माण अक्षम कर दिया गया है।",

  offlineRecommended:
    "ऑफलाइन उपयोग की सलाह",

  offlineExplanation:
    "वास्तविक धन वाले वॉलेट के लिए, इंटरनेट से डिस्कनेक्ट करने और वॉलेट बनाने से पहले इस ऐप को डाउनलोड और सत्यापित करें।",

  yourWallet:
    "आपका वॉलेट",

  walletBackupInstruction:
    "अपना रिकवरी वाक्यांश लिखें और सुरक्षित स्थान पर रखें।",

  neverSharePhrase:
    "अपना रिकवरी वाक्यांश कभी साझा न करें।",

  phraseDanger:
    "रिकवरी वाक्यांश रखने वाला कोई भी व्यक्ति इस वॉलेट के बिटकॉइन को नियंत्रित कर सकता है। हम इसे किसी वेबसाइट पर दर्ज करने के लिए कभी नहीं कहेंगे।",

  phraseBackup:
    "रिकवरी वाक्यांश इस वॉलेट का बैकअप है।",

  hidePhrase:
    "रिकवरी वाक्यांश छिपाएँ",

  revealPhrase:
    "रिकवरी वाक्यांश दिखाएँ",

  copyPhrase:
    "रिकवरी वाक्यांश कॉपी करें",

  receivingAddress:
    "पहला प्राप्ति पता",

  receivingAddressDescription:
    "यह आपका पहला नेटिव SegWit बिटकॉइन प्राप्ति पता है।",

  copyAddress:
    "पता कॉपी करें",

  derivationPath:
    "डेरिवेशन पथ",

  consistencyCheckPassed:
    "वॉलेट संगति जाँच सफल",

  consistencyCheckDescription:
    "रिकवरी वाक्यांश को शामिल लाइब्रेरी से फिर से डेराइव किया गया और प्रदर्शित पते तथा विस्तारित सार्वजनिक कुंजी से मिलान किया गया।",

  advancedInformation:
    "उन्नत वॉलेट जानकारी",

  masterFingerprint:
    "मास्टर फिंगरप्रिंट",

  extendedPublicKey:
    "खाता विस्तारित सार्वजनिक कुंजी",

  derivationStandard:
    "डेरिवेशन मानक",

  backup:
    "बैकअप",

  backupDescription:
    "ब्राउज़र से वॉलेट डेटा साफ़ करने से पहले रिकवरी वाक्यांश को सुरक्षित रखें।",

  printBackup:
    "बैकअप प्रिंट करें",

  clearWalletData:
    "वॉलेट डेटा साफ़ करें",

  aboutGenerator:
    "इस जेनरेटर के बारे में",

  aboutDescription:
    "यह एप्लिकेशन स्थापित Bitcoin वॉलेट मानकों का उपयोग करके एक नियतात्मक Bitcoin वॉलेट बनाता है।",

  hierarchicalKeys:
    "हायरार्किकल डिटरमिनिस्टिक कुंजियाँ",

  nativeSegwit:
    "नेटिव SegWit पते",

  important:
    "महत्वपूर्ण",

  auditWarning:
    "इस सॉफ़्टवेयर का स्वतंत्र ऑडिट नहीं हुआ है। कार्यान्वयन, निर्भरताओं और बनाए गए वॉलेटों का पूरी तरह सत्यापन होने तक बड़ी राशि के लिए इसका उपयोग न करें।",

  sinceBlock:
    "ब्लॉक से",

  version:
    "संस्करण",

  commit:
    "COMMIT",

  switchToLight:
    "लाइट मोड पर जाएँ",

  switchToDark:
    "डार्क मोड पर जाएँ",

  copied:
    "कॉपी किया गया",

  invalidNetwork:
    "अमान्य Bitcoin नेटवर्क।",

  invalidPhraseLength:
    "रिकवरी वाक्यांश की लंबाई अमान्य है।",

  unsupportedEntropy:
    "असमर्थित एंट्रॉपी आकार।",

  invalidGeneratedPhrase:
    "बनाया गया रिकवरी वाक्यांश BIP39 सत्यापन में विफल रहा।",

  privateKeyFailure:
    "निजी कुंजी डेराइव नहीं की जा सकी।",

  addressFailure:
    "Bitcoin पता नहीं बनाया जा सका।",

  verificationFailure:
    "वॉलेट संगति जाँच विफल हुई।",

  generationFailed:
    "वॉलेट निर्माण विफल हुआ।",

  clipboardFailed:
    "स्वचालित रूप से कॉपी नहीं किया जा सका। कृपया मान को मैन्युअल रूप से कॉपी करें।",

  copyPhraseConfirmation:
    "आपका रिकवरी वाक्यांश इस वॉलेट पर पूरा नियंत्रण देता है।\n\nइसे कॉपी करने से यह क्लिपबोर्ड इतिहास, क्लिपबोर्ड मैनेजर, सिंक्रोनाइज़ेशन सेवाओं या इस डिवाइस के अन्य सॉफ़्टवेयर में दिखाई दे सकता है।\n\nइसे किसी वेबसाइट में पेस्ट न करें और किसी अन्य व्यक्ति को न भेजें।\n\nरिकवरी वाक्यांश कॉपी करें?",

  printConfirmation:
    "रिकवरी वाक्यांश प्रिंट करने से पहले:\n\n• सुनिश्चित करें कि कोई आपकी स्क्रीन नहीं देख सकता।\n• विश्वसनीय प्रिंटर का उपयोग करें।\n• जहाँ संभव हो नेटवर्क या क्लाउड प्रिंटर से बचें।\n• ऑपरेटिंग सिस्टम या प्रिंटर प्रिंट जॉब सहेज सकते हैं।\n• वाक्यांश अपलोड या फ़ोटोग्राफ़ न करें।\n• प्रिंटेड बैकअप सुरक्षित रखें।\n\nजारी रखें?",

  clearWalletConfirmation:
    "इस पृष्ठ से वॉलेट डेटा साफ़ करें?\n\nपूरी तरह सुनिश्चित करें कि रिकवरी वाक्यांश सुरक्षित रूप से बैकअप किया गया है।\n\nएप्लिकेशन अपने संदर्भ और दिखाई देने वाला डेटा हटा देगा, लेकिन JavaScript ब्राउज़र मेमोरी के फोरेंसिक मिटाने की गारंटी नहीं दे सकता।"

});


/* =========================================================
   INDONESIAN
   ========================================================= */

const INDONESIAN = Object.freeze({

  language: "Bahasa",
  languageMenu: "Pilih bahasa",
  download: "Unduh",
  online: "ONLINE",

  networkTitle:
    "Jaringan untuk derivasi dan pemeriksaan",

  network: "Jaringan",
  bitcoin: "Bitcoin",
  mainnet: "Bitcoin Mainnet",
  testnet: "Bitcoin Testnet",
  signet: "Bitcoin Signet",
  regtest: "Bitcoin Regtest",

  networkNote:
    "Halaman ini tidak pernah terhubung ke jaringan Bitcoin. Pilihan jaringan hanya menentukan format alamat, versi kunci, dan parameter derivasi.",

  createWallet:
    "Buat Dompet Baru",

  localGeneration:
    "Dompet Anda dibuat secara lokal. Kunci privat dan frasa pemulihan tidak dikirim ke server.",

  recoveryPhrase:
    "Frasa Pemulihan",

  twelveWords:
    "12 kata",

  twentyFourWords:
    "24 kata",

  generateWallet:
    "Buat Dompet Baru",

  generating:
    "Membuat...",

  checkingSecurity:
    "Memeriksa keamanan browser...",

  secureRandomAvailable:
    "Generator angka acak aman tersedia",

  secureRandomUnavailable:
    "Generator angka acak aman tidak tersedia",

  secureContextRequired:
    "Konteks browser yang aman atau file lokal terverifikasi diperlukan",

  cryptographicSelfTestFailed:
    "Uji mandiri kriptografi gagal. Pembuatan dompet telah dinonaktifkan.",

  offlineRecommended:
    "Penggunaan offline disarankan",

  offlineExplanation:
    "Untuk dompet yang berisi dana nyata, unduh dan verifikasi aplikasi ini sebelum memutus komputer dari internet dan membuat dompet.",

  yourWallet:
    "Dompet Anda",

  walletBackupInstruction:
    "Tuliskan frasa pemulihan Anda dan simpan di tempat yang aman.",

  neverSharePhrase:
    "Jangan pernah membagikan frasa pemulihan Anda.",

  phraseDanger:
    "Siapa pun yang memiliki frasa pemulihan dapat mengendalikan Bitcoin di dompet ini. Kami tidak akan pernah meminta Anda memasukkannya ke situs web.",

  phraseBackup:
    "Frasa pemulihan adalah cadangan untuk dompet ini.",

  hidePhrase:
    "Sembunyikan Frasa Pemulihan",

  revealPhrase:
    "Tampilkan Frasa Pemulihan",

  copyPhrase:
    "Salin Frasa Pemulihan",

  receivingAddress:
    "Alamat Penerimaan Pertama",

  receivingAddressDescription:
    "Ini adalah alamat penerimaan Bitcoin native SegWit pertama Anda.",

  copyAddress:
    "Salin Alamat",

  derivationPath:
    "Jalur derivasi",

  consistencyCheckPassed:
    "Pemeriksaan konsistensi dompet berhasil",

  consistencyCheckDescription:
    "Frasa pemulihan diturunkan kembali menggunakan pustaka yang disertakan dan cocok dengan alamat serta kunci publik diperluas yang ditampilkan.",

  advancedInformation:
    "Informasi Dompet Lanjutan",

  masterFingerprint:
    "Sidik Jari Master",

  extendedPublicKey:
    "Kunci Publik Diperluas Akun",

  derivationStandard:
    "Standar Derivasi",

  backup:
    "Cadangan",

  backupDescription:
    "Simpan frasa pemulihan dengan aman sebelum menghapus data dompet ini dari browser.",

  printBackup:
    "Cetak Cadangan",

  clearWalletData:
    "Hapus Data Dompet",

  aboutGenerator:
    "Tentang Generator Ini",

  aboutDescription:
    "Aplikasi ini membuat dompet Bitcoin deterministik menggunakan standar dompet Bitcoin yang mapan.",

  hierarchicalKeys:
    "Kunci deterministik hierarkis",

  nativeSegwit:
    "Alamat SegWit native",

  important:
    "Penting",

  auditWarning:
    "Perangkat lunak ini belum diaudit secara independen. Jangan gunakan untuk dana besar sampai implementasi, dependensi, dan dompet yang dibuat telah diverifikasi.",

  sinceBlock:
    "SEJAK BLOK",

  version:
    "VERSI",

  commit:
    "COMMIT",

  switchToLight:
    "Beralih ke mode terang",

  switchToDark:
    "Beralih ke mode gelap",

  copied:
    "Disalin",

  invalidNetwork:
    "Jaringan Bitcoin tidak valid.",

  invalidPhraseLength:
    "Panjang frasa pemulihan tidak valid.",

  unsupportedEntropy:
    "Ukuran entropi tidak didukung.",

  invalidGeneratedPhrase:
    "Frasa pemulihan yang dibuat gagal dalam validasi BIP39.",

  privateKeyFailure:
    "Tidak dapat menurunkan kunci privat.",

  addressFailure:
    "Tidak dapat membuat alamat Bitcoin.",

  verificationFailure:
    "Pemeriksaan konsistensi dompet gagal.",

  generationFailed:
    "Pembuatan dompet gagal.",

  clipboardFailed:
    "Tidak dapat menyalin secara otomatis. Silakan salin nilainya secara manual.",

  copyPhraseConfirmation:
    "Frasa pemulihan memberikan kendali penuh atas dompet ini.\n\nMenyalinnya dapat mengekspos frasa ke riwayat clipboard, pengelola clipboard, layanan sinkronisasi, atau perangkat lunak lain pada perangkat ini.\n\nJangan pernah menempelkannya ke situs web atau mengirimkannya kepada orang lain.\n\nSalin frasa pemulihan?",

  printConfirmation:
    "Sebelum mencetak frasa pemulihan:\n\n• Pastikan tidak ada orang yang dapat melihat layar Anda.\n• Gunakan printer yang Anda percayai.\n• Hindari printer jaringan atau cloud jika memungkinkan.\n• Sistem operasi atau printer dapat menyimpan pekerjaan cetak.\n• Jangan pernah mengunggah atau memotret frasa.\n• Simpan cadangan tercetak dengan aman.\n\nLanjutkan?",

  clearWalletConfirmation:
    "Hapus data dompet ini dari halaman?\n\nPastikan frasa pemulihan telah dicadangkan dengan aman.\n\nAplikasi akan menghapus referensinya dan membersihkan data yang ditampilkan, tetapi JavaScript tidak dapat menjamin penghapusan forensik dari memori browser."

});


/* =========================================================
   TRANSLATION TABLE
   ========================================================= */

const TRANSLATIONS =
  Object.freeze({

    en:
      ENGLISH,

    es:
      SPANISH,

    "zh-CN":
      CHINESE,

    "pt-BR":
      PORTUGUESE,

    de:
      GERMAN,

    fr:
      FRENCH,

    ja:
      JAPANESE,

    ar:
      ARABIC,

    hi:
      HINDI,

    id:
      INDONESIAN

  });


/*
 * Backwards-compatible aliases.
 *
 * These allow an older cached HTML file to continue working
 * during development while the visible terminology has moved
 * from "verified/destroy" to "consistency/clear".
 */
const KEY_ALIASES =
  Object.freeze({

    walletVerified:
      "consistencyCheckPassed",

    verificationDescription:
      "consistencyCheckDescription",

    destroyWallet:
      "clearWalletData",

    destroyConfirmation:
      "clearWalletConfirmation",

    secureContextRecommended:
      "secureContextRequired"

  });


/* =========================================================
   ACTIVE LANGUAGE
   ========================================================= */

let activeLanguage =
  DEFAULT_LANGUAGE;


/* =========================================================
   STORAGE
   ========================================================= */

function readSavedLanguage() {

  try {

    const savedLanguage =
      window.localStorage.getItem(
        LANGUAGE_STORAGE_KEY
      );


    return SUPPORTED_LANGUAGES[
      savedLanguage
    ]
      ? savedLanguage
      : null;

  } catch (error) {

    return null;

  }
}


function saveLanguage(
  language
) {

  try {

    window.localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      language
    );

  } catch (error) {

    /*
     * Language switching still works when localStorage
     * is unavailable or intentionally disabled.
     */

  }
}


/* =========================================================
   LANGUAGE DETECTION
   ========================================================= */

function getBrowserLanguage() {

  const browserLanguages =
    Array.isArray(
      navigator.languages
    )
      ? navigator.languages
      : [
          navigator.language
        ];


  for (
    const browserLanguage
    of browserLanguages
  ) {

    if (
      !browserLanguage
    ) {
      continue;
    }


    if (
      SUPPORTED_LANGUAGES[
        browserLanguage
      ]
    ) {

      return browserLanguage;

    }


    const normalized =
      browserLanguage.toLowerCase();


    if (
      normalized ===
        "zh-cn" ||
      normalized ===
        "zh-hans"
    ) {

      return "zh-CN";

    }


    if (
      normalized ===
        "pt-br"
    ) {

      return "pt-BR";

    }


    const baseLanguage =
      normalized.split(
        "-"
      )[0];


    if (
      SUPPORTED_LANGUAGES[
        baseLanguage
      ]
    ) {

      return baseLanguage;

    }

  }


  return DEFAULT_LANGUAGE;
}


/* =========================================================
   TRANSLATION
   ========================================================= */

function resolveTranslationKey(
  key
) {

  return (
    KEY_ALIASES[
      key
    ] ||
    key
  );
}


export function translate(
  key
) {

  const resolvedKey =
    resolveTranslationKey(
      key
    );


  const activeTranslations =
    TRANSLATIONS[
      activeLanguage
    ] ||
    ENGLISH;


  /*
   * English is the canonical fallback.
   *
   * A missing translation must never produce an empty UI
   * label or undefined message.
   */
  return (
    activeTranslations[
      resolvedKey
    ] ??
    ENGLISH[
      resolvedKey
    ] ??
    key
  );
}


/* =========================================================
   TRANSLATE DOM
   ========================================================= */

function translateElements() {

  document
    .querySelectorAll(
      "[data-i18n]"
    )
    .forEach(
      (element) => {

        const key =
          element.dataset.i18n;


        element.textContent =
          translate(
            key
          );

      }
    );


  document
    .querySelectorAll(
      "[data-i18n-aria-label]"
    )
    .forEach(
      (element) => {

        const key =
          element.dataset.i18nAriaLabel;


        element.setAttribute(
          "aria-label",
          translate(
            key
          )
        );

      }
    );


  document
    .querySelectorAll(
      "[data-i18n-title]"
    )
    .forEach(
      (element) => {

        const key =
          element.dataset.i18nTitle;


        element.setAttribute(
          "title",
          translate(
            key
          )
        );

      }
    );


  document
    .querySelectorAll(
      "[data-i18n-placeholder]"
    )
    .forEach(
      (element) => {

        const key =
          element.dataset.i18nPlaceholder;


        element.setAttribute(
          "placeholder",
          translate(
            key
          )
        );

      }
    );
}


/* =========================================================
   LANGUAGE SELECTOR UI
   ========================================================= */

function updateLanguageSelector() {

  const language =
    SUPPORTED_LANGUAGES[
      activeLanguage
    ];


  const label =
    document.getElementById(
      "languageLabel"
    );


  const options =
    document.querySelectorAll(
      ".language-option"
    );


  if (
    label
  ) {

    label.textContent =
      language.code;

  }


  options.forEach(
    (option) => {

      const isActive =
        option.dataset.language ===
        activeLanguage;


      option.classList.toggle(
        "active",
        isActive
      );


      option.setAttribute(
        "aria-checked",
        String(
          isActive
        )
      );

    }
  );
}


/* =========================================================
   SET / GET LANGUAGE
   ========================================================= */

export function setLanguage(
  language,
  persist = true
) {

  if (
    !SUPPORTED_LANGUAGES[
      language
    ]
  ) {

    console.warn(
      `Unsupported language: ${language}`
    );


    return false;
  }


  activeLanguage =
    language;


  const languageConfig =
    SUPPORTED_LANGUAGES[
      language
    ];


  document.documentElement.lang =
    language;


  document.documentElement.dir =
    languageConfig.direction;


  translateElements();

  updateLanguageSelector();


  if (
    persist
  ) {

    saveLanguage(
      language
    );

  }


  window.dispatchEvent(
    new CustomEvent(
      "language-changed",
      {

        detail: {

          language,

          direction:
            languageConfig.direction

        }

      }
    )
  );


  return true;
}


export function getLanguage() {

  return activeLanguage;
}


/* =========================================================
   LANGUAGE SELECTOR OPEN / CLOSE
   ========================================================= */

function closeLanguageSelector(
  {
    restoreFocus = false
  } = {}
) {

  const toggle =
    document.getElementById(
      "languageToggle"
    );


  const dropdown =
    document.getElementById(
      "languageDropdown"
    );


  if (
    !toggle ||
    !dropdown
  ) {

    return;
  }


  dropdown.hidden =
    true;


  toggle.setAttribute(
    "aria-expanded",
    "false"
  );


  if (
    restoreFocus
  ) {

    toggle.focus();

  }
}


function openLanguageSelector() {

  const toggle =
    document.getElementById(
      "languageToggle"
    );


  const dropdown =
    document.getElementById(
      "languageDropdown"
    );


  if (
    !toggle ||
    !dropdown
  ) {

    return;
  }


  dropdown.hidden =
    false;


  toggle.setAttribute(
    "aria-expanded",
    "true"
  );


  const activeOption =
    dropdown.querySelector(
      `[data-language="${activeLanguage}"]`
    );


  activeOption?.focus();
}


/* =========================================================
   LANGUAGE SELECTOR KEYBOARD NAVIGATION
   ========================================================= */

function moveLanguageFocus(
  currentOption,
  direction
) {

  const options =
    Array.from(
      document.querySelectorAll(
        ".language-option"
      )
    );


  const currentIndex =
    options.indexOf(
      currentOption
    );


  if (
    currentIndex < 0 ||
    options.length === 0
  ) {

    return;
  }


  const nextIndex =
    (
      currentIndex +
      direction +
      options.length
    ) %
    options.length;


  options[
    nextIndex
  ].focus();
}


/* =========================================================
   BIND LANGUAGE SELECTOR
   ========================================================= */

function bindLanguageSelector() {

  const toggle =
    document.getElementById(
      "languageToggle"
    );


  const dropdown =
    document.getElementById(
      "languageDropdown"
    );


  const options =
    Array.from(
      document.querySelectorAll(
        ".language-option"
      )
    );


  if (
    !toggle ||
    !dropdown
  ) {

    return;
  }


  toggle.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();


      if (
        dropdown.hidden
      ) {

        openLanguageSelector();

      } else {

        closeLanguageSelector();

      }

    }
  );


  toggle.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key !==
        "ArrowDown"
      ) {

        return;
      }


      event.preventDefault();

      openLanguageSelector();

    }
  );


  options.forEach(
    (option) => {

      option.addEventListener(
        "click",
        () => {

          if (
            setLanguage(
              option.dataset.language
            )
          ) {

            closeLanguageSelector({
              restoreFocus: true
            });

          }

        }
      );


      option.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key ===
            "ArrowDown"
          ) {

            event.preventDefault();

            moveLanguageFocus(
              option,
              1
            );

          } else if (
            event.key ===
            "ArrowUp"
          ) {

            event.preventDefault();

            moveLanguageFocus(
              option,
              -1
            );

          } else if (
            event.key ===
            "Home"
          ) {

            event.preventDefault();

            options[
              0
            ]?.focus();

          } else if (
            event.key ===
            "End"
          ) {

            event.preventDefault();

            options[
              options.length - 1
            ]?.focus();

          } else if (
            event.key ===
              "Enter" ||
            event.key ===
              " "
          ) {

            event.preventDefault();

            option.click();

          }

        }
      );

    }
  );


  document.addEventListener(
    "click",
    (event) => {

      if (
        event.target instanceof Element &&
        !event.target.closest(
          ".language-selector"
        )
      ) {

        closeLanguageSelector();

      }

    }
  );


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key ===
          "Escape" &&
        !dropdown.hidden
      ) {

        closeLanguageSelector({
          restoreFocus: true
        });

      }

    }
  );
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

export function initializeLanguage() {

  const savedLanguage =
    readSavedLanguage();


  const initialLanguage =
    savedLanguage ||
    getBrowserLanguage() ||
    DEFAULT_LANGUAGE;


  /*
   * Bind once before calling setLanguage().
   */
  bindLanguageSelector();


  setLanguage(
    initialLanguage,
    false
  );


  return initialLanguage;
}