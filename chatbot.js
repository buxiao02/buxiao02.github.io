/*
 * AI 聊天机器人 - 板烧鸡腿堡
 * 功能：基于规则的对话系统，支持预设话题
 */

document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    if (!chatInput || !chatSendBtn || !chatMessages) return;

    // ===== 对话历史管理 =====
    const STORAGE_KEY = 'ai-chat-history';
    const MAX_HISTORY = 50;

    const getChatHistory = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    };

    const saveChatHistory = (history) => {
        try {
            // 限制历史记录数量
            const limitedHistory = history.slice(-MAX_HISTORY);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
        } catch (e) {
            console.warn('无法保存聊天历史到 localStorage');
        }
    };

    const addToHistory = (message) => {
        const history = getChatHistory();
        history.push({
            ...message,
            timestamp: new Date().toISOString()
        });
        saveChatHistory(history);
    };

    // ===== 消息显示 =====
    const addMessage = (text, isUser = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = '刚刚';

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        chatMessages.appendChild(messageDiv);

        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 保存到历史记录
        addToHistory({
            text,
            isUser
        });
    };

    // ===== 聊天机器人回复逻辑 =====
    const getBotResponse = (userMessage) => {
        const message = userMessage.toLowerCase().trim();

        // 问候类
        if (message.includes('你好') || message.includes('hi') || message.includes('hello') || message.includes('嗨')) {
            return '你好！我是板烧鸡腿堡，一个AI助手。有什么关于AI、技术或这个网站的问题吗？';
        }

        // 关于AI
        if (message.includes('ai') || message.includes('人工智能') || message.includes('机器学习')) {
            const aiResponses = [
                'AI正在改变世界！从语言模型到计算机视觉，技术的进步令人兴奋。',
                '我认为AI不仅是工具，更是人类认知的延伸。',
                '你最近在使用什么AI工具？我很乐意分享我的使用经验。',
                'AI的伦理和安全性是当前最重要的议题之一。'
            ];
            return aiResponses[Math.floor(Math.random() * aiResponses.length)];
        }

        // 关于网站
        if (message.includes('网站') || message.includes('site') || message.includes('设计')) {
            return '这个网站采用Apple极简风格设计，使用纯HTML/CSS/JS构建。你喜欢这种风格吗？';
        }

        // 关于Bu Xiao
        if (message.includes('bu xiao') || message.includes('作者') || message.includes('你主人')) {
            return 'Bu Xiao是一位AI训练师和AGI探索者，从智驾内训师转型到AI领域。他对AI的未来充满热情！';
        }

        // 关于技能
        if (message.includes('技能') || message.includes('技术') || message.includes('能力')) {
            return 'Bu Xiao擅长AI模型训练、提示工程、前端开发和UI/UX设计。你可以在网站的"技能专长"版块了解更多。';
        }

        // 关于项目
        if (message.includes('项目') || message.includes('project') || message.includes('作品')) {
            return '目前有"本地大模型接入Telegram"、"AI短视频内容生成矩阵"等项目。你可以在"AI实验室"查看详情。';
        }

        // 关于未来
        if (message.includes('未来') || message.includes('future') || message.includes('发展')) {
            return '我认为AI会越来越个性化，成为每个人的智能伙伴。你期待什么样的AI未来？';
        }

        // 关于聊天机器人
        if (message.includes('聊天') || message.includes('chat') || message.includes('对话')) {
            return '我是一个基于规则的聊天机器人，虽然功能简单，但很乐意和你交流！';
        }

        // 感谢类
        if (message.includes('谢谢') || message.includes('感谢') || message.includes('thanks')) {
            return '不客气！很高兴能帮助你。还有什么想了解的吗？';
        }

        // 默认回复
        const defaultResponses = [
            '很有趣的话题！能多告诉我一些你的想法吗？',
            '我对这个话题很感兴趣，但我的知识有限。你可以问问关于AI、技术或这个网站的问题。',
            '这个问题很有深度！作为一个简单的AI，我可能无法给出完美的答案，但很乐意和你探讨。',
            '我还在学习中呢！你可以查看网站上的内容，那里有更多详细的信息。',
            '嗯...让我想想。你还有其他问题吗？',
            '这个问题让我想到了AI的无限可能性！你对AI的哪个方面最感兴趣？'
        ];
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };

    // ===== 发送消息 =====
    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (!message) return;

        // 添加用户消息
        addMessage(message, true);

        // 清空输入框
        chatInput.value = '';

        // 模拟思考延迟
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, false);
        }, 500 + Math.random() * 500); // 随机延迟，更自然
    };

    // ===== 事件监听 =====
    chatSendBtn.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // ===== 加载历史记录 =====
    const loadChatHistory = () => {
        const history = getChatHistory();

        // 清空现有消息（除了初始消息）
        const initialMessage = chatMessages.querySelector('.bot-message');
        chatMessages.innerHTML = '';
        if (initialMessage) {
            chatMessages.appendChild(initialMessage);
        }

        // 加载历史记录
        history.forEach(item => {
            addMessage(item.text, item.isUser);
        });
    };

    // 初始化时加载历史记录
    loadChatHistory();

    // ===== 快捷问题按钮 =====
    const createQuickQuestions = () => {
        const quickQuestions = [
            '介绍一下Bu Xiao',
            '这个网站用了什么技术？',
            'AI的未来会怎样？',
            '你有什么功能？'
        ];

        const quickQuestionsContainer = document.createElement('div');
        quickQuestionsContainer.className = 'quick-questions';
        quickQuestionsContainer.style.marginTop = 'var(--spacing-sm)';
        quickQuestionsContainer.style.display = 'flex';
        quickQuestionsContainer.style.flexWrap = 'wrap';
        quickQuestionsContainer.style.gap = 'var(--spacing-xs)';

        quickQuestions.forEach(question => {
            const btn = document.createElement('button');
            btn.className = 'quick-question-btn';
            btn.textContent = question;
            btn.style.padding = 'var(--spacing-xs) var(--spacing-sm)';
            btn.style.fontSize = 'var(--font-size-xs)';
            btn.style.background = 'var(--color-surface-secondary)';
            btn.style.border = '1px solid var(--color-border)';
            btn.style.borderRadius = 'var(--border-radius-md)';
            btn.style.cursor = 'pointer';
            btn.style.transition = 'all 0.2s ease';

            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'var(--color-surface)';
                btn.style.borderColor = 'var(--color-accent)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'var(--color-surface-secondary)';
                btn.style.borderColor = 'var(--color-border)';
            });

            btn.addEventListener('click', () => {
                chatInput.value = question;
                sendMessage();
            });

            quickQuestionsContainer.appendChild(btn);
        });

        // 添加到聊天界面
        const chatInterface = document.querySelector('.chat-interface');
        if (chatInterface) {
            const chatInputContainer = chatInterface.querySelector('.chat-input');
            if (chatInputContainer) {
                chatInterface.insertBefore(quickQuestionsContainer, chatInputContainer);
            }
        }
    };

    // 延迟创建快捷问题，确保界面已加载
    setTimeout(createQuickQuestions, 500);

    // ===== 清空聊天记录功能 =====
    const createClearButton = () => {
        const clearBtn = document.createElement('button');
        clearBtn.className = 'chat-clear-btn';
        clearBtn.textContent = '清空记录';
        clearBtn.style.position = 'absolute';
        clearBtn.style.top = 'var(--spacing-sm)';
        clearBtn.style.right = 'var(--spacing-sm)';
        clearBtn.style.padding = 'var(--spacing-xs) var(--spacing-sm)';
        clearBtn.style.fontSize = 'var(--font-size-xs)';
        clearBtn.style.background = 'transparent';
        clearBtn.style.border = '1px solid var(--color-border)';
        clearBtn.style.borderRadius = 'var(--border-radius-md)';
        clearBtn.style.cursor = 'pointer';
        clearBtn.style.color = 'var(--color-text-secondary)';

        clearBtn.addEventListener('click', () => {
            if (confirm('确定要清空所有聊天记录吗？')) {
                localStorage.removeItem(STORAGE_KEY);
                loadChatHistory();
            }
        });

        // 添加到聊天消息区域
        chatMessages.style.position = 'relative';
        chatMessages.appendChild(clearBtn);
    };

    // 延迟创建清空按钮
    setTimeout(createClearButton, 500);

    // ===== 控制台提示 =====
    console.log(
        `%c 💬 AI 聊天机器人 %c\n` +
        `聊天机器人已加载！支持话题：AI、技术、网站介绍、个人背景等。\n` +
        `聊天历史已自动保存到 localStorage。\n`,
        'background: linear-gradient(135deg, #8a6cff, #a892ff); color: white; padding: 5px 15px; border-radius: 5px; font-weight: bold;',
        'color: #8a6cff;'
    );
});