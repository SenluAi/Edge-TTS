var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// index.js
var TOKEN_REFRESH_BEFORE_EXPIRY = 3 * 60;
var tokenInfo = {
  endpoint: null,
  token: null,
  expiredAt: null
};
var HTML_PAGE = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title data-i18n="page.title">VoiceCraft - AI-Powered Voice Processing Platform</title>
    <meta name="description" content="" data-i18n-content="page.description">
    <meta name="keywords" content="" data-i18n-content="page.keywords">
    <style>
        :root {
            --primary-color: #2563eb;
            --primary-hover: #1d4ed8;
            --secondary-color: #64748b;
            --success-color: #059669;
            --warning-color: #d97706;
            --error-color: #dc2626;
            --background-color: #f8fafc;
            --surface-color: #ffffff;
            --text-primary: #0f172a;
            --text-secondary: #475569;  
            --border-color: #e2e8f0;
            --border-focus: #3b82f6;
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            --radius-sm: 6px;
            --radius-md: 8px;
            --radius-lg: 12px;
            --radius-xl: 16px;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--background-color);
            color: var(--text-primary);
            line-height: 1.6;
            min-height: 100vh;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: var(--surface-color);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-lg);
            padding: 40px 30px;
            text-align: center;
            margin-bottom: 30px;
            border: 1px solid var(--border-color);
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--primary-color);
            margin-bottom: 12px;
            letter-spacing: -0.025em;
        }
        
        .header .subtitle {
            font-size: 1.125rem;
            color: var(--text-secondary);
            margin-bottom: 20px;
            font-weight: 500;
        }
        
        .header .features {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
            margin-top: 20px;
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-secondary);
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .feature-icon {
            width: 20px;
            height: 20px;
            color: var(--success-color);
        }
        
        .main-content {
            background: var(--surface-color);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border-color);
            overflow: hidden;
        }
        
        .form-container {
            padding: 40px;
        }
        
        .form-group {
            margin-bottom: 24px;
        }
        
        .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--text-primary);
            font-size: 0.875rem;
        }
        
        .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid var(--border-color);
            border-radius: var(--radius-md);
            font-size: 16px;
            color: var(--text-primary);
            background: var(--surface-color);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: var(--border-focus);
            box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
        }
        
        .form-textarea {
            min-height: 120px;
            resize: vertical;
            font-family: inherit;
        }
        
        .controls-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
            margin-bottom: 32px;
        }
        
        .btn-primary {
            width: 100%;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 16px 32px;
            font-size: 16px;
            font-weight: 600;
            border-radius: var(--radius-md);
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .btn-primary:hover:not(:disabled) {
            background: var(--primary-hover);
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
        }
        
        .btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        .btn-secondary {
            background: var(--success-color);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: var(--radius-md);
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .btn-secondary:hover {
            background: #047857;
            transform: translateY(-1px);
        }
        
        .result-container {
            margin-top: 32px;
            padding: 24px;
            background: var(--background-color);
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-color);
            display: none;
        }
        
        .audio-player {
            width: 100%;
            margin-bottom: 16px;
            border-radius: var(--radius-md);
        }
        
        .error-message {
            color: var(--error-color);
            background: #fef2f2;
            border: 1px solid #fecaca;
            padding: 16px;
            border-radius: var(--radius-md);
            margin-top: 16px;
            font-weight: 500;
        }
        
        .loading-container {
            text-align: center;
            padding: 32px 20px;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--border-color);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
        }
        
        .loading-text {
            color: var(--text-secondary);
            font-weight: 500;
        }
        
        .wechat-promotion {
            margin-top: 40px;
            background: var(--surface-color);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-md);
            border: 1px solid var(--border-color);
            overflow: hidden;
        }
        
        .promotion-header {
            background: #f1f5f9;
            padding: 20px 30px;
            border-bottom: 1px solid var(--border-color);
        }
        
        .promotion-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 8px;
        }
        
        .promotion-subtitle {
            color: var(--text-secondary);
            font-size: 0.875rem;
        }
        
        .promotion-content {
            padding: 30px;
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 24px;
            align-items: center;
        }
        
        .qr-code {
            width: 120px;
            height: 120px;
            border: 2px solid var(--border-color);
            border-radius: var(--radius-lg);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .qr-code img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .promotion-info h3 {
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 12px;
        }
        
        .promotion-info p {
            color: var(--text-secondary);
            margin-bottom: 16px;
            line-height: 1.6;
        }
        
        .benefits-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .benefits-list li {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--text-secondary);
            font-size: 0.875rem;
            margin-bottom: 8px;
        }
        
        .benefits-list li:before {
            content: "\u2713";
            color: var(--success-color);
            font-weight: bold;
            font-size: 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
            animation: fadeIn 0.3s ease-out;
        }
        
        /* \u8F93\u5165\u65B9\u5F0F\u9009\u62E9\u4F18\u5316\u6837\u5F0F */
        .input-method-tabs {
            display: flex;
            gap: 4px;
            margin-bottom: 20px;
            background: var(--background-color);
            padding: 4px;
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-color);
        }
        
        .tab-btn {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 14px 20px;
            border: none;
            background: transparent;
            color: var(--text-secondary);
            border-radius: var(--radius-md);
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
        }
        
        .tab-btn:hover {
            color: var(--primary-color);
            background: rgba(37, 99, 235, 0.05);
        }
        
        .tab-btn.active {
            background: var(--primary-color);
            color: white;
            box-shadow: var(--shadow-sm);
            transform: translateY(-1px);
        }
        
        .tab-btn .tab-icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.1);
            font-size: 0.875rem;
        }
        
        .tab-btn:not(.active) .tab-icon {
            background: rgba(100, 116, 139, 0.1);
        }
        
        .file-upload-container {
            width: 100%;
        }
        
        .file-drop-zone {
            border: 2px dashed var(--border-color);
            border-radius: var(--radius-lg);
            padding: 48px 24px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: linear-gradient(135deg, var(--background-color) 0%, rgba(248, 250, 252, 0.8) 100%);
            position: relative;
            overflow: hidden;
        }
        
        .file-drop-zone::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .file-drop-zone:hover::before,
        .file-drop-zone.dragover::before {
            opacity: 1;
        }
        
        .file-drop-zone:hover,
        .file-drop-zone.dragover {
            border-color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.15);
        }
        
        .file-drop-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            position: relative;
            z-index: 1;
        }
        
        .file-drop-icon {
            width: 64px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%);
            border-radius: var(--radius-lg);
            color: white;
            margin-bottom: 8px;
            box-shadow: var(--shadow-md);
            position: relative;
        }
        
        .file-drop-text {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-primary);
            margin: 0;
            line-height: 1.4;
        }
        
        .file-drop-hint {
            font-size: 0.875rem;
            color: var(--text-secondary);
            margin: 0;
            padding: 8px 16px;
            background: rgba(100, 116, 139, 0.1);
            border-radius: var(--radius-sm);
        }
        
        .file-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            background: linear-gradient(135deg, var(--surface-color) 0%, rgba(248, 250, 252, 0.5) 100%);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            margin-top: 16px;
            box-shadow: var(--shadow-sm);
            transition: all 0.2s ease;
        }
        
        .file-info:hover {
            transform: translateY(-1px);
            box-shadow: var(--shadow-md);
        }
        
        .file-details {
            display: flex;
            flex-direction: column;
            gap: 6px;
            flex: 1;
        }
        
        .file-name {
            font-weight: 600;
            color: var(--text-primary);
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .file-name::before {
            content: '';
            width: 16px;
            height: 16px;
            background: var(--primary-color);
            border-radius: 3px;
            opacity: 0.8;
            flex-shrink: 0;
        }
        
        .file-size {
            font-size: 0.8rem;
            color: var(--text-secondary);
            background: rgba(100, 116, 139, 0.1);
            padding: 2px 8px;
            border-radius: 4px;
            display: inline-block;
            width: fit-content;
        }
        
        .file-remove-btn {
            width: 32px;
            height: 32px;
            border: none;
            background: var(--error-color);
            color: white;
            border-radius: var(--radius-md);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.875rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 600;
        }
        
        .file-remove-btn:hover {
            background: #b91c1c;
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }
        
        /* \u4E3B\u529F\u80FD\u5207\u6362\u5668\u6837\u5F0F */
        .mode-switcher {
            max-width: 900px;
            margin: 0 auto 30px;
            padding: 0 20px;
            display: flex;
            justify-content: center;
            gap: 20px;
        }
        
        .mode-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 16px 32px;
            border: 2px solid var(--border-color);
            background: var(--surface-color);
            color: var(--text-secondary);
            border-radius: var(--radius-lg);
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            flex: 1;
            max-width: 250px;
        }
        
        .mode-btn:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        .mode-btn.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        .mode-icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* \u8BED\u97F3\u8F6C\u5F55\u754C\u9762\u6837\u5F0F */
        .transcription-container {
            background: var(--surface-color);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border-color);
            overflow: hidden;
            max-width: 900px;
            margin: 0 auto;
        }
        
        .audio-upload-zone {
            border: 2px dashed var(--border-color);
            border-radius: var(--radius-lg);
            padding: 48px 24px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: linear-gradient(135deg, var(--background-color) 0%, rgba(248, 250, 252, 0.8) 100%);
            position: relative;
            overflow: hidden;
        }
        
        .audio-upload-zone::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .audio-upload-zone:hover::before,
        .audio-upload-zone.dragover::before {
            opacity: 1;
        }
        
        .audio-upload-zone:hover,
        .audio-upload-zone.dragover {
            border-color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(37, 99, 235, 0.15);
        }
        
        .token-config {
            display: flex;
            gap: 20px;
            margin-bottom: 16px;
        }
        
        .token-option {
            display: flex;
            align-items: center;
        }
        
        .token-label {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            font-weight: 500;
            color: var(--text-secondary);
            transition: color 0.2s ease;
        }
        
        .token-label:hover {
            color: var(--text-primary);
        }
        
        .token-label input[type="radio"] {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid var(--border-color);
            margin: 0;
            cursor: pointer;
            accent-color: var(--primary-color);
        }
        
        .transcription-result {
            margin-top: 20px;
        }
        
        .result-actions {
            display: flex;
            gap: 12px;
            margin-top: 16px;
            flex-wrap: wrap;
        }
        
        .result-actions .btn-secondary {
            flex: 1;
            min-width: 140px;
        }
        
        /* \u8BED\u8A00\u5207\u6362\u5668\u6837\u5F0F */
        .language-switcher {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .language-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--text-secondary);
            transition: all 0.2s ease;
            box-shadow: var(--shadow-sm);
        }
        
        .language-btn:hover {
            color: var(--primary-color);
            border-color: var(--primary-color);
            box-shadow: var(--shadow-md);
        }
        
        .language-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            margin-top: 4px;
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            min-width: 120px;
            display: none;
        }
        
        .language-dropdown.show {
            display: block;
        }
        
        .language-option {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            cursor: pointer;
            font-size: 0.875rem;
            color: var(--text-secondary);
            transition: background-color 0.2s ease;
        }
        
        .language-option:hover {
            background: var(--background-color);
            color: var(--text-primary);
        }
        
        .language-option.active {
            background: var(--primary-color);
            color: white;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 16px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .form-container {
                padding: 24px;
            }
            
            .controls-grid {
                grid-template-columns: 1fr;
                gap: 16px;
            }
            
            .promotion-content {
                grid-template-columns: 1fr;
                text-align: center;
                gap: 20px;
            }
            
            .qr-code {
                margin: 0 auto;
            }
            
            .input-method-tabs {
                gap: 2px;
                padding: 2px;
            }
            
            .tab-btn {
                padding: 12px 16px;
                font-size: 0.85rem;
                gap: 8px;
            }
            
            .tab-btn .tab-icon {
                width: 18px;
                height: 18px;
            }
            
            .file-drop-zone {
                padding: 32px 16px;
            }
            
            .file-drop-icon {
                width: 56px;
                height: 56px;
            }
            
            .file-info {
                padding: 16px;
                flex-direction: column;
                gap: 12px;
                align-items: flex-start;
            }
            
            .file-remove-btn {
                align-self: flex-end;
            }
            
            /* \u79FB\u52A8\u7AEF\u6A21\u5F0F\u5207\u6362\u5668\u6837\u5F0F */
            .mode-switcher {
                padding: 0 16px;
                margin-bottom: 20px;
                flex-direction: column;
                gap: 12px;
            }
            
            .mode-btn {
                max-width: none;
                padding: 14px 20px;
                font-size: 0.9rem;
                gap: 8px;
            }
            
            .mode-icon {
                width: 20px;
                height: 20px;
            }
            
            /* \u79FB\u52A8\u7AEF\u8BED\u97F3\u8F6C\u5F55\u754C\u9762\u6837\u5F0F */
            .audio-upload-zone {
                padding: 32px 16px;
            }
            
            .token-config {
                flex-direction: column;
                gap: 12px;
            }
            
            .result-actions {
                flex-direction: column;
            }
            
            .result-actions .btn-secondary {
                min-width: auto;
            }
        }
    </style>
