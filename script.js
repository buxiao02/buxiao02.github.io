/*
 * Bu Xiao 个人网站 - JavaScript 交互功能
 * 功能：主题切换、滚动动画、导航菜单、AI 彩蛋
 */

// 等待 DOM 加载完毕
document.addEventListener('DOMContentLoaded', () => {
    // ===== 主题切换功能 =====
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // 从 localStorage 读取主题设置，或检测系统偏好
    const getStoredTheme = () => localStorage.getItem('theme');
    const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    // 设置主题
    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // 初始化主题
    const initTheme = () => {
        const storedTheme = getStoredTheme();
        const systemTheme = getSystemTheme();
        const theme = storedTheme || systemTheme;
        setTheme(theme);
    };

    // 切换主题
    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    // 监听主题切换按钮点击
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // 仅在用户未手动设置主题时跟随系统
        if (!getStoredTheme()) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ===== 滚动动画 (Fade-in up 效果) =====
    const fadeElements = document.querySelectorAll('.fade-in');

    const checkFadeIn = () => {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;

        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerPoint) {
                element.classList.add('visible');
            }
        });
    };

    // 初始化时检查一次，然后监听滚动
    checkFadeIn();
    window.addEventListener('scroll', checkFadeIn);

    // ===== 滚动效果增强 =====
    // 1. 滚动进度条
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        const updateScrollProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        };

        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress(); // 初始化
    }

    // 2. 视差滚动效果
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.scrollY;

            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax-speed') || '0.5');
                const offset = scrolled * speed * 0.1;
                element.style.transform = `translateY(${offset}px)`;
            });

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll);
        updateParallax(); // 初始化
    }

    // 3. 平滑滚动增强
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // 如果是空链接或非锚点链接，不处理
            if (href === '#' || href === '') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();

                // 计算目标位置（考虑固定导航栏高度）
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                // 使用平滑滚动，添加缓动函数
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== 移动端导航菜单 =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // 切换汉堡菜单动画
            const hamburger = navToggle.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.toggle('active');
            }
        });

        // 点击导航链接后关闭菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (navToggle.querySelector('.hamburger')) {
                    navToggle.querySelector('.hamburger').classList.remove('active');
                }
            });
        });

        // 点击页面其他区域关闭菜单
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                if (navToggle.querySelector('.hamburger')) {
                    navToggle.querySelector('.hamburger').classList.remove('active');
                }
            }
        });
    }

    // ===== 页面加载动画 =====
    // 添加加载完成后的淡入效果
    setTimeout(() => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    }, 100);

    // ===== 控制台彩蛋 (开发者福利) =====
    console.log(
        `%c 🍔 板烧鸡腿堡 %c\n` +
        `你好开发者！这个网站采用纯 HTML/CSS/JS 构建，设计灵感来自 Apple 极简美学。\n` +
        `如果你对代码感兴趣，欢迎查看 GitHub 仓库：https://github.com/你的用户名/你的仓库\n` +
        `保持好奇，保持探索！\n`,
        'background: linear-gradient(135deg, #8a6cff, #a892ff); color: white; padding: 5px 15px; border-radius: 5px; font-weight: bold;',
        'color: #8a6cff;'
    );

    // ===== 技能进度条动画 =====
    const animateSkillProgress = () => {
        const skillProgresses = document.querySelectorAll('.skill-progress');

        skillProgresses.forEach(progress => {
            // 重置宽度为0
            const originalWidth = progress.style.width;
            progress.style.width = '0%';

            // 延迟后动画到目标宽度
            setTimeout(() => {
                progress.style.transition = 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                progress.style.width = originalWidth;
            }, 300);
        });
    };

    // 当技能卡片进入视口时触发动画
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillProgress();
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillCards.forEach(card => {
            skillObserver.observe(card);
        });
    }

    // ===== 技术栈标签交互增强 =====
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const level = tag.getAttribute('data-level');
            let levelText = '';
            switch(level) {
                case 'expert': levelText = '精通'; break;
                case 'advanced': levelText = '熟练'; break;
                case 'intermediate': levelText = '掌握'; break;
                default: levelText = '了解';
            }

            // 创建工具提示
            const tooltip = document.createElement('div');
            tooltip.className = 'tech-tooltip';
            tooltip.textContent = levelText;
            tooltip.style.position = 'absolute';
            tooltip.style.bottom = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.background = 'var(--color-surface)';
            tooltip.style.border = '1px solid var(--color-border)';
            tooltip.style.borderRadius = 'var(--border-radius-sm)';
            tooltip.style.padding = 'var(--spacing-xs) var(--spacing-sm)';
            tooltip.style.fontSize = 'var(--font-size-xs)';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.zIndex = '1000';
            tooltip.style.boxShadow = '0 2px 8px var(--color-shadow)';

            tag.style.position = 'relative';
            tag.appendChild(tooltip);
        });

        tag.addEventListener('mouseleave', () => {
            const tooltip = tag.querySelector('.tech-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // 初始化主题
    initTheme();
});

// 监听窗口大小变化，重新计算 fade-in 元素位置
window.addEventListener('resize', () => {
    const checkFadeIn = () => {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;

        document.querySelectorAll('.fade-in').forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerPoint) {
                element.classList.add('visible');
            }
        });
    };

    // 防抖处理
    let resizeTimer;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(checkFadeIn, 100);
});