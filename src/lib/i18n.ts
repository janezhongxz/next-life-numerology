/**
 * 国际化 - 中英双语
 */

export const translations = {
  zh: {
    title: '生命数字计算器',
    subtitle: 'Life Numerology Calculator',
    nameLabel: '姓名（中文/英文/拼音）',
    namePlaceholder: '请输入您的姓名',
    birthLabel: '出生日期',
    yearLabel: '查询年份（流年）',
    yearPlaceholder: '留空则不计算流年',
    calculate: '立即计算',
    errorName: '请输入姓名',
    errorDate: '请选择有效日期',
    nameError: '姓名只支持中文、英文、拼音和点号（.）',
    footer: 'Life Numerology',
    reportTitle: '生命数字战略蓝图',
    loading: '正在生成您的专属报告...',
    demoMode: '演示模式（未配置API Key）',
    settings: '设置',
    apiKey: 'API Key',
    apiKeyPlaceholder: '输入您的 OpenAI API Key',
    model: '模型',
    saveSettings: '保存设置',
    downloadPdf: '下载PDF',
  },
  en: {
    title: 'Life Numerology Calculator',
    subtitle: 'Numerology Report',
    nameLabel: 'Name (Chinese/English/Pinyin)',
    namePlaceholder: 'Enter your name',
    birthLabel: 'Birth Date',
    yearLabel: 'Query Year (Personal Year)',
    yearPlaceholder: 'Leave empty to skip',
    calculate: 'Calculate',
    errorName: 'Please enter your name',
    errorDate: 'Please select a valid date',
    nameError: 'Name only supports Chinese, English, Pinyin and dots (.)',
    footer: 'Life Numerology',
    reportTitle: 'Life Numerology Blueprint',
    loading: 'Generating your personalized report...',
    demoMode: 'Demo Mode (API Key not configured)',
    settings: 'Settings',
    apiKey: 'API Key',
    apiKeyPlaceholder: 'Enter your OpenAI API Key',
    model: 'Model',
    saveSettings: 'Save Settings',
    downloadPdf: 'Download PDF',
  }
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.zh

export function useI18n(lang: Language = 'zh') {
  return {
    t: (key: TranslationKey) => translations[lang][key] || translations.zh[key] || key,
    lang,
  }
}