</head>
<body>
    <!-- \u8BED\u8A00\u5207\u6362\u5668 -->
    <div class="language-switcher">
        <div class="language-btn" id="languageBtn">
            <span id="currentLangFlag">\u{1F310}</span>
            <span id="currentLangName" data-i18n="lang.current">English</span>
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
        <div class="language-dropdown" id="languageDropdown">
            <div class="language-option" data-lang="en">
                <span>\u{1F1FA}\u{1F1F8}</span>
                <span data-i18n="lang.en">English</span>
            </div>
            <div class="language-option" data-lang="zh">
                <span>\u{1F1E8}\u{1F1F3}</span>
                <span data-i18n="lang.zh">\u4E2D\u6587</span>
            </div>
            <div class="language-option" data-lang="ja">
                <span>\u{1F1EF}\u{1F1F5}</span>
                <span data-i18n="lang.ja">\u65E5\u672C\u8A9E</span>
            </div>
            <div class="language-option" data-lang="ko">
                <span>\u{1F1F0}\u{1F1F7}</span>
                <span data-i18n="lang.ko">\uD55C\uAD6D\uC5B4</span>
            </div>
            <div class="language-option" data-lang="es">
                <span>\u{1F1EA}\u{1F1F8}</span>
                <span data-i18n="lang.es">Espa\xF1ol</span>
            </div>
            <div class="language-option" data-lang="fr">
                <span>\u{1F1EB}\u{1F1F7}</span>
                <span data-i18n="lang.fr">Fran\xE7ais</span>
            </div>
            <div class="language-option" data-lang="de">
                <span>\u{1F1E9}\u{1F1EA}</span>
                <span data-i18n="lang.de">Deutsch</span>
            </div>
            <div class="language-option" data-lang="ru">
                <span>\u{1F1F7}\u{1F1FA}</span>
                <span data-i18n="lang.ru">\u0420\u0443\u0441\u0441\u043A\u0438\u0439</span>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="header">
            <h1 data-i18n="header.title">VoiceCraft</h1>
            <p class="subtitle" data-i18n="header.subtitle">AI-Powered Voice Processing Platform</p>
            <div class="features">
                <div class="feature-item">
                    <span class="feature-icon">\u2728</span>
                    <span data-i18n="header.feature1">20+ Voice Options</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">\u26A1</span>
                    <span data-i18n="header.feature2">Lightning Fast</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">\u{1F193}</span>
                    <span data-i18n="header.feature3">Completely Free</span>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">\u{1F4F1}</span>
                    <span data-i18n="header.feature4">Download Support</span>
                </div>
            </div>
        </div>
        
        <!-- \u4E3B\u529F\u80FD\u5207\u6362\u5668 -->
        <div class="mode-switcher">
            <button type="button" class="mode-btn active" id="ttsMode">
                <span class="mode-icon">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                    </svg>
                </span>
                <span data-i18n="mode.tts">Text to Speech</span>
            </button>
            <button type="button" class="mode-btn" id="transcriptionMode">
                <span class="mode-icon">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 9m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/>
                        <path d="M9 17v4"/>
                        <path d="M12 13a3 3 0 0 0 3 -3"/>
                        <path d="M15 9.5v-3a3 3 0 0 0 -3 -3h-1"/>
                        <path d="M19 8v8"/>
                        <path d="M17 9v6"/>
                        <path d="M21 9v6"/>
                    </svg>
                </span>
                <span data-i18n="mode.transcription">Speech to Text</span>
            </button>
        </div>
        
        <div class="main-content">
            <div class="form-container">
                <form id="ttsForm">
                    <!-- \u8F93\u5165\u65B9\u5F0F\u9009\u62E9 -->
                    <div class="form-group">
                        <label class="form-label">\u9009\u62E9\u8F93\u5165\u65B9\u5F0F</label>
                        <div class="input-method-tabs">
                            <button type="button" class="tab-btn active" id="textInputTab">
                                <span class="tab-icon">
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                    </svg>
                                </span>
                                <span>\u624B\u52A8\u8F93\u5165</span>
                            </button>
                            <button type="button" class="tab-btn" id="fileUploadTab">
                                <span class="tab-icon">
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                                    </svg>
                                </span>
                                <span>\u4E0A\u4F20\u6587\u4EF6</span>
                            </button>
                        </div>
                    </div>

                    <!-- \u624B\u52A8\u8F93\u5165\u533A\u57DF -->
                    <div class="form-group" id="textInputArea">
                        <label class="form-label" for="text">\u8F93\u5165\u6587\u672C</label>
                        <textarea class="form-textarea" id="text" placeholder="\u8BF7\u8F93\u5165\u8981\u8F6C\u6362\u4E3A\u8BED\u97F3\u7684\u6587\u672C\u5185\u5BB9\uFF0C\u652F\u6301\u4E2D\u6587\u3001\u82F1\u6587\u3001\u6570\u5B57\u7B49..." required></textarea>
                    </div>

                    <!-- \u6587\u4EF6\u4E0A\u4F20\u533A\u57DF -->
                    <div class="form-group" id="fileUploadArea" style="display: none;">
                        <label class="form-label" for="fileInput">\u4E0A\u4F20txt\u6587\u4EF6</label>
                        <div class="file-upload-container">
                            <div class="file-drop-zone" id="fileDropZone">
                                <div class="file-drop-content">
                                    <div class="file-drop-icon">
                                        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L13.09 8.26L19 7L17.74 13.09L24 12L17.74 10.91L19 5L13.09 6.26L12 0L10.91 6.26L5 5L6.26 10.91L0 12L6.26 13.09L5 19L10.91 17.74L12 24L13.09 17.74L19 19L17.74 13.09L24 12Z"/>
                                            <path d="M14 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V8L14 2M18 20H6V4H13V9H18V20Z"/>
                                        </svg>
                                    </div>
                                    <p class="file-drop-text">\u62D6\u62FDtxt\u6587\u4EF6\u5230\u6B64\u5904\uFF0C\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6</p>
                                    <p class="file-drop-hint">\u652F\u6301txt\u683C\u5F0F\uFF0C\u6700\u5927500KB</p>
                                </div>
                                <input type="file" id="fileInput" accept=".txt,text/plain" style="display: none;">
                            </div>
                            <div class="file-info" id="fileInfo" style="display: none;">
                                <div class="file-details">
                                    <span class="file-name" id="fileName"></span>
                                    <span class="file-size" id="fileSize"></span>
                                </div>
                                <button type="button" class="file-remove-btn" id="fileRemoveBtn">\u2715</button>
                            </div>
                        </div>
                    </div>
                
                    <div class="controls-grid">
                        <div class="form-group">
                            <label class="form-label" for="voice">\u8BED\u97F3\u9009\u62E9</label>
                            <select class="form-select" id="voice">
                                <option value="zh-CN-XiaoxiaoNeural">\u6653\u6653 (\u5973\u58F0\xB7\u6E29\u67D4)</option>
                                <option value="zh-CN-YunxiNeural">\u4E91\u5E0C (\u7537\u58F0\xB7\u6E05\u6717)</option>
                                <option value="zh-CN-YunyangNeural">\u4E91\u626C (\u7537\u58F0\xB7\u9633\u5149)</option>
                                <option value="zh-CN-XiaoyiNeural">\u6653\u4F0A (\u5973\u58F0\xB7\u751C\u7F8E)</option>
                                <option value="zh-CN-YunjianNeural">\u4E91\u5065 (\u7537\u58F0\xB7\u7A33\u91CD)</option>
                                <option value="zh-CN-XiaochenNeural">\u6653\u8FB0 (\u5973\u58F0\xB7\u77E5\u6027)</option>
                                <option value="zh-CN-XiaohanNeural">\u6653\u6DB5 (\u5973\u58F0\xB7\u4F18\u96C5)</option>
                                <option value="zh-CN-XiaomengNeural">\u6653\u68A6 (\u5973\u58F0\xB7\u68A6\u5E7B)</option>
                                <option value="zh-CN-XiaomoNeural">\u6653\u58A8 (\u5973\u58F0\xB7\u6587\u827A)</option>
                                <option value="zh-CN-XiaoqiuNeural">\u6653\u79CB (\u5973\u58F0\xB7\u6210\u719F)</option>
                                <option value="zh-CN-XiaoruiNeural">\u6653\u777F (\u5973\u58F0\xB7\u667A\u6167)</option>
                                <option value="zh-CN-XiaoshuangNeural">\u6653\u53CC (\u5973\u58F0\xB7\u6D3B\u6CFC)</option>
                                <option value="zh-CN-XiaoxuanNeural">\u6653\u8431 (\u5973\u58F0\xB7\u6E05\u65B0)</option>
                                <option value="zh-CN-XiaoyanNeural">\u6653\u989C (\u5973\u58F0\xB7\u67D4\u7F8E)</option>
                                <option value="zh-CN-XiaoyouNeural">\u6653\u60A0 (\u5973\u58F0\xB7\u60A0\u626C)</option>
                                <option value="zh-CN-XiaozhenNeural">\u6653\u7504 (\u5973\u58F0\xB7\u7AEF\u5E84)</option>
                                <option value="zh-CN-YunfengNeural">\u4E91\u67AB (\u7537\u58F0\xB7\u78C1\u6027)</option>
                                <option value="zh-CN-YunhaoNeural">\u4E91\u7693 (\u7537\u58F0\xB7\u8C6A\u8FC8)</option>
                                <option value="zh-CN-YunxiaNeural">\u4E91\u590F (\u7537\u58F0\xB7\u70ED\u60C5)</option>
                                <option value="zh-CN-YunyeNeural">\u4E91\u91CE (\u7537\u58F0\xB7\u91CE\u6027)</option>
                                <option value="zh-CN-YunzeNeural">\u4E91\u6CFD (\u7537\u58F0\xB7\u6DF1\u6C89)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="speed">\u8BED\u901F\u8C03\u8282</label>
                            <select class="form-select" id="speed">
                                <option value="0.5">\u{1F40C} \u5F88\u6162</option>
                                <option value="0.75">\u{1F6B6} \u6162\u901F</option>
                                <option value="1.0" selected>\u26A1 \u6B63\u5E38</option>
                                <option value="1.25">\u{1F3C3} \u5FEB\u901F</option>
                                <option value="1.5">\u{1F680} \u5F88\u5FEB</option>
                                <option value="2.0">\u{1F4A8} \u6781\u901F</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="pitch">\u97F3\u8C03\u9AD8\u4F4E</label>
                            <select class="form-select" id="pitch">
                                <option value="-50">\u{1F4C9} \u5F88\u4F4E\u6C89</option>
                                <option value="-25">\u{1F4CA} \u4F4E\u6C89</option>
                                <option value="0" selected>\u{1F3B5} \u6807\u51C6</option>
                                <option value="25">\u{1F4C8} \u9AD8\u4EA2</option>
                                <option value="50">\u{1F3B6} \u5F88\u9AD8\u4EA2</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="style">\u8BED\u97F3\u98CE\u683C</label>
                            <select class="form-select" id="style">
                                <option value="general" selected>\u{1F3AD} \u901A\u7528\u98CE\u683C</option>
                                <option value="assistant">\u{1F916} \u667A\u80FD\u52A9\u624B</option>
                                <option value="chat">\u{1F4AC} \u804A\u5929\u5BF9\u8BDD</option>
                                <option value="customerservice">\u{1F4DE} \u5BA2\u670D\u4E13\u4E1A</option>
                                <option value="newscast">\u{1F4FA} \u65B0\u95FB\u64AD\u62A5</option>
                                <option value="affectionate">\u{1F495} \u4EB2\u5207\u6E29\u6696</option>
                                <option value="calm">\u{1F60C} \u5E73\u9759\u8212\u7F13</option>
                                <option value="cheerful">\u{1F60A} \u6109\u5FEB\u6B22\u4E50</option>
                                <option value="gentle">\u{1F338} \u6E29\u548C\u67D4\u7F8E</option>
                                <option value="lyrical">\u{1F3BC} \u6292\u60C5\u8BD7\u610F</option>
                                <option value="serious">\u{1F3AF} \u4E25\u8083\u6B63\u5F0F</option>
                            </select>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn-primary" id="generateBtn">
                        <span>\u{1F399}\uFE0F</span>
                        <span>\u5F00\u59CB\u751F\u6210\u8BED\u97F3</span>
                    </button>
            </form>
            
                <div id="result" class="result-container">
                    <div id="loading" class="loading-container" style="display: none;">
                        <div class="loading-spinner"></div>
                        <p class="loading-text" id="loadingText">\u6B63\u5728\u751F\u6210\u8BED\u97F3\uFF0C\u8BF7\u7A0D\u5019...</p>
                        <div class="progress-info" id="progressInfo" style="margin-top: 12px; font-size: 0.875rem; color: var(--text-secondary);"></div>
                    </div>
                    
                    <div id="success" style="display: none;">
                        <audio id="audioPlayer" class="audio-player" controls></audio>
                        <a id="downloadBtn" class="btn-secondary" download="speech.mp3">
                            <span>\u{1F4E5}</span>
                            <span>\u4E0B\u8F7D\u97F3\u9891\u6587\u4EF6</span>
                        </a>
                    </div>
                    
                    <div id="error" class="error-message" style="display: none;"></div>
                </div>
            </div>
        </div>
        
        <!-- \u8BED\u97F3\u8F6C\u5F55\u754C\u9762 -->
        <div class="transcription-container" id="transcriptionContainer" style="display: none;">
            <div class="form-container">
                <form id="transcriptionForm">
                    <div class="form-group">
                        <label class="form-label">\u4E0A\u4F20\u97F3\u9891\u6587\u4EF6</label>
                        <div class="audio-upload-zone" id="audioDropZone">
                            <div class="file-drop-content">
                                <div class="file-drop-icon">
                                    <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                                        <path d="M14 2v6h6"/>
                                        <path d="M12 18v-6"/>
                                        <path d="M9 15l3-3 3 3"/>
                                    </svg>
                                </div>
                                <p class="file-drop-text">\u62D6\u62FD\u97F3\u9891\u6587\u4EF6\u5230\u6B64\u5904\uFF0C\u6216\u70B9\u51FB\u9009\u62E9\u6587\u4EF6</p>
                                <p class="file-drop-hint">\u652F\u6301mp3\u3001wav\u3001m4a\u3001flac\u3001aac\u3001ogg\u3001webm\u3001amr\u30013gp\u683C\u5F0F\uFF0C\u6700\u592750MB</p>
                            </div>
                            <input type="file" id="audioFileInput" accept=".mp3,.wav,.m4a,.flac,.aac,.ogg,.webm,.amr,.3gp,audio/*" style="display: none;">
                        </div>
                        <div class="file-info" id="audioFileInfo" style="display: none;">
                            <div class="file-details">
                                <span class="file-name" id="audioFileName"></span>
                                <span class="file-size" id="audioFileSize"></span>
                            </div>
                            <button type="button" class="file-remove-btn" id="audioFileRemoveBtn">\u2715</button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="tokenInput">API Token\u914D\u7F6E</label>
                        <div class="token-config">
                            <div class="token-option">
                                <label class="token-label">
                                    <input type="radio" name="tokenOption" value="default" checked>
                                    <span>\u4F7F\u7528\u9ED8\u8BA4Token</span>
                                </label>
                            </div>
                            <div class="token-option">
                                <label class="token-label">
                                    <input type="radio" name="tokenOption" value="custom">
                                    <span>\u4F7F\u7528\u7845\u57FA\u6D41\u52A8\u81EA\u5B9A\u4E49Token</span>
                                </label>
                            </div>
                        </div>
                        <input type="password" class="form-input" id="tokenInput" 
                               placeholder="\u8F93\u5165\u60A8\u7684API Token\uFF08\u53EF\u9009\uFF09" style="display: none;">
                    </div>

                    <button type="submit" class="btn-primary" id="transcribeBtn">
                        <span>\u{1F3A7}</span>
                        <span>\u5F00\u59CB\u8BED\u97F3\u8F6C\u5F55</span>
                    </button>
                </form>

                <div id="transcriptionResult" class="result-container">
                    <div id="transcriptionLoading" class="loading-container" style="display: none;">
                        <div class="loading-spinner"></div>
                        <p class="loading-text" id="transcriptionLoadingText">\u6B63\u5728\u8F6C\u5F55\u97F3\u9891\uFF0C\u8BF7\u7A0D\u5019...</p>
                        <div class="progress-info" id="transcriptionProgressInfo" style="margin-top: 12px; font-size: 0.875rem; color: var(--text-secondary);"></div>
                    </div>
                    
                    <div id="transcriptionSuccess" style="display: none;">
                        <div class="transcription-result">
                            <label class="form-label">\u8F6C\u5F55\u7ED3\u679C</label>
                            <textarea class="form-textarea" id="transcriptionText" 
                                      placeholder="\u8F6C\u5F55\u7ED3\u679C\u5C06\u5728\u8FD9\u91CC\u663E\u793A..." readonly></textarea>
                            <div class="result-actions">
                                <button type="button" class="btn-secondary" id="copyTranscriptionBtn">
                                    <span>\u{1F4CB}</span>
                                    <span>\u590D\u5236\u6587\u672C</span>
                                </button>
                                <button type="button" class="btn-secondary" id="editTranscriptionBtn">
                                    <span>\u270F\uFE0F</span>
                                    <span>\u7F16\u8F91\u6587\u672C</span>
                                </button>
                                <button type="button" class="btn-secondary" id="useForTtsBtn">
                                    <span>\u{1F399}\uFE0F</span>
                                    <span>\u8F6C\u4E3A\u8BED\u97F3</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="transcriptionError" class="error-message" style="display: none;"></div>
                </div>
            </div>
        </div>
        
        <!-- \u516C\u4F17\u53F7\u63A8\u5E7F\u7EC4\u4EF6 -->
        <div class="wechat-promotion" id="wechatPromotion" style="display: none;">
            <div class="promotion-header">
                <h2 class="promotion-title">\u{1F389} \u751F\u6210\u6210\u529F\uFF01\u559C\u6B22\u8FD9\u4E2A\u5DE5\u5177\u5417\uFF1F</h2>
                <p class="promotion-subtitle">\u5173\u6CE8\u6211\u4EEC\u83B7\u53D6\u66F4\u591AAI\u5DE5\u5177\u548C\u6280\u672F\u5206\u4EAB</p>
            </div>
            <div class="promotion-content">
                <div class="qr-code">
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAMYAyADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9TaKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoooo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CiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z" alt="\u5FAE\u4FE1\u516C\u4F17\u53F7\u4E8C\u7EF4\u7801" />
                </div>
                <div class="promotion-info">
                    <h3>\u5173\u6CE8\u300C\u4E00\u53EA\u4F1A\u98DE\u7684\u65FA\u65FA\u300D\u516C\u4F17\u53F7</h3>
                    <p>\u83B7\u53D6\u66F4\u591A\u5B9E\u7528\u7684AI\u5DE5\u5177\u3001\u6280\u672F\u6559\u7A0B\u548C\u72EC\u5BB6\u8D44\u6E90\u5206\u4EAB</p>
                    <ul class="benefits-list">
                        <li>\u6700\u65B0AI\u5DE5\u5177\u63A8\u8350\u548C\u4F7F\u7528\u6559\u7A0B</li>
                        <li>\u524D\u6CBF\u6280\u672F\u89E3\u6790\u548C\u5B9E\u6218\u6848\u4F8B</li>
                        <li>\u72EC\u5BB6\u8D44\u6E90\u548C\u5DE5\u5177\u6E90\u7801\u5206\u4EAB</li>
                        <li>\u6280\u672F\u95EE\u9898\u7B54\u7591\u548C\u4EA4\u6D41\u793E\u7FA4</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <script>
        let selectedFile = null;
        let currentInputMethod = 'text'; // 'text' or 'file'
        let currentMode = 'tts'; // 'tts' or 'transcription'
        let selectedAudioFile = null;
        let transcriptionToken = null;
        let currentLanguage = 'en'; // \u9ED8\u8BA4\u8BED\u8A00

        // \u56FD\u9645\u5316\u7FFB\u8BD1\u6570\u636E
        const translations = {
            en: {
                'page.title': 'VoiceCraft - AI-Powered Voice Processing Platform',
                'page.description': 'VoiceCraft is an AI-powered platform that converts text to speech and speech to text with 20+ voice options, lightning fast processing, completely free to use.',
                'page.keywords': 'text to speech,AI voice synthesis,online TTS,voice generator,free voice tools,speech to text,voice transcription',
                'lang.current': 'English',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'AI-Powered Voice Processing Platform',
                'header.feature1': '20+ Voice Options',
                'header.feature2': 'Lightning Fast',
                'header.feature3': 'Completely Free',
                'header.feature4': 'Download Support',
                'mode.tts': 'Text to Speech',
                'mode.transcription': 'Speech to Text'
            },
            zh: {
                'page.title': 'VoiceCraft - AI\u9A71\u52A8\u7684\u8BED\u97F3\u5904\u7406\u5E73\u53F0',
                'page.description': 'VoiceCraft\u662F\u4E00\u4E2AAI\u9A71\u52A8\u7684\u5E73\u53F0\uFF0C\u652F\u6301\u6587\u5B57\u8F6C\u8BED\u97F3\u548C\u8BED\u97F3\u8F6C\u6587\u5B57\uFF0C\u62E5\u670920+\u79CD\u8BED\u97F3\u9009\u9879\uFF0C\u95EA\u7535\u822C\u7684\u5904\u7406\u901F\u5EA6\uFF0C\u5B8C\u5168\u514D\u8D39\u4F7F\u7528\u3002',
                'page.keywords': '\u6587\u5B57\u8F6C\u8BED\u97F3,AI\u8BED\u97F3\u5408\u6210,\u5728\u7EBFTTS,\u8BED\u97F3\u751F\u6210\u5668,\u514D\u8D39\u8BED\u97F3\u5DE5\u5177,\u8BED\u97F3\u8F6C\u6587\u5B57,\u8BED\u97F3\u8F6C\u5F55',
                'lang.current': '\u4E2D\u6587',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'AI\u9A71\u52A8\u7684\u8BED\u97F3\u5904\u7406\u5E73\u53F0',
                'header.feature1': '20+\u79CD\u8BED\u97F3\u9009\u9879',
                'header.feature2': '\u95EA\u7535\u822C\u5FEB\u901F',
                'header.feature3': '\u5B8C\u5168\u514D\u8D39',
                'header.feature4': '\u652F\u6301\u4E0B\u8F7D',
                'mode.tts': '\u6587\u5B57\u8F6C\u8BED\u97F3',
                'mode.transcription': '\u8BED\u97F3\u8F6C\u6587\u5B57'
            },
            ja: {
                'page.title': 'VoiceCraft - AI\u97F3\u58F0\u51E6\u7406\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0',
                'page.description': 'VoiceCraft\u306FAI\u99C6\u52D5\u306E\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0\u3067\u3001\u30C6\u30AD\u30B9\u30C8\u8AAD\u307F\u4E0A\u3052\u3068\u97F3\u58F0\u30C6\u30AD\u30B9\u30C8\u5909\u63DB\u306B\u5BFE\u5FDC\u300220\u4EE5\u4E0A\u306E\u97F3\u58F0\u30AA\u30D7\u30B7\u30E7\u30F3\u3001\u9AD8\u901F\u51E6\u7406\u3001\u5B8C\u5168\u7121\u6599\u3067\u3054\u5229\u7528\u3044\u305F\u3060\u3051\u307E\u3059\u3002',
                'page.keywords': '\u30C6\u30AD\u30B9\u30C8\u8AAD\u307F\u4E0A\u3052,AI\u97F3\u58F0\u5408\u6210,\u30AA\u30F3\u30E9\u30A4\u30F3TTS,\u97F3\u58F0\u30B8\u30A7\u30CD\u30EC\u30FC\u30BF\u30FC,\u7121\u6599\u97F3\u58F0\u30C4\u30FC\u30EB,\u97F3\u58F0\u30C6\u30AD\u30B9\u30C8\u5909\u63DB,\u97F3\u58F0\u8EE2\u5199',
                'lang.current': '\u65E5\u672C\u8A9E',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'AI\u97F3\u58F0\u51E6\u7406\u30D7\u30E9\u30C3\u30C8\u30D5\u30A9\u30FC\u30E0',
                'header.feature1': '20\u4EE5\u4E0A\u306E\u97F3\u58F0\u30AA\u30D7\u30B7\u30E7\u30F3',
                'header.feature2': '\u9AD8\u901F\u51E6\u7406',
                'header.feature3': '\u5B8C\u5168\u7121\u6599',
                'header.feature4': '\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u5BFE\u5FDC',
                'mode.tts': '\u30C6\u30AD\u30B9\u30C8\u8AAD\u307F\u4E0A\u3052',
                'mode.transcription': '\u97F3\u58F0\u30C6\u30AD\u30B9\u30C8\u5909\u63DB'
            },
            ko: {
                'page.title': 'VoiceCraft - AI \uC74C\uC131 \uCC98\uB9AC \uD50C\uB7AB\uD3FC',
                'page.description': 'VoiceCraft\uB294 AI \uAE30\uBC18 \uD50C\uB7AB\uD3FC\uC73C\uB85C \uD14D\uC2A4\uD2B8 \uC74C\uC131 \uBCC0\uD658\uACFC \uC74C\uC131 \uD14D\uC2A4\uD2B8 \uBCC0\uD658\uC744 \uC9C0\uC6D0\uD569\uB2C8\uB2E4. 20\uAC1C \uC774\uC0C1\uC758 \uC74C\uC131 \uC635\uC158, \uBE60\uB978 \uCC98\uB9AC \uC18D\uB3C4, \uC644\uC804 \uBB34\uB8CC\uB85C \uC774\uC6A9\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
                'page.keywords': '\uD14D\uC2A4\uD2B8 \uC74C\uC131 \uBCC0\uD658,AI \uC74C\uC131 \uD569\uC131,\uC628\uB77C\uC778 TTS,\uC74C\uC131 \uC0DD\uC131\uAE30,\uBB34\uB8CC \uC74C\uC131 \uB3C4\uAD6C,\uC74C\uC131 \uD14D\uC2A4\uD2B8 \uBCC0\uD658,\uC74C\uC131 \uC804\uC0AC',
                'lang.current': '\uD55C\uAD6D\uC5B4',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'AI \uC74C\uC131 \uCC98\uB9AC \uD50C\uB7AB\uD3FC',
                'header.feature1': '20\uAC1C \uC774\uC0C1\uC758 \uC74C\uC131 \uC635\uC158',
                'header.feature2': '\uBE60\uB978 \uCC98\uB9AC',
                'header.feature3': '\uC644\uC804 \uBB34\uB8CC',
                'header.feature4': '\uB2E4\uC6B4\uB85C\uB4DC \uC9C0\uC6D0',
                'mode.tts': '\uD14D\uC2A4\uD2B8 \uC74C\uC131 \uBCC0\uD658',
                'mode.transcription': '\uC74C\uC131 \uD14D\uC2A4\uD2B8 \uBCC0\uD658'
            },
            es: {
                'page.title': 'VoiceCraft - Plataforma de Procesamiento de Voz con IA',
                'page.description': 'VoiceCraft es una plataforma impulsada por IA que convierte texto a voz y voz a texto con m\xE1s de 20 opciones de voz, procesamiento ultrarr\xE1pido, completamente gratis.',
                'page.keywords': 'texto a voz,s\xEDntesis de voz IA,TTS en l\xEDnea,generador de voz,herramientas de voz gratis,voz a texto,transcripci\xF3n de voz',
                'lang.current': 'Espa\xF1ol',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'Plataforma de Procesamiento de Voz con IA',
                'header.feature1': 'M\xE1s de 20 Opciones de Voz',
                'header.feature2': 'Ultrarr\xE1pido',
                'header.feature3': 'Completamente Gratis',
                'header.feature4': 'Soporte de Descarga',
                'mode.tts': 'Texto a Voz',
                'mode.transcription': 'Voz a Texto'
            },
            fr: {
                'page.title': 'VoiceCraft - Plateforme de Traitement Vocal IA',
                'page.description': 'VoiceCraft est une plateforme aliment\xE9e par IA qui convertit le texte en parole et la parole en texte avec plus de 20 options vocales, traitement ultra-rapide, enti\xE8rement gratuit.',
                'page.keywords': 'texte vers parole,synth\xE8se vocale IA,TTS en ligne,g\xE9n\xE9rateur vocal,outils vocaux gratuits,parole vers texte,transcription vocale',
                'lang.current': 'Fran\xE7ais',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'Plateforme de Traitement Vocal IA',
                'header.feature1': 'Plus de 20 Options Vocales',
                'header.feature2': 'Ultra-rapide',
                'header.feature3': 'Enti\xE8rement Gratuit',
                'header.feature4': 'Support de T\xE9l\xE9chargement',
                'mode.tts': 'Texte vers Parole',
                'mode.transcription': 'Parole vers Texte'
            },
            de: {
                'page.title': 'VoiceCraft - KI-gest\xFCtzte Sprachverarbeitungsplattform',
                'page.description': 'VoiceCraft ist eine KI-gest\xFCtzte Plattform, die Text in Sprache und Sprache in Text umwandelt, mit \xFCber 20 Sprachoptionen, blitzschneller Verarbeitung, v\xF6llig kostenlos.',
                'page.keywords': 'Text zu Sprache,KI-Sprachsynthese,Online-TTS,Sprachgenerator,kostenlose Sprachtools,Sprache zu Text,Sprachtranskription',
                'lang.current': 'Deutsch',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': 'KI-gest\xFCtzte Sprachverarbeitungsplattform',
                'header.feature1': '\xDCber 20 Sprachoptionen',
                'header.feature2': 'Blitzschnell',
                'header.feature3': 'V\xF6llig Kostenlos',
                'header.feature4': 'Download-Unterst\xFCtzung',
                'mode.tts': 'Text zu Sprache',
                'mode.transcription': 'Sprache zu Text'
            },
            ru: {
                'page.title': 'VoiceCraft - \u0418\u0418-\u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0433\u043E\u043B\u043E\u0441\u0430',
                'page.description': 'VoiceCraft - \u044D\u0442\u043E \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u043D\u0430 \u0431\u0430\u0437\u0435 \u0418\u0418, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043F\u0440\u0435\u043E\u0431\u0440\u0430\u0437\u0443\u0435\u0442 \u0442\u0435\u043A\u0441\u0442 \u0432 \u0440\u0435\u0447\u044C \u0438 \u0440\u0435\u0447\u044C \u0432 \u0442\u0435\u043A\u0441\u0442 \u0441 \u0431\u043E\u043B\u0435\u0435 \u0447\u0435\u043C 20 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u044B\u043C\u0438 \u043E\u043F\u0446\u0438\u044F\u043C\u0438, \u043C\u043E\u043B\u043D\u0438\u0435\u043D\u043E\u0441\u043D\u043E\u0439 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u043E\u0439, \u0441\u043E\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u043E \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E.',
                'page.keywords': '\u0442\u0435\u043A\u0441\u0442 \u0432 \u0440\u0435\u0447\u044C,\u0418\u0418 \u0441\u0438\u043D\u0442\u0435\u0437 \u0440\u0435\u0447\u0438,\u043E\u043D\u043B\u0430\u0439\u043D TTS,\u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440 \u0433\u043E\u043B\u043E\u0441\u0430,\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0435 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u044B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B,\u0440\u0435\u0447\u044C \u0432 \u0442\u0435\u043A\u0441\u0442,\u0442\u0440\u0430\u043D\u0441\u043A\u0440\u0438\u043F\u0446\u0438\u044F \u0440\u0435\u0447\u0438',
                'lang.current': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'lang.en': 'English',
                'lang.zh': '\u4E2D\u6587',
                'lang.ja': '\u65E5\u672C\u8A9E',
                'lang.ko': '\uD55C\uAD6D\uC5B4',
                'lang.es': 'Espa\xF1ol',
                'lang.fr': 'Fran\xE7ais',
                'lang.de': 'Deutsch',
                'lang.ru': '\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
                'header.title': 'VoiceCraft',
                'header.subtitle': '\u0418\u0418-\u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0433\u043E\u043B\u043E\u0441\u0430',
                'header.feature1': '\u0411\u043E\u043B\u0435\u0435 20 \u0433\u043E\u043B\u043E\u0441\u043E\u0432\u044B\u0445 \u043E\u043F\u0446\u0438\u0439',
                'header.feature2': '\u041C\u043E\u043B\u043D\u0438\u0435\u043D\u043E\u0441\u043D\u043E',
                'header.feature3': '\u0421\u043E\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u043E \u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E',
                'header.feature4': '\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0438',
                'mode.tts': '\u0422\u0435\u043A\u0441\u0442 \u0432 \u0420\u0435\u0447\u044C',
                'mode.transcription': '\u0420\u0435\u0447\u044C \u0432 \u0422\u0435\u043A\u0441\u0442'
            }
        };

        // \u56FD\u9645\u5316\u529F\u80FD
        function detectLanguage() {
            // \u68C0\u6D4B\u6D4F\u89C8\u5668\u8BED\u8A00
            const browserLang = navigator.language || navigator.userLanguage;
            const shortLang = browserLang.split('-')[0];
            
            // \u68C0\u67E5\u662F\u5426\u652F\u6301\u8BE5\u8BED\u8A00
            if (translations[shortLang]) {
                return shortLang;
            }
            
            // \u9ED8\u8BA4\u8FD4\u56DE\u82F1\u8BED
            return 'en';
        }

        function setLanguage(lang) {
            currentLanguage = lang;
            localStorage.setItem('voicecraft-language', lang);
            
            // \u66F4\u65B0\u9875\u9762\u8BED\u8A00\u5C5E\u6027
            document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
            
            // \u5E94\u7528\u7FFB\u8BD1
            applyTranslations();
            
            // \u66F4\u65B0\u8BED\u8A00\u5207\u6362\u5668
            updateLanguageSwitcher();
        }

        function applyTranslations() {
            const langData = translations[currentLanguage];
            
            // \u66F4\u65B0\u6240\u6709\u5E26\u6709 data-i18n \u5C5E\u6027\u7684\u5143\u7D20
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (langData[key]) {
                    element.textContent = langData[key];
                }
            });
            
            // \u66F4\u65B0 meta \u6807\u7B7E
            document.querySelectorAll('[data-i18n-content]').forEach(element => {
                const key = element.getAttribute('data-i18n-content');
                if (langData[key]) {
                    element.setAttribute('content', langData[key]);
                }
            });
            
            // \u66F4\u65B0\u9875\u9762\u6807\u9898
            if (langData['page.title']) {
                document.title = langData['page.title'];
            }
        }

        function updateLanguageSwitcher() {
            const langFlags = {
                'en': '\u{1F1FA}\u{1F1F8}',
                'zh': '\u{1F1E8}\u{1F1F3}',
                'ja': '\u{1F1EF}\u{1F1F5}',
                'ko': '\u{1F1F0}\u{1F1F7}',
                'es': '\u{1F1EA}\u{1F1F8}',
                'fr': '\u{1F1EB}\u{1F1F7}',
                'de': '\u{1F1E9}\u{1F1EA}',
                'ru': '\u{1F1F7}\u{1F1FA}'
            };
            
            const langData = translations[currentLanguage];
            document.getElementById('currentLangFlag').textContent = langFlags[currentLanguage];
            document.getElementById('currentLangName').textContent = langData['lang.current'];
            
            // \u66F4\u65B0\u9009\u4E2D\u72B6\u6001
            document.querySelectorAll('.language-option').forEach(option => {
                option.classList.remove('active');
                if (option.getAttribute('data-lang') === currentLanguage) {
                    option.classList.add('active');
                }
            });
        }

        // \u521D\u59CB\u5316\u9875\u9762
        document.addEventListener('DOMContentLoaded', function() {
            // \u521D\u59CB\u5316\u56FD\u9645\u5316
            initializeI18n();
            
            // \u521D\u59CB\u5316\u5176\u4ED6\u529F\u80FD
            initializeInputMethodTabs();
            initializeFileUpload();
            initializeModeSwitcher();
            initializeAudioUpload();
            initializeTokenConfig();
            initializeLanguageSwitcher();
        });

        // \u521D\u59CB\u5316\u8F93\u5165\u65B9\u5F0F\u5207\u6362
        function initializeInputMethodTabs() {
            const textInputTab = document.getElementById('textInputTab');
            const fileUploadTab = document.getElementById('fileUploadTab');
            const textInputArea = document.getElementById('textInputArea');
            const fileUploadArea = document.getElementById('fileUploadArea');

            textInputTab.addEventListener('click', function() {
                currentInputMethod = 'text';
                textInputTab.classList.add('active');
                fileUploadTab.classList.remove('active');
                textInputArea.style.display = 'block';
                fileUploadArea.style.display = 'none';
                document.getElementById('text').required = true;
            });

            fileUploadTab.addEventListener('click', function() {
                currentInputMethod = 'file';
                fileUploadTab.classList.add('active');
                textInputTab.classList.remove('active');
                textInputArea.style.display = 'none';
                fileUploadArea.style.display = 'block';
                document.getElementById('text').required = false;
            });
        }

        // \u521D\u59CB\u5316\u6587\u4EF6\u4E0A\u4F20\u529F\u80FD
        function initializeFileUpload() {
            const fileDropZone = document.getElementById('fileDropZone');
            const fileInput = document.getElementById('fileInput');
            const fileInfo = document.getElementById('fileInfo');
            const fileRemoveBtn = document.getElementById('fileRemoveBtn');

            // \u70B9\u51FB\u4E0A\u4F20\u533A\u57DF
            fileDropZone.addEventListener('click', function() {
                fileInput.click();
            });

            // \u6587\u4EF6\u9009\u62E9
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    handleFileSelect(file);
                }
            });

            // \u62D6\u62FD\u529F\u80FD
            fileDropZone.addEventListener('dragover', function(e) {
                e.preventDefault();
                fileDropZone.classList.add('dragover');
            });

            fileDropZone.addEventListener('dragleave', function(e) {
                e.preventDefault();
                fileDropZone.classList.remove('dragover');
            });

            fileDropZone.addEventListener('drop', function(e) {
                e.preventDefault();
                fileDropZone.classList.remove('dragover');
                const file = e.dataTransfer.files[0];
                if (file) {
                    handleFileSelect(file);
                }
            });

            // \u79FB\u9664\u6587\u4EF6
            fileRemoveBtn.addEventListener('click', function() {
                selectedFile = null;
                fileInput.value = '';
                fileInfo.style.display = 'none';
                fileDropZone.style.display = 'block';
            });
        }

        // \u5904\u7406\u6587\u4EF6\u9009\u62E9
        function handleFileSelect(file) {
            // \u9A8C\u8BC1\u6587\u4EF6\u7C7B\u578B
            if (!file.type.includes('text/') && !file.name.toLowerCase().endsWith('.txt')) {
                alert('\u8BF7\u9009\u62E9txt\u683C\u5F0F\u7684\u6587\u672C\u6587\u4EF6');
                return;
            }

            // \u9A8C\u8BC1\u6587\u4EF6\u5927\u5C0F
            if (file.size > 500 * 1024) {
                alert('\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7500KB');
                return;
            }

            selectedFile = file;
            
            // \u663E\u793A\u6587\u4EF6\u4FE1\u606F
            document.getElementById('fileName').textContent = file.name;
            document.getElementById('fileSize').textContent = formatFileSize(file.size);
            document.getElementById('fileInfo').style.display = 'flex';
            document.getElementById('fileDropZone').style.display = 'none';
        }

        // \u683C\u5F0F\u5316\u6587\u4EF6\u5927\u5C0F
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // \u8868\u5355\u63D0\u4EA4\u5904\u7406
        document.getElementById('ttsForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const voice = document.getElementById('voice').value;
            const speed = document.getElementById('speed').value;
            const pitch = document.getElementById('pitch').value;
            const style = document.getElementById('style').value;
            
            const generateBtn = document.getElementById('generateBtn');
            const resultContainer = document.getElementById('result');
            const loading = document.getElementById('loading');
            const success = document.getElementById('success');
            const error = document.getElementById('error');
            
            // \u9A8C\u8BC1\u8F93\u5165
            if (currentInputMethod === 'text') {
                const text = document.getElementById('text').value;
                if (!text.trim()) {
                    alert('\u8BF7\u8F93\u5165\u8981\u8F6C\u6362\u7684\u6587\u672C\u5185\u5BB9');
                    return;
                }
            } else if (currentInputMethod === 'file') {
                if (!selectedFile) {
                    alert('\u8BF7\u9009\u62E9\u8981\u4E0A\u4F20\u7684txt\u6587\u4EF6');
                    return;
                }
            }
            
            // \u91CD\u7F6E\u72B6\u6001
            resultContainer.style.display = 'block';
            loading.style.display = 'block';
            success.style.display = 'none';
            error.style.display = 'none';
            generateBtn.disabled = true;
            generateBtn.textContent = '\u751F\u6210\u4E2D...';
            
            try {
                let response;
                let textLength = 0;
                
                // \u66F4\u65B0\u52A0\u8F7D\u63D0\u793A
                const loadingText = document.getElementById('loadingText');
                const progressInfo = document.getElementById('progressInfo');
                
                if (currentInputMethod === 'text') {
                    // \u624B\u52A8\u8F93\u5165\u6587\u672C
                    const text = document.getElementById('text').value;
                    textLength = text.length;
                    
                    // \u6839\u636E\u6587\u672C\u957F\u5EA6\u663E\u793A\u4E0D\u540C\u7684\u63D0\u793A
                    if (textLength > 3000) {
                        loadingText.textContent = '\u6B63\u5728\u5904\u7406\u957F\u6587\u672C\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85...';
                        progressInfo.textContent = '\u6587\u672C\u957F\u5EA6: ' + textLength + ' \u5B57\u7B26\uFF0C\u9884\u8BA1\u9700\u8981 ' + (Math.ceil(textLength / 1500) * 2) + ' \u79D2';
                    } else {
                        loadingText.textContent = '\u6B63\u5728\u751F\u6210\u8BED\u97F3\uFF0C\u8BF7\u7A0D\u5019...';
                        progressInfo.textContent = '\u6587\u672C\u957F\u5EA6: ' + textLength + ' \u5B57\u7B26';
                    }
                    
                    response = await fetch('/v1/audio/speech', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            input: text,
                            voice: voice,
                            speed: parseFloat(speed),
                            pitch: pitch,
                            style: style
                        })
                    });
                } else {
                    // \u6587\u4EF6\u4E0A\u4F20
                    loadingText.textContent = '\u6B63\u5728\u5904\u7406\u4E0A\u4F20\u7684\u6587\u4EF6...';
                    progressInfo.textContent = '\u6587\u4EF6: ' + selectedFile.name + ' (' + formatFileSize(selectedFile.size) + ')';
                    
                    const formData = new FormData();
                    formData.append('file', selectedFile);
                    formData.append('voice', voice);
                    formData.append('speed', speed);
                    formData.append('pitch', pitch);
                    formData.append('style', style);
                    
                    response = await fetch('/v1/audio/speech', {
                        method: 'POST',
                        body: formData
                    });
                }
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || '\u751F\u6210\u5931\u8D25');
                }
                
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                
                // \u663E\u793A\u97F3\u9891\u64AD\u653E\u5668
                const audioPlayer = document.getElementById('audioPlayer');
                const downloadBtn = document.getElementById('downloadBtn');
                
                audioPlayer.src = audioUrl;
                downloadBtn.href = audioUrl;
                
                loading.style.display = 'none';
                success.style.display = 'block';
                
                // \u663E\u793A\u516C\u4F17\u53F7\u63A8\u5E7F\u7EC4\u4EF6
                setTimeout(() => {
                    const wechatPromotion = document.getElementById('wechatPromotion');
                    wechatPromotion.style.display = 'block';
                    wechatPromotion.classList.add('fade-in');
                }, 1000);
                
            } catch (err) {
                loading.style.display = 'none';
                error.style.display = 'block';
                
                // \u6839\u636E\u9519\u8BEF\u7C7B\u578B\u663E\u793A\u4E0D\u540C\u7684\u63D0\u793A
                if (err.message.includes('Too many subrequests')) {
                    error.textContent = '\u9519\u8BEF: \u6587\u672C\u8FC7\u957F\u5BFC\u81F4\u8BF7\u6C42\u8FC7\u591A\uFF0C\u8BF7\u7F29\u77ED\u6587\u672C\u5185\u5BB9\u6216\u5206\u6BB5\u5904\u7406';
                } else if (err.message.includes('\u9891\u7387\u9650\u5236') || err.message.includes('429')) {
                    error.textContent = '\u9519\u8BEF: \u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5';
                } else if (err.message.includes('\u5206\u5757\u6570\u91CF') && err.message.includes('\u8D85\u8FC7\u9650\u5236')) {
                    error.textContent = '\u9519\u8BEF: ' + err.message;
                } else {
                    error.textContent = '\u9519\u8BEF: ' + err.message;
                }
            } finally {
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<span>\u{1F399}\uFE0F</span><span>\u5F00\u59CB\u751F\u6210\u8BED\u97F3</span>';
            }
        });

        // \u521D\u59CB\u5316\u6A21\u5F0F\u5207\u6362\u5668
        function initializeModeSwitcher() {
            const ttsMode = document.getElementById('ttsMode');
            const transcriptionMode = document.getElementById('transcriptionMode');
            const mainContent = document.querySelector('.main-content');
            const transcriptionContainer = document.getElementById('transcriptionContainer');

            ttsMode.addEventListener('click', function() {
                switchMode('tts');
            });

            transcriptionMode.addEventListener('click', function() {
                switchMode('transcription');
            });
        }

        // \u5207\u6362\u529F\u80FD\u6A21\u5F0F
        function switchMode(mode) {
            const ttsMode = document.getElementById('ttsMode');
            const transcriptionMode = document.getElementById('transcriptionMode');
            const mainContent = document.querySelector('.main-content');
            const transcriptionContainer = document.getElementById('transcriptionContainer');
            const wechatPromotion = document.getElementById('wechatPromotion');

            currentMode = mode;

            if (mode === 'tts') {
                // \u5207\u6362\u5230TTS\u6A21\u5F0F
                ttsMode.classList.add('active');
                transcriptionMode.classList.remove('active');
                mainContent.style.display = 'block';
                transcriptionContainer.style.display = 'none';
            } else {
                // \u5207\u6362\u5230\u8BED\u97F3\u8F6C\u5F55\u6A21\u5F0F
                transcriptionMode.classList.add('active');
                ttsMode.classList.remove('active');
                mainContent.style.display = 'none';
                transcriptionContainer.style.display = 'block';
            }

            // \u9690\u85CF\u63A8\u5E7F\u7EC4\u4EF6
            wechatPromotion.style.display = 'none';
        }

        // \u521D\u59CB\u5316\u97F3\u9891\u4E0A\u4F20\u529F\u80FD
        function initializeAudioUpload() {
            const audioDropZone = document.getElementById('audioDropZone');
            const audioFileInput = document.getElementById('audioFileInput');
            const audioFileInfo = document.getElementById('audioFileInfo');
            const audioFileRemoveBtn = document.getElementById('audioFileRemoveBtn');

            // \u70B9\u51FB\u4E0A\u4F20\u533A\u57DF
            audioDropZone.addEventListener('click', function() {
                audioFileInput.click();
            });

            // \u6587\u4EF6\u9009\u62E9
            audioFileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    handleAudioFileSelect(file);
                }
            });

            // \u62D6\u62FD\u529F\u80FD
            audioDropZone.addEventListener('dragover', function(e) {
                e.preventDefault();
                audioDropZone.classList.add('dragover');
            });

            audioDropZone.addEventListener('dragleave', function(e) {
                e.preventDefault();
                audioDropZone.classList.remove('dragover');
            });

            audioDropZone.addEventListener('drop', function(e) {
                e.preventDefault();
                audioDropZone.classList.remove('dragover');
                const file = e.dataTransfer.files[0];
                if (file) {
                    handleAudioFileSelect(file);
                }
            });

            // \u79FB\u9664\u6587\u4EF6
            audioFileRemoveBtn.addEventListener('click', function() {
                selectedAudioFile = null;
                audioFileInput.value = '';
                audioFileInfo.style.display = 'none';
                audioDropZone.style.display = 'block';
            });
        }

        // \u5904\u7406\u97F3\u9891\u6587\u4EF6\u9009\u62E9
        function handleAudioFileSelect(file) {
            // \u9A8C\u8BC1\u6587\u4EF6\u7C7B\u578B
            const allowedTypes = [
                'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/flac', 'audio/aac',
                'audio/ogg', 'audio/webm', 'audio/amr', 'audio/3gpp'
            ];
            
            const isValidType = allowedTypes.some(type => 
                file.type.includes(type) || 
                file.name.toLowerCase().match(/.(mp3|wav|m4a|flac|aac|ogg|webm|amr|3gp)$/i)
            );

            if (!isValidType) {
                alert('\u8BF7\u9009\u62E9\u97F3\u9891\u683C\u5F0F\u7684\u6587\u4EF6\uFF08mp3\u3001wav\u3001m4a\u3001flac\u3001aac\u3001ogg\u3001webm\u3001amr\u30013gp\uFF09');
                return;
            }

            // \u9A8C\u8BC1\u6587\u4EF6\u5927\u5C0F\uFF08\u9650\u5236\u4E3A50MB\uFF09
            if (file.size > 50 * 1024 * 1024) {
                alert('\u97F3\u9891\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC750MB');
                return;
            }

            selectedAudioFile = file;
            
            // \u663E\u793A\u6587\u4EF6\u4FE1\u606F
            document.getElementById('audioFileName').textContent = file.name;
            document.getElementById('audioFileSize').textContent = formatFileSize(file.size);
            document.getElementById('audioFileInfo').style.display = 'flex';
            document.getElementById('audioDropZone').style.display = 'none';
        }

        // \u521D\u59CB\u5316Token\u914D\u7F6E
        function initializeTokenConfig() {
            const tokenRadios = document.querySelectorAll('input[name="tokenOption"]');
            const tokenInput = document.getElementById('tokenInput');

            tokenRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.value === 'custom') {
                        tokenInput.style.display = 'block';
                        tokenInput.required = true;
                    } else {
                        tokenInput.style.display = 'none';
                        tokenInput.required = false;
                        tokenInput.value = '';
                    }
                });
            });
        }

        // \u5904\u7406\u8BED\u97F3\u8F6C\u5F55\u8868\u5355\u63D0\u4EA4
        document.getElementById('transcriptionForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const transcribeBtn = document.getElementById('transcribeBtn');
            const transcriptionResult = document.getElementById('transcriptionResult');
            const transcriptionLoading = document.getElementById('transcriptionLoading');
            const transcriptionSuccess = document.getElementById('transcriptionSuccess');
            const transcriptionError = document.getElementById('transcriptionError');
            
            // \u9A8C\u8BC1\u97F3\u9891\u6587\u4EF6
            if (!selectedAudioFile) {
                alert('\u8BF7\u9009\u62E9\u8981\u8F6C\u5F55\u7684\u97F3\u9891\u6587\u4EF6');
                return;
            }
            
            // \u83B7\u53D6Token\u914D\u7F6E
            const tokenOption = document.querySelector('input[name="tokenOption"]:checked').value;
            const customToken = document.getElementById('tokenInput').value;
            
            if (tokenOption === 'custom' && !customToken.trim()) {
                alert('\u8BF7\u8F93\u5165\u81EA\u5B9A\u4E49Token');
                return;
            }
            
            // \u91CD\u7F6E\u72B6\u6001
            transcriptionResult.style.display = 'block';
            transcriptionLoading.style.display = 'block';
            transcriptionSuccess.style.display = 'none';
            transcriptionError.style.display = 'none';
            transcribeBtn.disabled = true;
            transcribeBtn.textContent = '\u8F6C\u5F55\u4E2D...';
            
            // \u66F4\u65B0\u52A0\u8F7D\u63D0\u793A
            const loadingText = document.getElementById('transcriptionLoadingText');
            const progressInfo = document.getElementById('transcriptionProgressInfo');
            loadingText.textContent = '\u6B63\u5728\u8F6C\u5F55\u97F3\u9891\uFF0C\u8BF7\u7A0D\u5019...';
            progressInfo.textContent = '\u6587\u4EF6: ' + selectedAudioFile.name + ' (' + formatFileSize(selectedAudioFile.size) + ')';
            
            try {
                // \u6784\u5EFAFormData
                const formData = new FormData();
                formData.append('file', selectedAudioFile);
                
                if (tokenOption === 'custom') {
                    formData.append('token', customToken);
                }
                
                const response = await fetch('/v1/audio/transcriptions', {
                    method: 'POST',
                    body: formData
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || '\u8F6C\u5F55\u5931\u8D25');
                }
                
                const result = await response.json();
                
                // \u663E\u793A\u8F6C\u5F55\u7ED3\u679C
                document.getElementById('transcriptionText').value = result.text || '';
                transcriptionLoading.style.display = 'none';
                transcriptionSuccess.style.display = 'block';
                
                // \u663E\u793A\u516C\u4F17\u53F7\u63A8\u5E7F\u7EC4\u4EF6
                setTimeout(() => {
                    const wechatPromotion = document.getElementById('wechatPromotion');
                    wechatPromotion.style.display = 'block';
                    wechatPromotion.classList.add('fade-in');
                }, 1000);
                
            } catch (err) {
                transcriptionLoading.style.display = 'none';
                transcriptionError.style.display = 'block';
                transcriptionError.textContent = '\u9519\u8BEF: ' + err.message;
            } finally {
                transcribeBtn.disabled = false;
                transcribeBtn.innerHTML = '<span>\u{1F3A7}</span><span>\u5F00\u59CB\u8BED\u97F3\u8F6C\u5F55</span>';
            }
        });

        // \u590D\u5236\u8F6C\u5F55\u7ED3\u679C
        document.getElementById('copyTranscriptionBtn').addEventListener('click', function() {
            const transcriptionText = document.getElementById('transcriptionText');
            transcriptionText.select();
            document.execCommand('copy');
            
            // \u4E34\u65F6\u6539\u53D8\u6309\u94AE\u6587\u672C
            const originalText = this.innerHTML;
            this.innerHTML = '<span>\u2705</span><span>\u5DF2\u590D\u5236</span>';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });

        // \u7F16\u8F91\u8F6C\u5F55\u7ED3\u679C
        document.getElementById('editTranscriptionBtn').addEventListener('click', function() {
            const transcriptionText = document.getElementById('transcriptionText');
            const isReadonly = transcriptionText.readOnly;
            
            if (isReadonly) {
                transcriptionText.readOnly = false;
                transcriptionText.focus();
                this.innerHTML = '<span>\u{1F4BE}</span><span>\u4FDD\u5B58\u7F16\u8F91</span>';
            } else {
                transcriptionText.readOnly = true;
                this.innerHTML = '<span>\u270F\uFE0F</span><span>\u7F16\u8F91\u6587\u672C</span>';
            }
        });

        // \u8F6C\u4E3A\u8BED\u97F3\u529F\u80FD
        document.getElementById('useForTtsBtn').addEventListener('click', function() {
            const transcriptionText = document.getElementById('transcriptionText').value;
            
            if (!transcriptionText.trim()) {
                alert('\u8F6C\u5F55\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u8F6C\u6362\u4E3A\u8BED\u97F3');
                return;
            }
            
            // \u5207\u6362\u5230TTS\u6A21\u5F0F
            switchMode('tts');
            
            // \u5C06\u8F6C\u5F55\u6587\u672C\u586B\u5165TTS\u6587\u672C\u6846
            document.getElementById('text').value = transcriptionText;
            
            // \u6EDA\u52A8\u5230TTS\u533A\u57DF
            document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
        });

        // \u521D\u59CB\u5316\u56FD\u9645\u5316
        function initializeI18n() {
            // \u68C0\u67E5\u672C\u5730\u5B58\u50A8\u4E2D\u7684\u8BED\u8A00\u8BBE\u7F6E
            const savedLang = localStorage.getItem('voicecraft-language');
            
            if (savedLang && translations[savedLang]) {
                currentLanguage = savedLang;
            } else {
                // \u81EA\u52A8\u68C0\u6D4B\u6D4F\u89C8\u5668\u8BED\u8A00
                currentLanguage = detectLanguage();
            }
            
            // \u5E94\u7528\u8BED\u8A00\u8BBE\u7F6E
            setLanguage(currentLanguage);
        }

        // \u521D\u59CB\u5316\u8BED\u8A00\u5207\u6362\u5668
        function initializeLanguageSwitcher() {
            const languageBtn = document.getElementById('languageBtn');
            const languageDropdown = document.getElementById('languageDropdown');

            // \u5207\u6362\u4E0B\u62C9\u83DC\u5355\u663E\u793A/\u9690\u85CF
            languageBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                languageDropdown.classList.toggle('show');
            });

            // \u70B9\u51FB\u9875\u9762\u5176\u4ED6\u5730\u65B9\u65F6\u9690\u85CF\u4E0B\u62C9\u83DC\u5355
            document.addEventListener('click', function() {
                languageDropdown.classList.remove('show');
            });

            // \u8BED\u8A00\u9009\u62E9
            document.querySelectorAll('.language-option').forEach(option => {
                option.addEventListener('click', function() {
                    const selectedLang = this.getAttribute('data-lang');
                    setLanguage(selectedLang);
                    languageDropdown.classList.remove('show');
                });
            });
        }
    <\/script>
