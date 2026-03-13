/*
 * AI 智能工具栏 - 拖拽与状态管理
 * 功能：可拖动工具栏、展开/收起、功能按钮
 */

document.addEventListener('DOMContentLoaded', () => {
    const toolbar = document.getElementById('ai-toolbar');
    const toolbarHeader = document.getElementById('toolbar-header');
    const toggleBtn = document.querySelector('.toolbar-toggle');
    const closeBtn = document.querySelector('.toolbar-close');
    const chatToggleBtn = document.querySelector('[data-action="chat-toggle"]');
    const chatInterface = document.getElementById('chat-interface');
    const themeToggleBtn = document.querySelector('[data-action="theme-toggle"]');
    const scrollTopBtn = document.querySelector('[data-action="scroll-top"]');
    const shareBtn = document.querySelector('[data-action="share"]');

    if (!toolbar || !toolbarHeader) return;

    // ===== 工具栏状态管理 =====
    const STORAGE_KEY = 'ai-toolbar-state';

    const getStoredState = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    };

    const saveState = (state) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('无法保存工具栏状态到 localStorage');
        }
    };

    // ===== 拖拽功能 =====
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let startX = 0;
    let startY = 0;

    const startDrag = (e) => {
        isDragging = true;

        // 获取鼠标位置
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        // 获取工具栏位置
        const rect = toolbar.getBoundingClientRect();
        startX = rect.left;
        startY = rect.top;

        // 计算偏移量
        dragOffsetX = clientX - startX;
        dragOffsetY = clientY - startY;

        // 添加拖拽样式
        toolbar.style.transition = 'none';
        toolbarHeader.style.cursor = 'grabbing';

        // 阻止文本选择
        e.preventDefault();
    };

    const doDrag = (e) => {
        if (!isDragging) return;

        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        if (!clientX || !clientY) return;

        // 计算新位置
        let newX = clientX - dragOffsetX;
        let newY = clientY - dragOffsetY;

        // 边界检测 - 防止拖出视口
        const toolbarWidth = toolbar.offsetWidth;
        const toolbarHeight = toolbar.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // 限制在视口内
        newX = Math.max(0, Math.min(newX, windowWidth - toolbarWidth));
        newY = Math.max(0, Math.min(newY, windowHeight - toolbarHeight));

        // 应用新位置
        toolbar.style.left = `${newX}px`;
        toolbar.style.top = `${newY}px`;
    };

    const stopDrag = () => {
        if (!isDragging) return;

        isDragging = false;
        toolbar.style.transition = 'all 0.3s ease';
        toolbarHeader.style.cursor = 'grab';

        // 保存位置
        const rect = toolbar.getBoundingClientRect();
        const state = getStoredState() || {};
        state.position = {
            x: rect.left,
            y: rect.top
        };
        saveState(state);
    };

    // 添加拖拽事件监听器
    toolbarHeader.addEventListener('mousedown', startDrag);
    toolbarHeader.addEventListener('touchstart', startDrag, { passive: false });

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('touchmove', doDrag, { passive: false });

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);

    // ===== 展开/收起功能 =====
    const toggleToolbar = () => {
        toolbar.classList.toggle('collapsed');

        // 保存状态
        const state = getStoredState() || {};
        state.collapsed = toolbar.classList.contains('collapsed');
        saveState(state);

        // 更新图标
        const toggleIcon = toggleBtn.querySelector('.toggle-icon');
        if (toggleIcon) {
            toggleIcon.textContent = toolbar.classList.contains('collapsed') ? '▶' : '▼';
        }
    };

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleToolbar);
    }

    // ===== 关闭功能 =====
    const closeToolbar = () => {
        toolbar.style.display = 'none';

        // 保存状态
        const state = getStoredState() || {};
        state.visible = false;
        saveState(state);
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeToolbar);
    }

    // ===== 功能按钮 =====
    // 主题切换
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.click();
            }
        });
    }

    // 回到顶部
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 分享功能
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'Bu Xiao | AI 训练师 / AGI 探索者',
                    text: '探索 AI 与人类认知的边界',
                    url: window.location.href
                }).catch(console.error);
            } else {
                // 降级方案：复制链接到剪贴板
                navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                        alert('链接已复制到剪贴板！');
                    })
                    .catch(() => {
                        prompt('请手动复制链接：', window.location.href);
                    });
            }
        });
    }

    // 聊天界面切换
    if (chatToggleBtn && chatInterface) {
        chatToggleBtn.addEventListener('click', () => {
            chatInterface.classList.toggle('active');

            // 更新按钮文本
            const btnText = chatToggleBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = chatInterface.classList.contains('active') ? '关闭' : '聊天';
            }
        });
    }

    // ===== 初始化状态 =====
    const initToolbar = () => {
        const state = getStoredState();

        if (state) {
            // 恢复位置
            if (state.position) {
                toolbar.style.left = `${state.position.x}px`;
                toolbar.style.top = `${state.position.y}px`;
            }

            // 恢复展开/收起状态
            if (state.collapsed) {
                toolbar.classList.add('collapsed');
                const toggleIcon = toggleBtn?.querySelector('.toggle-icon');
                if (toggleIcon) {
                    toggleIcon.textContent = '▶';
                }
            }

            // 恢复可见性
            if (state.visible === false) {
                toolbar.style.display = 'none';
            }
        }

        // 设置初始位置（如果没有保存的位置）
        if (!toolbar.style.left && !toolbar.style.top) {
            const rect = toolbar.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // 默认位置：右下角
            const defaultX = windowWidth - rect.width - 20;
            const defaultY = windowHeight - rect.height - 20;

            toolbar.style.left = `${defaultX}px`;
            toolbar.style.top = `${defaultY}px`;
        }
    };

    // 延迟初始化，确保样式已加载
    setTimeout(initToolbar, 100);

    // ===== 窗口大小变化时调整位置 =====
    window.addEventListener('resize', () => {
        const rect = toolbar.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // 如果工具栏在视口外，调整到可见位置
        if (rect.right > windowWidth || rect.bottom > windowHeight) {
            const newX = Math.max(0, Math.min(rect.left, windowWidth - rect.width));
            const newY = Math.max(0, Math.min(rect.top, windowHeight - rect.height));

            toolbar.style.left = `${newX}px`;
            toolbar.style.top = `${newY}px`;

            // 保存新位置
            const state = getStoredState() || {};
            state.position = { x: newX, y: newY };
            saveState(state);
        }
    });

    // ===== 控制台提示 =====
    console.log(
        `%c 🍔 AI 工具栏 %c\n` +
        `工具栏已加载！你可以拖拽标题栏移动位置，点击按钮使用功能。\n` +
        `状态已自动保存到 localStorage。\n`,
        'background: linear-gradient(135deg, #8a6cff, #a892ff); color: white; padding: 5px 15px; border-radius: 5px; font-weight: bold;',
        'color: #8a6cff;'
    );
});