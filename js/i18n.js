"use strict";

const LANGUAGE_STORAGE_KEY = "bitcoin-wallet-language";
const DEFAULT_LANGUAGE = "en";

export const SUPPORTED_LANGUAGES = Object.freeze({
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

const TRANSLATIONS = Object.freeze({
  en: {
    language: "Language",
    languageMenu: "Select language",
    download: "Download",
    online: "ONLINE",

    networkTitle: "Network for derivation and checks",
    network: "Network",
    bitcoin: "Bitcoin",
    mainnet: "Bitcoin Mainnet",
    testnet: "Bitcoin Testnet",
    signet: "Bitcoin Signet",
    regtest: "Bitcoin Regtest",

    networkNote:
      "This page never connects to any network — the choice sets the address formats, key versions, and checks the tools run with. A tool's own advanced fields can still override it.",

    createWallet: "Create a New Wallet",
    localGeneration:
      "Your wallet is generated locally. No private keys or recovery phrases are sent to a server.",

    recoveryPhrase: "Recovery Phrase",
    twelveWords: "12 words",
    twentyFourWords: "24 words",
    generateWallet: "Generate New Wallet",
    generating: "Generating...",

    checkingSecurity: "Checking browser security...",
    secureRandomAvailable:
      "Secure random number generator available",
    secureRandomUnavailable:
      "Secure random number generation unavailable",
    secureContextRecommended:
      "HTTPS or localhost recommended",

    offlineRecommended: "Offline use recommended",
    offlineExplanation:
      "For wallets containing real funds, download and verify this application before disconnecting the computer from the internet and generating your wallet.",

    yourWallet: "Your Wallet",
    walletBackupInstruction:
      "Write down your recovery phrase and store it somewhere secure.",

    neverSharePhrase:
      "Never share your recovery phrase.",
    phraseDanger:
      "Anyone who has your recovery phrase can control the Bitcoin in this wallet. We will never ask you to enter it into a website.",

    phraseBackup:
      "Your recovery phrase is the backup for this wallet.",

    hidePhrase: "Hide Recovery Phrase",
    revealPhrase: "Reveal Recovery Phrase",
    copyPhrase: "Copy Recovery Phrase",

    receivingAddress: "First Receiving Address",
    receivingAddressDescription:
      "This is your first native SegWit Bitcoin receiving address.",
    copyAddress: "Copy Address",
    derivationPath: "Derivation path",

    walletVerified: "Wallet verified",
    verificationDescription:
      "The generated recovery phrase was used to independently derive this wallet's address.",

    advancedInformation: "Advanced Wallet Information",
    masterFingerprint: "Master Fingerprint",
    extendedPublicKey: "Account Extended Public Key",
    derivationStandard: "Derivation Standard",

    backup: "Backup",
    backupDescription:
      "Store your recovery phrase securely before destroying this wallet from the browser.",
    printBackup: "Print Backup",
    destroyWallet: "Destroy Wallet",

    aboutGenerator: "About This Generator",
    aboutDescription:
      "This application generates a deterministic Bitcoin wallet using established Bitcoin wallet standards.",

    hierarchicalKeys: "Hierarchical deterministic keys",
    nativeSegwit: "Native SegWit addresses",

    important: "Important",
    auditWarning:
      "This software has not been independently audited. Do not use it with significant funds until the implementation, dependencies, and generated wallets have been thoroughly verified.",

    sinceBlock: "SINCE BLOCK",
    version: "VERSION",
    commit: "COMMIT",

    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",

    copied: "Copied",

    invalidNetwork: "Invalid Bitcoin network.",
    invalidPhraseLength: "Invalid recovery phrase length.",
    unsupportedEntropy: "Unsupported entropy size.",
    invalidGeneratedPhrase:
      "Generated recovery phrase failed BIP39 validation.",
    privateKeyFailure: "Unable to derive private key.",
    addressFailure: "Unable to generate Bitcoin address.",
    verificationFailure:
      "Wallet integrity verification failed.",

    generationFailed: "Wallet generation failed.",
    clipboardFailed:
      "Unable to copy automatically. Please copy the value manually.",

    copyPhraseConfirmation:
      "Your recovery phrase gives complete control of this wallet.\n\nDo not paste it into a website or send it to another person.\n\nCopy the recovery phrase?",

    printConfirmation:
      "Before printing your recovery phrase:\n\n• Make sure nobody can see your screen.\n• Use a printer you trust.\n• Never upload or photograph the phrase.\n• Store the printed backup securely.\n\nContinue?",

    destroyConfirmation:
      "Destroy this wallet from the page?\n\nMake absolutely certain that you have securely backed up the recovery phrase first."
  },

  es: {
    language: "Idioma",
    languageMenu: "Seleccionar idioma",
    download: "Descargar",
    online: "EN LÍNEA",

    networkTitle: "Red para derivación y verificaciones",
    network: "Red",
    bitcoin: "Bitcoin",
    mainnet: "Red principal de Bitcoin",
    testnet: "Red de pruebas de Bitcoin",
    signet: "Bitcoin Signet",
    regtest: "Bitcoin Regtest",

    networkNote:
      "Esta página nunca se conecta a ninguna red. La selección determina los formatos de dirección, las versiones de claves y las verificaciones.",

    createWallet: "Crear una nueva cartera",
    localGeneration:
      "Tu cartera se genera localmente. Ninguna clave privada ni frase de recuperación se envía a un servidor.",

    recoveryPhrase: "Frase de recuperación",
    twelveWords: "12 palabras",
    twentyFourWords: "24 palabras",
    generateWallet: "Generar una nueva cartera",
    generating: "Generando...",

    checkingSecurity: "Comprobando la seguridad del navegador...",
    secureRandomAvailable:
      "Generador seguro de números aleatorios disponible",
    secureRandomUnavailable:
      "El generador seguro de números aleatorios no está disponible",
    secureContextRecommended:
      "Se recomienda HTTPS o localhost",

    offlineRecommended: "Se recomienda usar sin conexión",
    offlineExplanation:
      "Para carteras con fondos reales, descarga y verifica esta aplicación antes de desconectar el equipo de Internet y generar tu cartera.",

    yourWallet: "Tu cartera",
    walletBackupInstruction:
      "Anota tu frase de recuperación y guárdala en un lugar seguro.",

    neverSharePhrase:
      "Nunca compartas tu frase de recuperación.",
    phraseDanger:
      "Cualquier persona que tenga tu frase de recuperación puede controlar el Bitcoin de esta cartera. Nunca te pediremos que la introduzcas en un sitio web.",

    phraseBackup:
      "Tu frase de recuperación es la copia de seguridad de esta cartera.",

    hidePhrase: "Ocultar frase de recuperación",
    revealPhrase: "Mostrar frase de recuperación",
    copyPhrase: "Copiar frase de recuperación",

    receivingAddress: "Primera dirección de recepción",
    receivingAddressDescription:
      "Esta es tu primera dirección nativa SegWit de recepción de Bitcoin.",
    copyAddress: "Copiar dirección",
    derivationPath: "Ruta de derivación",

    walletVerified: "Cartera verificada",
    verificationDescription:
      "La frase de recuperación generada se utilizó para derivar independientemente la dirección de esta cartera.",

    advancedInformation: "Información avanzada de la cartera",
    masterFingerprint: "Huella maestra",
    extendedPublicKey: "Clave pública extendida de la cuenta",
    derivationStandard: "Estándar de derivación",

    backup: "Copia de seguridad",
    backupDescription:
      "Guarda tu frase de recuperación de forma segura antes de destruir esta cartera en el navegador.",
    printBackup: "Imprimir copia de seguridad",
    destroyWallet: "Destruir cartera",

    aboutGenerator: "Acerca de este generador",
    aboutDescription:
      "Esta aplicación genera una cartera determinista de Bitcoin utilizando estándares establecidos.",

    hierarchicalKeys: "Claves deterministas jerárquicas",
    nativeSegwit: "Direcciones SegWit nativas",

    important: "Importante",
    auditWarning:
      "Este software no ha sido auditado de forma independiente. No lo uses con fondos importantes hasta verificar completamente la implementación, las dependencias y las carteras generadas.",

    sinceBlock: "DESDE EL BLOQUE",
    version: "VERSIÓN",
    commit: "COMMIT",

    switchToLight: "Cambiar al modo claro",
    switchToDark: "Cambiar al modo oscuro",
    copied: "Copiado",

    invalidNetwork: "Red de Bitcoin no válida.",
    invalidPhraseLength:
      "Longitud de frase de recuperación no válida.",
    unsupportedEntropy: "Tamaño de entropía no compatible.",
    invalidGeneratedPhrase:
      "La frase generada no superó la validación BIP39.",
    privateKeyFailure: "No se pudo derivar la clave privada.",
    addressFailure:
      "No se pudo generar la dirección de Bitcoin.",
    verificationFailure:
      "Falló la verificación de integridad de la cartera.",

    generationFailed: "No se pudo generar la cartera.",
    clipboardFailed:
      "No se pudo copiar automáticamente. Copia el valor manualmente.",

    copyPhraseConfirmation:
      "Tu frase de recuperación da control total sobre esta cartera.\n\nNo la pegues en un sitio web ni se la envíes a otra persona.\n\n¿Copiar la frase de recuperación?",

    printConfirmation:
      "Antes de imprimir tu frase de recuperación:\n\n• Asegúrate de que nadie pueda ver tu pantalla.\n• Utiliza una impresora de confianza.\n• Nunca subas ni fotografíes la frase.\n• Guarda la copia impresa de forma segura.\n\n¿Continuar?",

    destroyConfirmation:
      "¿Destruir esta cartera de la página?\n\nAsegúrate completamente de haber guardado la frase de recuperación."
  },

  "zh-CN": {
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
      "此页面不会连接任何网络。所选网络仅决定地址格式、密钥版本和工具执行的检查。",

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
    secureContextRecommended: "建议使用 HTTPS 或 localhost",

    offlineRecommended: "建议离线使用",
    offlineExplanation:
      "如果钱包将存放真实资金，请先下载并验证此应用，然后断开互联网连接再生成钱包。",

    yourWallet: "您的钱包",
    walletBackupInstruction:
      "请抄写助记词并将其存放在安全的位置。",

    neverSharePhrase: "切勿分享您的助记词。",
    phraseDanger:
      "任何获得助记词的人都可以控制此钱包中的比特币。我们绝不会要求您在网站中输入助记词。",

    phraseBackup: "助记词是此钱包的备份。",

    hidePhrase: "隐藏助记词",
    revealPhrase: "显示助记词",
    copyPhrase: "复制助记词",

    receivingAddress: "第一个接收地址",
    receivingAddressDescription:
      "这是您的第一个原生 SegWit 比特币接收地址。",
    copyAddress: "复制地址",
    derivationPath: "派生路径",

    walletVerified: "钱包已验证",
    verificationDescription:
      "已使用生成的助记词独立派生并验证此钱包地址。",

    advancedInformation: "高级钱包信息",
    masterFingerprint: "主密钥指纹",
    extendedPublicKey: "账户扩展公钥",
    derivationStandard: "派生标准",

    backup: "备份",
    backupDescription:
      "从浏览器销毁此钱包之前，请安全保存助记词。",
    printBackup: "打印备份",
    destroyWallet: "销毁钱包",

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
    verificationFailure: "钱包完整性验证失败。",

    generationFailed: "钱包生成失败。",
    clipboardFailed: "无法自动复制，请手动复制。",

    copyPhraseConfirmation:
      "助记词可以完全控制此钱包。\n\n请勿将其粘贴到网站或发送给他人。\n\n是否复制助记词？",

    printConfirmation:
      "打印助记词之前：\n\n• 确保无人能看到屏幕。\n• 使用可信的打印机。\n• 切勿上传或拍摄助记词。\n• 安全保存打印的备份。\n\n是否继续？",

    destroyConfirmation:
      "是否从页面销毁此钱包？\n\n请务必确认已安全备份助记词。"
  },

  "pt-BR": {
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
      "Esta página nunca se conecta a nenhuma rede. A seleção define os formatos de endereço, as versões das chaves e as verificações.",

    createWallet: "Criar uma nova carteira",
    localGeneration:
      "Sua carteira é gerada localmente. Nenhuma chave privada ou frase de recuperação é enviada a um servidor.",

    recoveryPhrase: "Frase de recuperação",
    twelveWords: "12 palavras",
    twentyFourWords: "24 palavras",
    generateWallet: "Gerar nova carteira",
    generating: "Gerando...",

    checkingSecurity: "Verificando a segurança do navegador...",
    secureRandomAvailable:
      "Gerador seguro de números aleatórios disponível",
    secureRandomUnavailable:
      "Gerador seguro de números aleatórios indisponível",
    secureContextRecommended:
      "HTTPS ou localhost recomendado",

    offlineRecommended: "Uso offline recomendado",
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

    hidePhrase: "Ocultar frase de recuperação",
    revealPhrase: "Mostrar frase de recuperação",
    copyPhrase: "Copiar frase de recuperação",

    receivingAddress: "Primeiro endereço de recebimento",
    receivingAddressDescription:
      "Este é seu primeiro endereço nativo SegWit para receber Bitcoin.",
    copyAddress: "Copiar endereço",
    derivationPath: "Caminho de derivação",

    walletVerified: "Carteira verificada",
    verificationDescription:
      "A frase de recuperação gerada foi usada para derivar independentemente o endereço desta carteira.",

    advancedInformation: "Informações avançadas da carteira",
    masterFingerprint: "Impressão digital mestra",
    extendedPublicKey: "Chave pública estendida da conta",
    derivationStandard: "Padrão de derivação",

    backup: "Backup",
    backupDescription:
      "Guarde sua frase de recuperação com segurança antes de destruir esta carteira no navegador.",
    printBackup: "Imprimir backup",
    destroyWallet: "Destruir carteira",

    aboutGenerator: "Sobre este gerador",
    aboutDescription:
      "Este aplicativo gera uma carteira determinística de Bitcoin usando padrões estabelecidos.",

    hierarchicalKeys: "Chaves determinísticas hierárquicas",
    nativeSegwit: "Endereços SegWit nativos",

    important: "Importante",
    auditWarning:
      "Este software não foi auditado de forma independente. Não o utilize com valores significativos até que a implementação, as dependências e as carteiras geradas tenham sido verificadas.",

    sinceBlock: "DESDE O BLOCO",
    version: "VERSÃO",
    commit: "COMMIT",

    switchToLight: "Mudar para o modo claro",
    switchToDark: "Mudar para o modo escuro",
    copied: "Copiado"
  },

  de: {
    language: "Sprache",
    languageMenu: "Sprache auswählen",
    download: "Herunterladen",
    online: "ONLINE",

    networkTitle: "Netzwerk für Ableitung und Prüfungen",
    network: "Netzwerk",
    bitcoin: "Bitcoin",
    mainnet: "Bitcoin Mainnet",
    testnet: "Bitcoin Testnet",
    signet: "Bitcoin Signet",
    regtest: "Bitcoin Regtest",

    networkNote:
      "Diese Seite stellt niemals eine Verbindung zu einem Netzwerk her. Die Auswahl legt Adressformate, Schlüsselversionen und Prüfungen fest.",

    createWallet: "Neue Wallet erstellen",
    localGeneration:
      "Ihre Wallet wird lokal erzeugt. Private Schlüssel und Wiederherstellungsphrasen werden nicht an einen Server gesendet.",

    recoveryPhrase: "Wiederherstellungsphrase",
    twelveWords: "12 Wörter",
    twentyFourWords: "24 Wörter",
    generateWallet: "Neue Wallet erzeugen",
    generating: "Wird erzeugt...",

    checkingSecurity: "Browsersicherheit wird geprüft...",
    secureRandomAvailable:
      "Sicherer Zufallszahlengenerator verfügbar",
    secureRandomUnavailable:
      "Sicherer Zufallszahlengenerator nicht verfügbar",
    secureContextRecommended:
      "HTTPS oder localhost empfohlen",

    offlineRecommended: "Offline-Nutzung empfohlen",
    offlineExplanation:
      "Für Wallets mit echten Guthaben sollten Sie diese Anwendung herunterladen und überprüfen, bevor Sie den Computer vom Internet trennen und die Wallet erzeugen.",

    yourWallet: "Ihre Wallet",
    walletBackupInstruction:
      "Notieren Sie Ihre Wiederherstellungsphrase und bewahren Sie sie sicher auf.",

    neverSharePhrase:
      "Geben Sie Ihre Wiederherstellungsphrase niemals weiter.",
    phraseDanger:
      "Jeder mit Ihrer Wiederherstellungsphrase kann die Bitcoin in dieser Wallet kontrollieren. Wir werden Sie niemals auffordern, sie auf einer Website einzugeben.",

    phraseBackup:
      "Ihre Wiederherstellungsphrase ist die Sicherung dieser Wallet.",

    hidePhrase: "Wiederherstellungsphrase verbergen",
    revealPhrase: "Wiederherstellungsphrase anzeigen",
    copyPhrase: "Wiederherstellungsphrase kopieren",

    receivingAddress: "Erste Empfangsadresse",
    receivingAddressDescription:
      "Dies ist Ihre erste native SegWit-Bitcoin-Empfangsadresse.",
    copyAddress: "Adresse kopieren",
    derivationPath: "Ableitungspfad",

    walletVerified: "Wallet verifiziert",
    verificationDescription:
      "Die erzeugte Wiederherstellungsphrase wurde zur unabhängigen Ableitung der Wallet-Adresse verwendet.",

    advancedInformation: "Erweiterte Wallet-Informationen",
    masterFingerprint: "Master-Fingerabdruck",
    extendedPublicKey: "Erweiterter öffentlicher Kontoschlüssel",
    derivationStandard: "Ableitungsstandard",

    backup: "Sicherung",
    backupDescription:
      "Bewahren Sie Ihre Wiederherstellungsphrase sicher auf, bevor Sie diese Wallet im Browser zerstören.",
    printBackup: "Sicherung drucken",
    destroyWallet: "Wallet zerstören",

    aboutGenerator: "Über diesen Generator",
    aboutDescription:
      "Diese Anwendung erzeugt eine deterministische Bitcoin-Wallet nach etablierten Bitcoin-Wallet-Standards.",

    hierarchicalKeys: "Hierarchisch-deterministische Schlüssel",
    nativeSegwit: "Native SegWit-Adressen",

    important: "Wichtig",
    auditWarning:
      "Diese Software wurde nicht unabhängig geprüft. Verwenden Sie sie nicht für bedeutende Beträge, bevor Implementierung, Abhängigkeiten und erzeugte Wallets vollständig verifiziert wurden.",

    sinceBlock: "SEIT BLOCK",
    version: "VERSION",
    commit: "COMMIT",

    switchToLight: "Zum hellen Modus wechseln",
    switchToDark: "Zum dunklen Modus wechseln",
    copied: "Kopiert"
  },

  fr: {
    language: "Langue",
    languageMenu: "Choisir la langue",
    download: "Télécharger",
    online: "EN LIGNE",

    networkTitle: "Réseau pour la dérivation et les vérifications",
    network: "Réseau",
    bitcoin: "Bitcoin",
    mainnet: "Réseau principal Bitcoin",
    testnet: "Réseau de test Bitcoin",
    signet: "Bitcoin Signet",
    regtest: "Bitcoin Regtest",

    networkNote:
      "Cette page ne se connecte jamais à un réseau. Le choix détermine les formats d'adresse, les versions de clés et les vérifications.",

    createWallet: "Créer un nouveau portefeuille",
    localGeneration:
      "Votre portefeuille est généré localement. Aucune clé privée ni phrase de récupération n'est envoyée à un serveur.",

    recoveryPhrase: "Phrase de récupération",
    twelveWords: "12 mots",
    twentyFourWords: "24 mots",
    generateWallet: "Générer un nouveau portefeuille",
    generating: "Génération...",

    checkingSecurity: "Vérification de la sécurité du navigateur...",
    secureRandomAvailable:
      "Générateur aléatoire sécurisé disponible",
    secureRandomUnavailable:
      "Générateur aléatoire sécurisé indisponible",
    secureContextRecommended:
      "HTTPS ou localhost recommandé",

    offlineRecommended: "Utilisation hors ligne recommandée",
    offlineExplanation:
      "Pour un portefeuille contenant des fonds réels, téléchargez et vérifiez cette application avant de déconnecter l'ordinateur d'Internet.",

    yourWallet: "Votre portefeuille",
    walletBackupInstruction:
      "Notez votre phrase de récupération et conservez-la dans un endroit sûr.",

    neverSharePhrase:
      "Ne partagez jamais votre phrase de récupération.",
    phraseDanger:
      "Toute personne possédant votre phrase de récupération peut contrôler les bitcoins de ce portefeuille. Nous ne vous demanderons jamais de la saisir sur un site web.",

    phraseBackup:
      "Votre phrase de récupération constitue la sauvegarde de ce portefeuille.",

    hidePhrase: "Masquer la phrase de récupération",
    revealPhrase: "Afficher la phrase de récupération",
    copyPhrase: "Copier la phrase de récupération",

    receivingAddress: "Première adresse de réception",
    receivingAddressDescription:
      "Il s'agit de votre première adresse de réception Bitcoin SegWit native.",
    copyAddress: "Copier l'adresse",
    derivationPath: "Chemin de dérivation",

    walletVerified: "Portefeuille vérifié",
    verificationDescription:
      "La phrase de récupération générée a été utilisée pour dériver indépendamment l'adresse de ce portefeuille.",

    advancedInformation: "Informations avancées du portefeuille",
    masterFingerprint: "Empreinte principale",
    extendedPublicKey: "Clé publique étendue du compte",
    derivationStandard: "Norme de dérivation",

    backup: "Sauvegarde",
    backupDescription:
      "Conservez votre phrase de récupération en sécurité avant de détruire ce portefeuille dans le navigateur.",
    printBackup: "Imprimer la sauvegarde",
    destroyWallet: "Détruire le portefeuille",

    aboutGenerator: "À propos de ce générateur",
    aboutDescription:
      "Cette application génère un portefeuille Bitcoin déterministe selon les normes établies.",

    hierarchicalKeys: "Clés déterministes hiérarchiques",
    nativeSegwit: "Adresses SegWit natives",

    important: "Important",
    auditWarning:
      "Ce logiciel n'a pas été audité de manière indépendante. Ne l'utilisez pas avec des fonds importants avant d'avoir entièrement vérifié son implémentation, ses dépendances et les portefeuilles générés.",

    sinceBlock: "DEPUIS LE BLOC",
    version: "VERSION",
    commit: "COMMIT",

    switchToLight: "Passer au mode clair",
    switchToDark: "Passer au mode sombre",
    copied: "Copié"
  },

  ja: {
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
      "このページがネットワークへ接続することはありません。選択したネットワークは、アドレス形式、鍵のバージョン、検証方法のみを設定します。",

    createWallet: "新しいウォレットを作成",
    localGeneration:
      "ウォレットは端末内で生成されます。秘密鍵やリカバリーフレーズがサーバーへ送信されることはありません。",

    recoveryPhrase: "リカバリーフレーズ",
    twelveWords: "12単語",
    twentyFourWords: "24単語",
    generateWallet: "新しいウォレットを生成",
    generating: "生成中...",

    checkingSecurity: "ブラウザの安全性を確認中...",
    secureRandomAvailable: "安全な乱数生成機能が利用できます",
    secureRandomUnavailable: "安全な乱数生成機能が利用できません",
    secureContextRecommended:
      "HTTPS または localhost を推奨します",

    offlineRecommended: "オフラインでの使用を推奨",
    offlineExplanation:
      "実際の資金を保管する場合は、このアプリをダウンロードして検証し、インターネットから切断してからウォレットを生成してください。",

    yourWallet: "あなたのウォレット",
    walletBackupInstruction:
      "リカバリーフレーズを書き留め、安全な場所に保管してください。",

    neverSharePhrase:
      "リカバリーフレーズを他人と共有しないでください。",
    phraseDanger:
      "リカバリーフレーズを知る人は、このウォレットのビットコインを管理できます。ウェブサイトへの入力を求めることはありません。",

    phraseBackup:
      "リカバリーフレーズはこのウォレットのバックアップです。",

    hidePhrase: "リカバリーフレーズを隠す",
    revealPhrase: "リカバリーフレーズを表示",
    copyPhrase: "リカバリーフレーズをコピー",

    receivingAddress: "最初の受取アドレス",
    receivingAddressDescription:
      "これは最初のネイティブ SegWit ビットコイン受取アドレスです。",
    copyAddress: "アドレスをコピー",
    derivationPath: "導出パス",

    walletVerified: "ウォレット検証済み",
    verificationDescription:
      "生成されたリカバリーフレーズからウォレットアドレスを独立して導出し、検証しました。",

    advancedInformation: "ウォレットの詳細情報",
    masterFingerprint: "マスターフィンガープリント",
    extendedPublicKey: "アカウント拡張公開鍵",
    derivationStandard: "導出規格",

    backup: "バックアップ",
    backupDescription:
      "ブラウザからウォレットを破棄する前に、リカバリーフレーズを安全に保管してください。",
    printBackup: "バックアップを印刷",
    destroyWallet: "ウォレットを破棄",

    aboutGenerator: "このジェネレーターについて",
    aboutDescription:
      "このアプリは確立されたビットコインウォレット規格を使用して、決定論的ウォレットを生成します。",

    hierarchicalKeys: "階層的決定性鍵",
    nativeSegwit: "ネイティブ SegWit アドレス",

    important: "重要",
    auditWarning:
      "このソフトウェアは独立監査を受けていません。実装、依存関係、生成されたウォレットを十分に検証するまで、多額の資金には使用しないでください。",

    sinceBlock: "開始ブロック",
    version: "バージョン",
    commit: "コミット",

    switchToLight: "ライトモードに切り替える",
    switchToDark: "ダークモードに切り替える",
    copied: "コピーしました"
  },

  ar: {
    language: "اللغة",
    languageMenu: "اختر اللغة",
    download: "تنزيل",
    online: "متصل",

    networkTitle: "شبكة الاشتقاق والتحقق",
    network: "الشبكة",
    bitcoin: "بيتكوين",
    mainnet: "شبكة بيتكوين الرئيسية",
    testnet: "شبكة بيتكوين التجريبية",
    signet: "شبكة Signet",
    regtest: "شبكة Regtest",

    networkNote:
      "لا تتصل هذه الصفحة بأي شبكة. يحدد الاختيار تنسيقات العناوين وإصدارات المفاتيح وعمليات التحقق فقط.",

    createWallet: "إنشاء محفظة جديدة",
    localGeneration:
      "يتم إنشاء محفظتك محليًا. لا تُرسل المفاتيح الخاصة أو عبارة الاسترداد إلى أي خادم.",

    recoveryPhrase: "عبارة الاسترداد",
    twelveWords: "12 كلمة",
    twentyFourWords: "24 كلمة",
    generateWallet: "إنشاء محفظة جديدة",
    generating: "جارٍ الإنشاء...",

    checkingSecurity: "جارٍ فحص أمان المتصفح...",
    secureRandomAvailable: "مولد الأرقام العشوائية الآمن متاح",
    secureRandomUnavailable:
      "مولد الأرقام العشوائية الآمن غير متاح",
    secureContextRecommended:
      "يُنصح باستخدام HTTPS أو localhost",

    offlineRecommended: "يُنصح بالاستخدام دون اتصال",
    offlineExplanation:
      "للمحافظ التي تحتوي على أموال حقيقية، نزّل هذا التطبيق وتحقق منه ثم افصل الكمبيوتر عن الإنترنت قبل إنشاء المحفظة.",

    yourWallet: "محفظتك",
    walletBackupInstruction:
      "اكتب عبارة الاسترداد واحفظها في مكان آمن.",

    neverSharePhrase: "لا تشارك عبارة الاسترداد مطلقًا.",
    phraseDanger:
      "يمكن لأي شخص يملك عبارة الاسترداد التحكم في البيتكوين الموجود في هذه المحفظة. لن نطلب منك إدخالها في موقع ويب.",

    phraseBackup:
      "عبارة الاسترداد هي النسخة الاحتياطية لهذه المحفظة.",

    hidePhrase: "إخفاء عبارة الاسترداد",
    revealPhrase: "إظهار عبارة الاسترداد",
    copyPhrase: "نسخ عبارة الاسترداد",

    receivingAddress: "عنوان الاستلام الأول",
    receivingAddressDescription:
      "هذا هو عنوان استلام بيتكوين SegWit الأصلي الأول.",
    copyAddress: "نسخ العنوان",
    derivationPath: "مسار الاشتقاق",

    walletVerified: "تم التحقق من المحفظة",
    verificationDescription:
      "استُخدمت عبارة الاسترداد لإنشاء عنوان المحفظة والتحقق منه بشكل مستقل.",

    advancedInformation: "معلومات المحفظة المتقدمة",
    masterFingerprint: "البصمة الرئيسية",
    extendedPublicKey: "المفتاح العام الموسع للحساب",
    derivationStandard: "معيار الاشتقاق",

    backup: "النسخة الاحتياطية",
    backupDescription:
      "احفظ عبارة الاسترداد بأمان قبل إزالة هذه المحفظة من المتصفح.",
    printBackup: "طباعة النسخة الاحتياطية",
    destroyWallet: "إزالة المحفظة",

    aboutGenerator: "حول هذا المولد",
    aboutDescription:
      "ينشئ هذا التطبيق محفظة بيتكوين حتمية باستخدام معايير محافظ بيتكوين المعتمدة.",

    hierarchicalKeys: "مفاتيح حتمية هرمية",
    nativeSegwit: "عناوين SegWit أصلية",

    important: "مهم",
    auditWarning:
      "لم يخضع هذا البرنامج لتدقيق مستقل. لا تستخدمه مع مبالغ كبيرة قبل التحقق الكامل من التنفيذ والتبعيات والمحافظ الناتجة.",

    sinceBlock: "منذ الكتلة",
    version: "الإصدار",
    commit: "الالتزام",

    switchToLight: "التبديل إلى الوضع الفاتح",
    switchToDark: "التبديل إلى الوضع الداكن",
    copied: "تم النسخ"
  },

  hi: {
    language: "भाषा",
    languageMenu: "भाषा चुनें",
    download: "डाउनलोड",
    online: "ऑनलाइन",

    networkTitle: "डेरिवेशन और जाँच के लिए नेटवर्क",
    network: "नेटवर्क",
    bitcoin: "बिटकॉइन",
    mainnet: "बिटकॉइन मेननेट",
    testnet: "बिटकॉइन टेस्टनेट",
    signet: "बिटकॉइन Signet",
    regtest: "बिटकॉइन Regtest",

    networkNote:
      "यह पृष्ठ किसी नेटवर्क से कनेक्ट नहीं होता। चयन केवल एड्रेस प्रारूप, कुंजी संस्करण और जाँच निर्धारित करता है।",

    createWallet: "नया वॉलेट बनाएँ",
    localGeneration:
      "आपका वॉलेट स्थानीय रूप से बनाया जाता है। निजी कुंजी या रिकवरी वाक्यांश किसी सर्वर को नहीं भेजे जाते।",

    recoveryPhrase: "रिकवरी वाक्यांश",
    twelveWords: "12 शब्द",
    twentyFourWords: "24 शब्द",
    generateWallet: "नया वॉलेट बनाएँ",
    generating: "बनाया जा रहा है...",

    checkingSecurity: "ब्राउज़र सुरक्षा की जाँच हो रही है...",
    secureRandomAvailable:
      "सुरक्षित रैंडम नंबर जनरेटर उपलब्ध है",
    secureRandomUnavailable:
      "सुरक्षित रैंडम नंबर जनरेटर उपलब्ध नहीं है",
    secureContextRecommended:
      "HTTPS या localhost का उपयोग करें",

    offlineRecommended: "ऑफलाइन उपयोग की सलाह",
    offlineExplanation:
      "वास्तविक धन वाले वॉलेट के लिए, इंटरनेट से डिस्कनेक्ट करने और वॉलेट बनाने से पहले इस ऐप को डाउनलोड और सत्यापित करें।",

    yourWallet: "आपका वॉलेट",
    walletBackupInstruction:
      "अपना रिकवरी वाक्यांश लिखें और सुरक्षित स्थान पर रखें।",

    neverSharePhrase:
      "अपना रिकवरी वाक्यांश कभी साझा न करें।",
    phraseDanger:
      "रिकवरी वाक्यांश रखने वाला कोई भी व्यक्ति इस वॉलेट के बिटकॉइन को नियंत्रित कर सकता है। हम इसे किसी वेबसाइट पर दर्ज करने के लिए कभी नहीं कहेंगे।",

    phraseBackup:
      "रिकवरी वाक्यांश इस वॉलेट का बैकअप है।",

    hidePhrase: "रिकवरी वाक्यांश छिपाएँ",
    revealPhrase: "रिकवरी वाक्यांश दिखाएँ",
    copyPhrase: "रिकवरी वाक्यांश कॉपी करें",

    receivingAddress: "पहला प्राप्ति पता",
    receivingAddressDescription:
      "यह आपका पहला नेटिव SegWit बिटकॉइन प्राप्ति पता है।",
    copyAddress: "पता कॉपी करें",
    derivationPath: "डेरिवेशन पथ",

    walletVerified: "वॉलेट सत्यापित",
    verificationDescription:
      "बनाए गए रिकवरी वाक्यांश से वॉलेट का पता स्वतंत्र रूप से प्राप्त और सत्यापित किया गया।",

    advancedInformation: "उन्नत वॉलेट जानकारी",
    masterFingerprint: "मास्टर फिंगरप्रिंट",
    extendedPublicKey: "खाता विस्तारित सार्वजनिक कुंजी",
    derivationStandard: "डेरिवेशन मानक",

    backup: "बैकअप",
    backupDescription:
      "ब्राउज़र से वॉलेट हटाने से पहले रिकवरी वाक्यांश सुरक्षित रखें।",
    printBackup: "बैकअप प्रिंट करें",
    destroyWallet: "वॉलेट हटाएँ",

    aboutGenerator: "इस जनरेटर के बारे में",
    aboutDescription:
      "यह ऐप स्थापित बिटकॉइन वॉलेट मानकों से एक नियतात्मक बिटकॉइन वॉलेट बनाता है।",

    hierarchicalKeys: "पदानुक्रमित नियतात्मक कुंजियाँ",
    nativeSegwit: "नेटिव SegWit पते",

    important: "महत्वपूर्ण",
    auditWarning:
      "इस सॉफ़्टवेयर का स्वतंत्र ऑडिट नहीं हुआ है। कार्यान्वयन, निर्भरताओं और बनाए गए वॉलेट की पूरी जाँच से पहले इसे बड़ी राशि के लिए उपयोग न करें।",

    sinceBlock: "ब्लॉक से",
    version: "संस्करण",
    commit: "कमिट",

    switchToLight: "लाइट मोड पर जाएँ",
    switchToDark: "डार्क मोड पर जाएँ",
    copied: "कॉपी किया गया"
  },

  id: {
    language: "Bahasa",
    languageMenu: "Pilih bahasa",
    download: "Unduh",
    online: "ONLINE",

    networkTitle: "Jaringan untuk derivasi dan pemeriksaan",
    network: "Jaringan",
    bitcoin: "Bitcoin",
    mainnet: "Bitcoin Mainnet",
    testnet: "Bitcoin Testnet",
    signet: "Bitcoin Signet",
    regtest: "Bitcoin Regtest",

    networkNote:
      "Halaman ini tidak pernah terhubung ke jaringan. Pilihan hanya menentukan format alamat, versi kunci, dan pemeriksaan.",

    createWallet: "Buat Dompet Baru",
    localGeneration:
      "Dompet dibuat secara lokal. Kunci privat dan frasa pemulihan tidak dikirim ke server.",

    recoveryPhrase: "Frasa Pemulihan",
    twelveWords: "12 kata",
    twentyFourWords: "24 kata",
    generateWallet: "Buat Dompet Baru",
    generating: "Membuat...",

    checkingSecurity: "Memeriksa keamanan browser...",
    secureRandomAvailable:
      "Generator angka acak aman tersedia",
    secureRandomUnavailable:
      "Generator angka acak aman tidak tersedia",
    secureContextRecommended:
      "HTTPS atau localhost disarankan",

    offlineRecommended: "Penggunaan offline disarankan",
    offlineExplanation:
      "Untuk dompet berisi dana nyata, unduh dan verifikasi aplikasi ini sebelum memutus internet dan membuat dompet.",

    yourWallet: "Dompet Anda",
    walletBackupInstruction:
      "Tuliskan frasa pemulihan dan simpan di tempat yang aman.",

    neverSharePhrase:
      "Jangan pernah membagikan frasa pemulihan.",
    phraseDanger:
      "Siapa pun yang memiliki frasa pemulihan dapat mengontrol Bitcoin di dompet ini. Kami tidak akan pernah meminta Anda memasukkannya ke situs web.",

    phraseBackup:
      "Frasa pemulihan adalah cadangan dompet ini.",

    hidePhrase: "Sembunyikan Frasa Pemulihan",
    revealPhrase: "Tampilkan Frasa Pemulihan",
    copyPhrase: "Salin Frasa Pemulihan",

    receivingAddress: "Alamat Penerimaan Pertama",
    receivingAddressDescription:
      "Ini adalah alamat penerimaan Bitcoin SegWit native pertama Anda.",
    copyAddress: "Salin Alamat",
    derivationPath: "Jalur derivasi",

    walletVerified: "Dompet terverifikasi",
    verificationDescription:
      "Frasa pemulihan digunakan untuk menurunkan dan memverifikasi alamat dompet secara independen.",

    advancedInformation: "Informasi Dompet Lanjutan",
    masterFingerprint: "Sidik Jari Master",
    extendedPublicKey: "Kunci Publik Diperluas Akun",
    derivationStandard: "Standar Derivasi",

    backup: "Cadangan",
    backupDescription:
      "Simpan frasa pemulihan dengan aman sebelum menghancurkan dompet dari browser.",
    printBackup: "Cetak Cadangan",
    destroyWallet: "Hancurkan Dompet",

    aboutGenerator: "Tentang Generator Ini",
    aboutDescription:
      "Aplikasi ini membuat dompet Bitcoin deterministik menggunakan standar dompet Bitcoin yang mapan.",

    hierarchicalKeys: "Kunci deterministik hierarkis",
    nativeSegwit: "Alamat SegWit native",

    important: "Penting",
    auditWarning:
      "Perangkat lunak ini belum diaudit secara independen. Jangan gunakan untuk dana besar sampai implementasi, dependensi, dan dompet yang dibuat telah diverifikasi.",

    sinceBlock: "SEJAK BLOK",
    version: "VERSI",
    commit: "COMMIT",

    switchToLight: "Beralih ke mode terang",
    switchToDark: "Beralih ke mode gelap",
    copied: "Disalin"
  }
});

let activeLanguage = DEFAULT_LANGUAGE;

function readSavedLanguage() {
  try {
    const savedLanguage = window.localStorage.getItem(
      LANGUAGE_STORAGE_KEY
    );

    return SUPPORTED_LANGUAGES[savedLanguage]
      ? savedLanguage
      : null;
  } catch (error) {
    return null;
  }
}

function saveLanguage(language) {
  try {
    window.localStorage.setItem(
      LANGUAGE_STORAGE_KEY,
      language
    );
  } catch (error) {
    // Language selection still works if storage is unavailable.
  }
}

function getBrowserLanguage() {
  const browserLanguages = Array.isArray(
    navigator.languages
  )
    ? navigator.languages
    : [navigator.language];

  for (const browserLanguage of browserLanguages) {
    if (SUPPORTED_LANGUAGES[browserLanguage]) {
      return browserLanguage;
    }

    const baseLanguage =
      browserLanguage.split("-")[0];

    if (SUPPORTED_LANGUAGES[baseLanguage]) {
      return baseLanguage;
    }

    if (
      baseLanguage === "zh" &&
      SUPPORTED_LANGUAGES["zh-CN"]
    ) {
      return "zh-CN";
    }

    if (
      baseLanguage === "pt" &&
      SUPPORTED_LANGUAGES["pt-BR"]
    ) {
      return "pt-BR";
    }
  }

  return DEFAULT_LANGUAGE;
}

function getTranslations(language) {
  return TRANSLATIONS[language] || TRANSLATIONS.en;
}

export function translate(key, replacements = {}) {
  const activeTranslations =
    getTranslations(activeLanguage);

  let value =
    activeTranslations[key] ??
    TRANSLATIONS.en[key] ??
    key;

  Object.entries(replacements).forEach(
    ([replacement, replacementValue]) => {
      value = value.replaceAll(
        `{${replacement}}`,
        String(replacementValue)
      );
    }
  );

  return value;
}

function translateElements() {
  document
    .querySelectorAll("[data-i18n]")
    .forEach((element) => {
      const key = element.dataset.i18n;

      element.textContent = translate(key);
    });

  document
    .querySelectorAll("[data-i18n-aria-label]")
    .forEach((element) => {
      const key =
        element.dataset.i18nAriaLabel;

      element.setAttribute(
        "aria-label",
        translate(key)
      );
    });

  document
    .querySelectorAll("[data-i18n-title]")
    .forEach((element) => {
      const key =
        element.dataset.i18nTitle;

      element.setAttribute(
        "title",
        translate(key)
      );
    });
}

function updateLanguageSelector() {
  const language = SUPPORTED_LANGUAGES[
    activeLanguage
  ];

  const label =
    document.getElementById("languageLabel");

  const options = document.querySelectorAll(
    ".language-option"
  );

  if (label) {
    label.textContent = language.code;
  }

  options.forEach((option) => {
    const isActive =
      option.dataset.language === activeLanguage;

    option.classList.toggle(
      "active",
      isActive
    );

    option.setAttribute(
      "aria-checked",
      String(isActive)
    );
  });
}

export function setLanguage(
  language,
  persist = true
) {
  if (!SUPPORTED_LANGUAGES[language]) {
    console.warn(
      `Unsupported language: ${language}`
    );

    return false;
  }

  activeLanguage = language;

  const languageConfig =
    SUPPORTED_LANGUAGES[language];

  document.documentElement.lang = language;
  document.documentElement.dir =
    languageConfig.direction;

  translateElements();
  updateLanguageSelector();

  if (persist) {
    saveLanguage(language);
  }

  window.dispatchEvent(
    new CustomEvent("language-changed", {
      detail: {
        language,
        direction:
          languageConfig.direction
      }
    })
  );

  return true;
}

export function getLanguage() {
  return activeLanguage;
}

function closeLanguageSelector({
  restoreFocus = false
} = {}) {
  const toggle =
    document.getElementById("languageToggle");

  const dropdown =
    document.getElementById("languageDropdown");

  if (!toggle || !dropdown) {
    return;
  }

  dropdown.hidden = true;

  toggle.setAttribute(
    "aria-expanded",
    "false"
  );

  if (restoreFocus) {
    toggle.focus();
  }
}

function openLanguageSelector() {
  const toggle =
    document.getElementById("languageToggle");

  const dropdown =
    document.getElementById("languageDropdown");

  if (!toggle || !dropdown) {
    return;
  }

  dropdown.hidden = false;

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

function moveLanguageFocus(
  currentOption,
  direction
) {
  const options = Array.from(
    document.querySelectorAll(
      ".language-option"
    )
  );

  const currentIndex =
    options.indexOf(currentOption);

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

  options[nextIndex].focus();
}

function bindLanguageSelector() {
  const toggle =
    document.getElementById("languageToggle");

  const dropdown =
    document.getElementById("languageDropdown");

  const options = Array.from(
    document.querySelectorAll(
      ".language-option"
    )
  );

  if (!toggle || !dropdown) {
    return;
  }

  toggle.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      if (dropdown.hidden) {
        openLanguageSelector();
      } else {
        closeLanguageSelector();
      }
    }
  );

  toggle.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "ArrowDown") {
        return;
      }

      event.preventDefault();

      openLanguageSelector();
    }
  );

  options.forEach((option) => {
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
        if (event.key === "ArrowDown") {
          event.preventDefault();

          moveLanguageFocus(
            option,
            1
          );
        } else if (
          event.key === "ArrowUp"
        ) {
          event.preventDefault();

          moveLanguageFocus(
            option,
            -1
          );
        } else if (
          event.key === "Home"
        ) {
          event.preventDefault();

          options[0]?.focus();
        } else if (
          event.key === "End"
        ) {
          event.preventDefault();

          options[
            options.length - 1
          ]?.focus();
        }
      }
    );
  });

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
        event.key === "Escape" &&
        !dropdown.hidden
      ) {
        closeLanguageSelector({
          restoreFocus: true
        });
      }
    }
  );
}

export function initializeLanguage() {
  activeLanguage =
    readSavedLanguage() ||
    getBrowserLanguage();

  setLanguage(activeLanguage, false);
  bindLanguageSelector();

  return activeLanguage;
}