</body>
</html>
`;
var index_default = {
  async fetch(request, env, ctx) {
    return handleRequest(request);
  }
};
async function handleRequest(request) {
  if (request.method === "OPTIONS") {
    return handleOptions(request);
  }
  const requestUrl = new URL(request.url);
  const path = requestUrl.pathname;
  if (path === "/" || path === "/index.html") {
    return new Response(HTML_PAGE, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        ...makeCORSHeaders()
      }
    });
  }
  if (path === "/v1/audio/transcriptions") {
    try {
      return await handleAudioTranscription(request);
    } catch (error) {
      console.error("Audio transcription error:", error);
      return new Response(JSON.stringify({
        error: {
          message: error.message,
          type: "api_error",
          param: null,
          code: "transcription_error"
        }
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
  }
  if (path === "/v1/audio/speech") {
    try {
      const contentType = request.headers.get("content-type") || "";
      if (contentType.includes("multipart/form-data")) {
        return await handleFileUpload(request);
      }
      const requestBody = await request.json();
      const {
        input,
        voice = "zh-CN-XiaoxiaoNeural",
        speed = "1.0",
        volume = "0",
        pitch = "0",
        style = "general"
      } = requestBody;
      let rate = parseInt(String((parseFloat(speed) - 1) * 100));
      let numVolume = parseInt(String(parseFloat(volume) * 100));
      let numPitch = parseInt(pitch);
      const response = await getVoice(
        input,
        voice,
        rate >= 0 ? `+${rate}%` : `${rate}%`,
        numPitch >= 0 ? `+${numPitch}Hz` : `${numPitch}Hz`,
        numVolume >= 0 ? `+${numVolume}%` : `${numVolume}%`,
        style,
        "audio-24khz-48kbitrate-mono-mp3"
      );
      return response;
    } catch (error) {
      console.error("Error:", error);
      return new Response(JSON.stringify({
        error: {
          message: error.message,
          type: "api_error",
          param: null,
          code: "edge_tts_error"
        }
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
  }
  return new Response("Not Found", { status: 404 });
}
__name(handleRequest, "handleRequest");
async function handleOptions(request) {
  return new Response(null, {
    status: 204,
    headers: {
      ...makeCORSHeaders(),
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers") || "Authorization"
    }
  });
}
__name(handleOptions, "handleOptions");
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
__name(delay, "delay");
function optimizedTextSplit(text, maxChunkSize = 1500) {
  const chunks = [];
  const sentences = text.split(/[。！？\n]/);
  let currentChunk = "";
  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (!trimmedSentence) continue;
    if (trimmedSentence.length > maxChunkSize) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = "";
      }
      for (let i = 0; i < trimmedSentence.length; i += maxChunkSize) {
        chunks.push(trimmedSentence.slice(i, i + maxChunkSize));
      }
    } else if ((currentChunk + trimmedSentence).length > maxChunkSize) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = trimmedSentence;
    } else {
      currentChunk += (currentChunk ? "\u3002" : "") + trimmedSentence;
    }
  }
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  return chunks.filter((chunk) => chunk.length > 0);
}
__name(optimizedTextSplit, "optimizedTextSplit");
async function processBatchedAudioChunks(chunks, voiceName, rate, pitch, volume, style, outputFormat, batchSize = 3, delayMs = 1e3) {
  const audioChunks = [];
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    const batchPromises = batch.map(async (chunk, index) => {
      try {
        if (index > 0) {
          await delay(index * 200);
        }
        return await getAudioChunk(chunk, voiceName, rate, pitch, volume, style, outputFormat);
      } catch (error) {
        console.error(`\u5904\u7406\u97F3\u9891\u5757\u5931\u8D25 (\u6279\u6B21 ${Math.floor(i / batchSize) + 1}, \u5757 ${index + 1}):`, error);
        throw error;
      }
    });
    try {
      const batchResults = await Promise.all(batchPromises);
      audioChunks.push(...batchResults);
      if (i + batchSize < chunks.length) {
        await delay(delayMs);
      }
    } catch (error) {
      console.error(`\u6279\u6B21\u5904\u7406\u5931\u8D25:`, error);
      throw error;
    }
  }
  return audioChunks;
}
__name(processBatchedAudioChunks, "processBatchedAudioChunks");
async function getVoice(text, voiceName = "zh-CN-XiaoxiaoNeural", rate = "+0%", pitch = "+0Hz", volume = "+0%", style = "general", outputFormat = "audio-24khz-48kbitrate-mono-mp3") {
  try {
    const cleanText = text.trim();
    if (!cleanText) {
      throw new Error("\u6587\u672C\u5185\u5BB9\u4E3A\u7A7A");
    }
    if (cleanText.length <= 1500) {
      const audioBlob = await getAudioChunk(cleanText, voiceName, rate, pitch, volume, style, outputFormat);
      return new Response(audioBlob, {
        headers: {
          "Content-Type": "audio/mpeg",
          ...makeCORSHeaders()
        }
      });
    }
    const chunks = optimizedTextSplit(cleanText, 1500);
    if (chunks.length > 40) {
      throw new Error(`\u6587\u672C\u8FC7\u957F\uFF0C\u5206\u5757\u6570\u91CF(${chunks.length})\u8D85\u8FC7\u9650\u5236\u3002\u8BF7\u7F29\u77ED\u6587\u672C\u6216\u5206\u6279\u5904\u7406\u3002`);
    }
    console.log(`\u6587\u672C\u5DF2\u5206\u4E3A ${chunks.length} \u4E2A\u5757\u8FDB\u884C\u5904\u7406`);
    const audioChunks = await processBatchedAudioChunks(
      chunks,
      voiceName,
      rate,
      pitch,
      volume,
      style,
      outputFormat,
      3,
      // 每批处理3个
      800
      // 批次间延迟800ms
    );
    const concatenatedAudio = new Blob(audioChunks, { type: "audio/mpeg" });
    return new Response(concatenatedAudio, {
      headers: {
        "Content-Type": "audio/mpeg",
        ...makeCORSHeaders()
      }
    });
  } catch (error) {
    console.error("\u8BED\u97F3\u5408\u6210\u5931\u8D25:", error);
    return new Response(JSON.stringify({
      error: {
        message: error.message || String(error),
        type: "api_error",
        param: `${voiceName}, ${rate}, ${pitch}, ${volume}, ${style}, ${outputFormat}`,
        code: "edge_tts_error"
      }
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...makeCORSHeaders()
      }
    });
  }
}
__name(getVoice, "getVoice");
async function getAudioChunk(text, voiceName, rate, pitch, volume, style, outputFormat = "audio-24khz-48kbitrate-mono-mp3", maxRetries = 3) {
  const retryDelay = 500;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const endpoint = await getEndpoint();
      const url = `https://${endpoint.r}.tts.speech.microsoft.com/cognitiveservices/v1`;
      let m = text.match(/\[(\d+)\]\s*?$/);
      let slien = 0;
      if (m && m.length == 2) {
        slien = parseInt(m[1]);
        text = text.replace(m[0], "");
      }
      if (!text.trim()) {
        throw new Error("\u6587\u672C\u5757\u4E3A\u7A7A");
      }
      if (text.length > 2e3) {
        throw new Error(`\u6587\u672C\u5757\u8FC7\u957F: ${text.length} \u5B57\u7B26\uFF0C\u6700\u5927\u652F\u63012000\u5B57\u7B26`);
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": endpoint.t,
          "Content-Type": "application/ssml+xml",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0",
          "X-Microsoft-OutputFormat": outputFormat
        },
        body: getSsml(text, voiceName, rate, pitch, volume, style, slien)
      });
      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 429) {
          if (attempt < maxRetries) {
            console.log(`\u9891\u7387\u9650\u5236\uFF0C\u7B2C${attempt + 1}\u6B21\u91CD\u8BD5\uFF0C\u7B49\u5F85${retryDelay * (attempt + 1)}ms`);
            await delay(retryDelay * (attempt + 1));
            continue;
          }
          throw new Error(`\u8BF7\u6C42\u9891\u7387\u8FC7\u9AD8\uFF0C\u5DF2\u91CD\u8BD5${maxRetries}\u6B21\u4ECD\u5931\u8D25`);
        } else if (response.status >= 500) {
          if (attempt < maxRetries) {
            console.log(`\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u7B2C${attempt + 1}\u6B21\u91CD\u8BD5\uFF0C\u7B49\u5F85${retryDelay * (attempt + 1)}ms`);
            await delay(retryDelay * (attempt + 1));
            continue;
          }
          throw new Error(`Edge TTS\u670D\u52A1\u5668\u9519\u8BEF: ${response.status} ${errorText}`);
        } else {
          throw new Error(`Edge TTS API\u9519\u8BEF: ${response.status} ${errorText}`);
        }
      }
      return await response.blob();
    } catch (error) {
      if (attempt === maxRetries) {
        throw new Error(`\u97F3\u9891\u751F\u6210\u5931\u8D25\uFF08\u5DF2\u91CD\u8BD5${maxRetries}\u6B21\uFF09: ${error.message}`);
      }
      if (error.message.includes("fetch") || error.message.includes("network")) {
        console.log(`\u7F51\u7EDC\u9519\u8BEF\uFF0C\u7B2C${attempt + 1}\u6B21\u91CD\u8BD5\uFF0C\u7B49\u5F85${retryDelay * (attempt + 1)}ms`);
        await delay(retryDelay * (attempt + 1));
        continue;
      }
      throw error;
    }
  }
}
__name(getAudioChunk, "getAudioChunk");
function escapeXmlText(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
__name(escapeXmlText, "escapeXmlText");
function getSsml(text, voiceName, rate, pitch, volume, style, slien = 0) {
  const escapedText = escapeXmlText(text);
  let slien_str = "";
  if (slien > 0) {
    slien_str = `<break time="${slien}ms" />`;
  }
  return `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" version="1.0" xml:lang="zh-CN"> 
                <voice name="${voiceName}"> 
                    <mstts:express-as style="${style}"  styledegree="2.0" role="default" > 
                        <prosody rate="${rate}" pitch="${pitch}" volume="${volume}">${escapedText}</prosody> 
                    </mstts:express-as> 
                    ${slien_str}
                </voice> 
            </speak>`;
}
__name(getSsml, "getSsml");
async function getEndpoint() {
  const now = Date.now() / 1e3;
  if (tokenInfo.token && tokenInfo.expiredAt && now < tokenInfo.expiredAt - TOKEN_REFRESH_BEFORE_EXPIRY) {
    return tokenInfo.endpoint;
  }
  const endpointUrl = "https://dev.microsofttranslator.com/apps/endpoint?api-version=1.0";
  const clientId = crypto.randomUUID().replace(/-/g, "");
  try {
    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Accept-Language": "zh-Hans",
        "X-ClientVersion": "4.0.530a 5fe1dc6c",
        "X-UserId": "0f04d16a175c411e",
        "X-HomeGeographicRegion": "zh-Hans-CN",
        "X-ClientTraceId": clientId,
        "X-MT-Signature": await sign(endpointUrl),
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0",
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": "0",
        "Accept-Encoding": "gzip"
      }
    });
    if (!response.ok) {
      throw new Error(`\u83B7\u53D6endpoint\u5931\u8D25: ${response.status}`);
    }
    const data = await response.json();
    const jwt = data.t.split(".")[1];
    const decodedJwt = JSON.parse(atob(jwt));
    tokenInfo = {
      endpoint: data,
      token: data.t,
      expiredAt: decodedJwt.exp
    };
    return data;
  } catch (error) {
    console.error("\u83B7\u53D6endpoint\u5931\u8D25:", error);
    if (tokenInfo.token) {
      console.log("\u4F7F\u7528\u8FC7\u671F\u7684\u7F13\u5B58token");
      return tokenInfo.endpoint;
    }
    throw error;
  }
}
__name(getEndpoint, "getEndpoint");
function makeCORSHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    "Access-Control-Max-Age": "86400"
  };
}
__name(makeCORSHeaders, "makeCORSHeaders");
async function hmacSha256(key, data) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(data));
  return new Uint8Array(signature);
}
__name(hmacSha256, "hmacSha256");
async function base64ToBytes(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
__name(base64ToBytes, "base64ToBytes");
async function bytesToBase64(bytes) {
  return btoa(String.fromCharCode.apply(null, bytes));
}
__name(bytesToBase64, "bytesToBase64");
function uuid() {
  return crypto.randomUUID().replace(/-/g, "");
}
__name(uuid, "uuid");
async function sign(urlStr) {
  const url = urlStr.split("://")[1];
  const encodedUrl = encodeURIComponent(url);
  const uuidStr = uuid();
  const formattedDate = dateFormat();
  const bytesToSign = `MSTranslatorAndroidApp${encodedUrl}${formattedDate}${uuidStr}`.toLowerCase();
  const decode = await base64ToBytes("oik6PdDdMnOXemTbwvMn9de/h9lFnfBaCWbGMMZqqoSaQaqUOqjVGm5NqsmjcBI1x+sS9ugjB55HEJWRiFXYFw==");
  const signData = await hmacSha256(decode, bytesToSign);
  const signBase64 = await bytesToBase64(signData);
  return `MSTranslatorAndroidApp::${signBase64}::${formattedDate}::${uuidStr}`;
}
__name(sign, "sign");
function dateFormat() {
  const formattedDate = (/* @__PURE__ */ new Date()).toUTCString().replace(/GMT/, "").trim() + " GMT";
  return formattedDate.toLowerCase();
}
__name(dateFormat, "dateFormat");
async function handleFileUpload(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const voice = formData.get("voice") || "zh-CN-XiaoxiaoNeural";
    const speed = formData.get("speed") || "1.0";
    const volume = formData.get("volume") || "0";
    const pitch = formData.get("pitch") || "0";
    const style = formData.get("style") || "general";
    if (!file) {
      return new Response(JSON.stringify({
        error: {
          message: "\u672A\u627E\u5230\u4E0A\u4F20\u7684\u6587\u4EF6",
          type: "invalid_request_error",
          param: "file",
          code: "missing_file"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    if (!file.type.includes("text/") && !file.name.toLowerCase().endsWith(".txt")) {
      return new Response(JSON.stringify({
        error: {
          message: "\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B\uFF0C\u8BF7\u4E0A\u4F20txt\u6587\u4EF6",
          type: "invalid_request_error",
          param: "file",
          code: "invalid_file_type"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    if (file.size > 500 * 1024) {
      return new Response(JSON.stringify({
        error: {
          message: "\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC7\u9650\u5236\uFF08\u6700\u5927500KB\uFF09",
          type: "invalid_request_error",
          param: "file",
          code: "file_too_large"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    const text = await file.text();
    if (!text.trim()) {
      return new Response(JSON.stringify({
        error: {
          message: "\u6587\u4EF6\u5185\u5BB9\u4E3A\u7A7A",
          type: "invalid_request_error",
          param: "file",
          code: "empty_file"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    if (text.length > 1e4) {
      return new Response(JSON.stringify({
        error: {
          message: "\u6587\u672C\u5185\u5BB9\u8FC7\u957F\uFF08\u6700\u592710000\u5B57\u7B26\uFF09",
          type: "invalid_request_error",
          param: "file",
          code: "text_too_long"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    let rate = parseInt(String((parseFloat(speed) - 1) * 100));
    let numVolume = parseInt(String(parseFloat(volume) * 100));
    let numPitch = parseInt(pitch);
    return await getVoice(
      text,
      voice,
      rate >= 0 ? `+${rate}%` : `${rate}%`,
      numPitch >= 0 ? `+${numPitch}Hz` : `${numPitch}Hz`,
      numVolume >= 0 ? `+${numVolume}%` : `${numVolume}%`,
      style,
      "audio-24khz-48kbitrate-mono-mp3"
    );
  } catch (error) {
    console.error("\u6587\u4EF6\u4E0A\u4F20\u5904\u7406\u5931\u8D25:", error);
    return new Response(JSON.stringify({
      error: {
        message: "\u6587\u4EF6\u5904\u7406\u5931\u8D25",
        type: "api_error",
        param: null,
        code: "file_processing_error"
      }
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...makeCORSHeaders()
      }
    });
  }
}
__name(handleFileUpload, "handleFileUpload");
async function handleAudioTranscription(request) {
  try {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({
        error: {
          message: "\u53EA\u652F\u6301POST\u65B9\u6CD5",
          type: "invalid_request_error",
          param: "method",
          code: "method_not_allowed"
        }
      }), {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return new Response(JSON.stringify({
        error: {
          message: "\u8BF7\u6C42\u5FC5\u987B\u4F7F\u7528multipart/form-data\u683C\u5F0F",
          type: "invalid_request_error",
          param: "content-type",
          code: "invalid_content_type"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    const formData = await request.formData();
    const audioFile = formData.get("file");
    const customToken = formData.get("token");
    if (!audioFile) {
      return new Response(JSON.stringify({
        error: {
          message: "\u672A\u627E\u5230\u97F3\u9891\u6587\u4EF6",
          type: "invalid_request_error",
          param: "file",
          code: "missing_file"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    if (audioFile.size > 50 * 1024 * 1024) {
      return new Response(JSON.stringify({
        error: {
          message: "\u97F3\u9891\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC750MB",
          type: "invalid_request_error",
          param: "file",
          code: "file_too_large"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    const allowedTypes = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/m4a",
      "audio/flac",
      "audio/aac",
      "audio/ogg",
      "audio/webm",
      "audio/amr",
      "audio/3gpp"
    ];
    const isValidType = allowedTypes.some(
      (type) => audioFile.type.includes(type) || audioFile.name.toLowerCase().match(/\.(mp3|wav|m4a|flac|aac|ogg|webm|amr|3gp)$/i)
    );
    if (!isValidType) {
      return new Response(JSON.stringify({
        error: {
          message: "\u4E0D\u652F\u6301\u7684\u97F3\u9891\u6587\u4EF6\u683C\u5F0F\uFF0C\u8BF7\u4E0A\u4F20mp3\u3001wav\u3001m4a\u3001flac\u3001aac\u3001ogg\u3001webm\u3001amr\u62163gp\u683C\u5F0F\u7684\u6587\u4EF6",
          type: "invalid_request_error",
          param: "file",
          code: "invalid_file_type"
        }
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    const token = customToken || "sk-wtldsvuprmwltxpbspbmawtolbacghzawnjhtlzlnujjkfhh";
    const apiFormData = new FormData();
    apiFormData.append("file", audioFile);
    apiFormData.append("model", "FunAudioLLM/SenseVoiceSmall");
    const apiResponse = await fetch("https://api.siliconflow.cn/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: apiFormData
    });
    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("\u7845\u57FA\u6D41\u52A8API\u9519\u8BEF:", apiResponse.status, errorText);
      let errorMessage = "\u8BED\u97F3\u8F6C\u5F55\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528";
      if (apiResponse.status === 401) {
        errorMessage = "API Token\u65E0\u6548\uFF0C\u8BF7\u68C0\u67E5\u60A8\u7684\u914D\u7F6E";
      } else if (apiResponse.status === 429) {
        errorMessage = "\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5";
      } else if (apiResponse.status === 413) {
        errorMessage = "\u97F3\u9891\u6587\u4EF6\u592A\u5927\uFF0C\u8BF7\u9009\u62E9\u8F83\u5C0F\u7684\u6587\u4EF6";
      }
      return new Response(JSON.stringify({
        error: {
          message: errorMessage,
          type: "api_error",
          param: null,
          code: "transcription_api_error"
        }
      }), {
        status: apiResponse.status,
        headers: {
          "Content-Type": "application/json",
          ...makeCORSHeaders()
        }
      });
    }
    const transcriptionResult = await apiResponse.json();
    return new Response(JSON.stringify(transcriptionResult), {
      headers: {
        "Content-Type": "application/json",
        ...makeCORSHeaders()
      }
    });
  } catch (error) {
    console.error("\u8BED\u97F3\u8F6C\u5F55\u5904\u7406\u5931\u8D25:", error);
    return new Response(JSON.stringify({
      error: {
        message: "\u8BED\u97F3\u8F6C\u5F55\u5904\u7406\u5931\u8D25",
        type: "api_error",
        param: null,
        code: "transcription_processing_error"
      }
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...makeCORSHeaders()
      }
    });
  }
}
__name(handleAudioTranscription, "handleAudioTranscription");
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
