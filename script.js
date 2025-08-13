// 全局变量
let currentChapter = 1;
let exercises = [];
let applications = [];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadExercises();
    loadApplications();
    loadAlgorithmCodes();
});

// 初始化应用
function initializeApp() {
    loadChapter(1);
    updateActiveChapter(1);
}

// 设置事件监听器
function setupEventListeners() {
    // 章节列表点击事件
    document.getElementById('chaptersList').addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const chapter = parseInt(e.target.dataset.chapter);
            loadChapter(chapter);
            updateActiveChapter(chapter);
        }
    });

    // 习题筛选事件
    document.getElementById('chapterFilter').addEventListener('change', filterExercises);
    document.getElementById('difficultyFilter').addEventListener('change', filterExercises);

    // 应用卡片点击事件
    document.querySelectorAll('.app-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.app-card');
            const chapter = card.dataset.chapter;
            showApplicationDetails(chapter);
        });
    });

    // 复制代码按钮事件
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('copy-btn')) {
            copyCode(e.target.dataset.target);
        }
    });

    // 移动端汉堡菜单
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 模态框关闭事件
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    if (modal) {
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// 加载章节内容
function loadChapter(chapterNumber) {
    currentChapter = chapterNumber;
    const chapterDisplay = document.getElementById('chapterDisplay');
    
    const chapterContent = getChapterContent(chapterNumber);
    chapterDisplay.innerHTML = chapterContent;
}

// 获取章节内容
function getChapterContent(chapterNumber) {
    const chapters = {
        1: {
            title: "第一章 排列与组合",
            content: `
                <h3>第一章 排列与组合</h3>
                <p>排列与组合是组合数学的基础，它们研究的是从有限集合中选择元素的不同方式。</p>
                
                <h4>1.1 基本概念</h4>
                <p>排列（Permutation）是指从n个不同元素中取出r个元素，按照一定的顺序排列，称为n个元素中取r个元素的排列。</p>
                <p>组合（Combination）是指从n个不同元素中取出r个元素，不考虑顺序，称为n个元素中取r个元素的组合。</p>
                
                <h4>1.2 排列公式</h4>
                <p>n个元素中取r个元素的排列数：P(n,r) = n!/(n-r)!</p>
                <p>全排列：P(n,n) = n!</p>
                
                <h4>1.3 组合公式</h4>
                <p>n个元素中取r个元素的组合数：C(n,r) = n!/(r!(n-r)!)</p>
                <p>组合数也称为二项式系数，记作C(n,r)或(n r)</p>
                
                <div class="knowledge-points">
                    <h4>知识点总结</h4>
                    <div class="knowledge-item">
                        <h5>1.1 主要内容</h5>
                        <p>排列与组合的基本概念、计算公式、性质及其应用</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>1.2 基本要求</h5>
                        <p>掌握排列与组合的定义，熟练运用相关公式进行计算</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>1.3 重难点</h5>
                        <p>区分排列与组合的概念，理解公式的推导过程，掌握实际应用</p>
                    </div>
                </div>
            `
        },
        2: {
            title: "第二章 二项式定理",
            content: `
                <h3>第二章 二项式定理</h3>
                <p>二项式定理是组合数学中的重要定理，它描述了二项式幂的展开形式。</p>
                
                <h4>2.1 二项式定理</h4>
                <p>(a+b)^n = Σ(k=0 to n) C(n,k) * a^(n-k) * b^k</p>
                <p>其中C(n,k)是组合数，表示从n个元素中取k个元素的组合数。</p>
                
                <h4>2.2 二项式系数的性质</h4>
                <p>1. 对称性：C(n,k) = C(n,n-k)</p>
                <p>2. 递推关系：C(n,k) = C(n-1,k) + C(n-1,k-1)</p>
                <p>3. 求和公式：Σ(k=0 to n) C(n,k) = 2^n</p>
                
                <h4>2.3 应用</h4>
                <p>二项式定理在概率论、统计学、计算机科学等领域有广泛应用。</p>
                
                <div class="knowledge-points">
                    <h4>知识点总结</h4>
                    <div class="knowledge-item">
                        <h5>2.1 主要内容</h5>
                        <p>二项式定理的表述、证明、性质及其应用</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>2.2 基本要求</h5>
                        <p>理解二项式定理，掌握二项式系数的性质</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>2.3 重难点</h5>
                        <p>二项式定理的证明，二项式系数性质的推导</p>
                    </div>
                </div>
            `
        },
        3: {
            title: "第三章 容斥原理",
            content: `
                <h3>第三章 容斥原理</h3>
                <p>容斥原理是解决集合计数问题的重要工具，它通过"加加减减"的方式避免重复计算。</p>
                
                <h4>3.1 基本容斥原理</h4>
                <p>对于两个集合A和B：|A∪B| = |A| + |B| - |A∩B|</p>
                <p>对于三个集合A、B和C：|A∪B∪C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|</p>
                
                <h4>3.2 一般形式</h4>
                <p>对于n个集合A₁, A₂, ..., Aₙ：</p>
                <p>|A₁∪A₂∪...∪Aₙ| = Σ|Aᵢ| - Σ|Aᵢ∩Aⱼ| + Σ|Aᵢ∩Aⱼ∩Aₖ| - ... + (-1)^(n+1)|A₁∩A₂∩...∩Aₙ|</p>
                
                <h4>3.3 应用</h4>
                <p>容斥原理在概率论、数论、图论等领域有重要应用。</p>
                
                <div class="knowledge-points">
                    <h4>知识点总结</h4>
                    <div class="knowledge-item">
                        <h5>3.1 主要内容</h5>
                        <p>容斥原理的基本形式、一般形式及其应用</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>3.2 基本要求</h5>
                        <p>理解容斥原理，能够运用其解决实际问题</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>3.3 重难点</h5>
                        <p>容斥原理的证明，复杂问题的容斥分析</p>
                    </div>
                </div>
            `
        },
        4: {
            title: "第四章 递推关系",
            content: `
                <h3>第四章 递推关系</h3>
                <p>递推关系是描述序列中相邻项之间关系的数学表达式，在算法设计和问题求解中非常重要。</p>
                
                <h4>4.1 递推关系的定义</h4>
                <p>递推关系是指一个序列的第n项与前几项之间的关系式，通常表示为：aₙ = f(aₙ₋₁, aₙ₋₂, ..., aₙ₋ₖ)</p>
                
                <h4>4.2 常见递推关系</h4>
                <p>1. 斐波那契数列：Fₙ = Fₙ₋₁ + Fₙ₋₂</p>
                <p>2. 等差数列：aₙ = aₙ₋₁ + d</p>
                <p>3. 等比数列：aₙ = aₙ₋₁ × r</p>
                
                <h4>4.3 求解方法</h4>
                <p>递推关系的求解方法包括：特征方程法、生成函数法、矩阵法等。</p>
                
                <div class="knowledge-points">
                    <h4>知识点总结</h4>
                    <div class="knowledge-item">
                        <h5>4.1 主要内容</h5>
                        <p>递推关系的定义、分类、求解方法及其应用</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>4.2 基本要求</h5>
                        <p>理解递推关系，掌握常见递推关系的求解方法</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>4.3 重难点</h5>
                        <p>复杂递推关系的求解，递推关系的应用建模</p>
                    </div>
                </div>
            `
        },
        5: {
            title: "第五章 生成函数",
            content: `
                <h3>第五章 生成函数</h3>
                <p>生成函数是处理序列问题的强大工具，它将序列转换为函数形式，便于分析和计算。</p>
                
                <h4>5.1 生成函数的定义</h4>
                <p>对于序列{aₙ}，其生成函数定义为：A(x) = Σ(n=0 to ∞) aₙxⁿ</p>
                
                <h4>5.2 常见生成函数</h4>
                <p>1. 几何级数：1/(1-x) = Σ(n=0 to ∞) xⁿ</p>
                <p>2. 指数生成函数：e^x = Σ(n=0 to ∞) xⁿ/n!</p>
                <p>3. 二项式生成函数：(1+x)^n = Σ(k=0 to n) C(n,k)x^k</p>
                
                <h4>5.3 应用</h4>
                <p>生成函数在组合数学、概率论、算法分析等领域有广泛应用。</p>
                
                <div class="knowledge-points">
                    <h4>知识点总结</h4>
                    <div class="knowledge-item">
                        <h5>5.1 主要内容</h5>
                        <p>生成函数的定义、性质、常见类型及其应用</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>5.2 基本要求</h5>
                        <p>理解生成函数，掌握基本生成函数的性质</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>5.3 重难点</h5>
                        <p>生成函数的运算，复杂问题的生成函数建模</p>
                    </div>
                </div>
            `
        },
        6: {
            title: "第六章 鸽巢原理",
            content: `
                <h3>第六章 鸽巢原理</h3>
                <p>鸽巢原理是组合数学中的基本原理，它描述了将物体放入容器时的必然结果。</p>
                
                <h4>6.1 基本鸽巢原理</h4>
                <p>如果将n+1个物体放入n个容器中，那么至少有一个容器包含至少两个物体。</p>
                
                <h4>6.2 推广形式</h4>
                <p>如果将n个物体放入k个容器中，那么至少有一个容器包含⌈n/k⌉个物体。</p>
                
                <h4>6.3 应用</h4>
                <p>鸽巢原理在数论、图论、算法设计等领域有重要应用。</p>
                
                <div class="knowledge-points">
                    <h4>知识点总结</h4>
                    <div class="knowledge-item">
                        <h5>6.1 主要内容</h5>
                        <p>鸽巢原理的基本形式、推广形式及其应用</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>6.2 基本要求</h5>
                        <p>理解鸽巢原理，能够运用其解决实际问题</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>6.3 重难点</h5>
                        <p>鸽巢原理的巧妙应用，复杂问题的鸽巢分析</p>
                    </div>
                </div>
            `
        },
        7: {
            title: "第七章 图论基础",
            content: `
                <h3>第七章 图论基础</h3>
                <p>图论是研究图及其性质的数学分支，在计算机科学、网络分析等领域有重要应用。</p>
                
                <h4>7.1 图的基本概念</h4>
                <p>图G = (V,E)由顶点集V和边集E组成，边连接顶点对。</p>
                
                <h4>7.2 图的类型</h4>
                <p>1. 无向图：边没有方向</p>
                <p>2. 有向图：边有方向</p>
                <p>3. 加权图：边有权重</p>
                
                <h4>7.3 图的性质</h4>
                <p>度、路径、连通性、树、二分图等基本概念。</p>
                
                <div class="knowledge-points">
                    <h4>知识点总结</h4>
                    <div class="knowledge-item">
                        <h5>7.1 主要内容</h5>
                        <p>图的基本概念、类型、性质及其应用</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>7.2 基本要求</h5>
                        <p>理解图的基本概念，掌握图的基本性质</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>7.3 重难点</h5>
                        <p>图的性质证明，图算法的设计与分析</p>
                    </div>
                </div>
            `
        },
        8: {
            title: "第八章 组合设计",
            content: `
                <h3>第八章 组合设计</h3>
                <p>组合设计研究如何安排元素以满足特定的组合性质，在实验设计、编码理论等领域有应用。</p>
                
                <h4>8.1 拉丁方</h4>
                <p>n×n的方阵，每行每列都包含n个不同元素。</p>
                
                <h4>8.2 平衡不完全区组设计</h4>
                <p>BIBD(v,k,λ)是一种特殊的组合结构。</p>
                
                <h4>8.3 应用</h4>
                <p>在实验设计、统计抽样、编码理论等领域有重要应用。</p>
                
                <div class="knowledge-points">
                    <h4>知识点总结</h4>
                    <div class="knowledge-item">
                        <h5>8.1 主要内容</h5>
                        <p>组合设计的基本概念、类型及其应用</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>8.2 基本要求</h5>
                        <p>理解组合设计，掌握基本设计方法</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>8.3 重难点</h5>
                        <p>复杂组合设计的构造，设计的存在性问题</p>
                    </div>
                </div>
            `
        },
        9: {
            title: "第九章 概率组合",
            content: `
                <h3>第九章 概率组合</h3>
                <p>概率组合结合了概率论和组合数学，研究随机组合结构的性质。</p>
                
                <h4>9.1 随机图</h4>
                <p>Erdős-Rényi随机图模型：G(n,p)模型。</p>
                
                <h4>9.2 随机游走</h4>
                <p>在图上进行的随机游走过程及其性质。</p>
                
                <h4>9.3 应用</h4>
                <p>在社交网络分析、算法分析等领域有重要应用。</p>
                
                <div class="knowledge-points">
                    <h4>知识点总结</h4>
                    <div class="knowledge-item">
                        <h5>9.1 主要内容</h5>
                        <p>概率组合的基本概念、模型及其应用</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>9.2 基本要求</h5>
                        <p>理解概率组合，掌握基本概率模型</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>9.3 重难点</h5>
                        <p>概率模型的分析，随机结构的性质研究</p>
                    </div>
                </div>
            `
        },
        10: {
            title: "第十章 组合优化",
            content: `
                <h3>第十章 组合优化</h3>
                <p>组合优化研究在有限选择中寻找最优解的问题，在实际应用中有重要价值。</p>
                
                <h4>10.1 基本问题</h4>
                <p>1. 旅行商问题（TSP）</p>
                <p>2. 背包问题</p>
                <p>3. 图着色问题</p>
                
                <h4>10.2 求解方法</h4>
                <p>贪心算法、动态规划、分支限界、遗传算法等。</p>
                
                <h4>10.3 应用</h4>
                <p>在物流、生产调度、资源分配等领域有广泛应用。</p>
                
                <div class="knowledge-points">
                    <h4>知识点总结</h4>
                    <div class="knowledge-item">
                        <h5>10.1 主要内容</h5>
                        <p>组合优化的基本问题、求解方法及其应用</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>10.2 基本要求</h5>
                        <p>理解组合优化问题，掌握基本求解方法</p>
                    </div>
                    <div class="knowledge-item">
                        <h5>10.3 重难点</h5>
                        <p>复杂优化问题的建模，高效算法的设计</p>
                    </div>
                </div>
            `
        }
    };
    
    return chapters[chapterNumber] ? chapters[chapterNumber].content : '<h3>章节内容加载中...</h3>';
}

// 更新活动章节
function updateActiveChapter(chapterNumber) {
    // 移除所有活动状态
    document.querySelectorAll('#chaptersList a').forEach(link => {
        link.classList.remove('active');
    });
    
    // 添加当前章节的活动状态
    const currentLink = document.querySelector(`#chaptersList a[data-chapter="${chapterNumber}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
}

// 加载习题数据
function loadExercises() {
    exercises = [
        {
            id: 1,
            chapter: 1,
            title: "排列计算题",
            content: "计算P(5,3)和C(5,3)的值。",
            solution: "P(5,3) = 5!/(5-3)! = 5!/2! = 120/2 = 60\nC(5,3) = 5!/(3!(5-3)!) = 5!/(3!2!) = 120/(6×2) = 10",
            difficulty: "easy"
        },
        {
            id: 2,
            chapter: 1,
            title: "组合应用题",
            content: "从10个人中选出3个人组成委员会，有多少种不同的选法？",
            solution: "这是一个组合问题，C(10,3) = 10!/(3!(10-3)!) = 10!/(3!7!) = 120",
            difficulty: "medium"
        },
        {
            id: 3,
            chapter: 2,
            title: "二项式展开",
            content: "展开(x+2y)^4。",
            solution: "(x+2y)^4 = C(4,0)x^4 + C(4,1)x^3(2y) + C(4,2)x^2(2y)^2 + C(4,3)x(2y)^3 + C(4,4)(2y)^4\n= x^4 + 8x^3y + 24x^2y^2 + 32xy^3 + 16y^4",
            difficulty: "medium"
        },
        {
            id: 4,
            chapter: 4,
            title: "递推关系求解",
            content: "求解递推关系aₙ = 2aₙ₋₁ + 1，a₁ = 1。",
            solution: "特征方程为r = 2，通解为aₙ = A×2ⁿ + B\n由初始条件a₁ = 1，得A = 1/2，B = -1/2\n所以aₙ = 2ⁿ⁻¹ - 1/2",
            difficulty: "hard"
        },
        {
            id: 5,
            chapter: 7,
            title: "图论基础题",
            content: "证明：在任意图中，度数为奇数的顶点个数为偶数。",
            solution: "设图G中所有顶点的度数之和为2E（E为边数）。\n由于每条边贡献2度，所以总度数为偶数。\n奇数度顶点的度数之和为奇数，偶数度顶点的度数之和为偶数。\n要使总度数为偶数，奇数度顶点的个数必须为偶数。",
            difficulty: "hard"
        }
    ];
    
    displayExercises(exercises);
}

// 显示习题
function displayExercises(exercisesToShow) {
    const exercisesList = document.getElementById('exercisesList');
    
    if (exercisesToShow.length === 0) {
        exercisesList.innerHTML = '<p>没有找到符合条件的习题。</p>';
        return;
    }
    
    exercisesList.innerHTML = exercisesToShow.map(exercise => `
        <div class="exercise-item">
            <h4>${exercise.title}</h4>
            <span class="difficulty ${exercise.difficulty}">${getDifficultyText(exercise.difficulty)}</span>
            <p><strong>题目：</strong>${exercise.content}</p>
            <p><strong>解答：</strong>${exercise.solution}</p>
        </div>
    `).join('');
}

// 筛选习题
function filterExercises() {
    const chapterFilter = document.getElementById('chapterFilter').value;
    const difficultyFilter = document.getElementById('difficultyFilter').value;
    
    let filteredExercises = exercises;
    
    if (chapterFilter) {
        filteredExercises = filteredExercises.filter(ex => ex.chapter == chapterFilter);
    }
    
    if (difficultyFilter) {
        filteredExercises = filteredExercises.filter(ex => ex.difficulty === difficultyFilter);
    }
    
    displayExercises(filteredExercises);
}

// 获取难度文本
function getDifficultyText(difficulty) {
    const difficultyMap = {
        'easy': '简单',
        'medium': '中等',
        'hard': '困难'
    };
    return difficultyMap[difficulty] || difficulty;
}

// 加载应用数据
function loadApplications() {
    applications = {
        1: {
            title: "排列组合在密码学中的应用",
            content: `
                <h3>排列组合在密码学中的应用</h3>
                <p>排列组合在密码学中有着广泛的应用，特别是在密码的生成和分析方面。</p>
                
                <h4>主要应用领域：</h4>
                <ul>
                    <li><strong>密码生成：</strong>通过排列组合生成强密码</li>
                    <li><strong>密钥空间计算：</strong>计算密码系统的安全性</li>
                    <li><strong>密码破解：</strong>分析密码的破解难度</li>
                </ul>
                
                <h4>实际例子：</h4>
                <p>一个8位数字密码，如果每位可以是0-9中的任意数字，那么总的可能组合数为10^8 = 100,000,000种。</p>
                <p>如果密码还包含大小写字母和特殊字符，那么安全性会大大提高。</p>
            `
        },
        4: {
            title: "递推关系在算法设计中的应用",
            content: `
                <h3>递推关系在算法设计中的应用</h3>
                <p>递推关系是算法设计中的核心概念，特别是在动态规划算法中。</p>
                
                <h4>主要应用领域：</h4>
                <ul>
                    <li><strong>动态规划：</strong>斐波那契数列、背包问题等</li>
                    <li><strong>分治算法：</strong>归并排序、快速排序等</li>
                    <li><strong>图算法：</strong>最短路径、最小生成树等</li>
                </ul>
                
                <h4>实际例子：</h4>
                <p>斐波那契数列的递推关系F(n) = F(n-1) + F(n-2)在计算机科学中用于：</p>
                <ul>
                    <li>算法复杂度分析</li>
                    <li>数据结构设计</li>
                    <li>递归算法优化</li>
                </ul>
            `
        },
        7: {
            title: "图论在网络分析中的应用",
            content: `
                <h3>图论在网络分析中的应用</h3>
                <p>图论为网络分析提供了强大的数学工具，能够帮助我们理解和优化各种网络系统。</p>
                
                <h4>主要应用领域：</h4>
                <ul>
                    <li><strong>社交网络：</strong>分析用户关系、影响力传播</li>
                    <li><strong>交通网络：</strong>路径规划、流量优化</li>
                    <li><strong>通信网络：</strong>网络拓扑设计、故障分析</li>
                </ul>
                
                <h4>实际例子：</h4>
                <p>在社交网络中，我们可以使用图论来分析：</p>
                <ul>
                    <li>用户之间的连接关系</li>
                    <li>信息传播的路径</li>
                    <li>网络中的关键节点</li>
                </ul>
            `
        },
        10: {
            title: "组合优化在物流中的应用",
            content: `
                <h3>组合优化在物流中的应用</h3>
                <p>组合优化在物流领域有着广泛的应用，能够显著提高物流效率和降低成本。</p>
                
                <h4>主要应用领域：</h4>
                <ul>
                    <li><strong>路径优化：</strong>旅行商问题、车辆路径问题</li>
                    <li><strong>装载优化：</strong>背包问题、装箱问题</li>
                    <li><strong>调度优化：</strong>生产调度、任务分配</li>
                </ul>
                
                <h4>实际例子：</h4>
                <p>在快递配送中，我们需要解决：</p>
                <ul>
                    <li>多辆车的路径规划</li>
                    <li>包裹的装载优化</li>
                    <li>配送时间的合理安排</li>
                </ul>
            `
        }
    };
}

// 显示应用详情
function showApplicationDetails(chapter) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    if (applications[chapter]) {
        modalBody.innerHTML = applications[chapter].content;
        modal.style.display = 'block';
    }
}

// 加载算法代码
function loadAlgorithmCodes() {
    // 全排列算法
    document.getElementById('permutationCode').textContent = `// 全排列算法 - 递归实现
function generatePermutations(arr) {
    if (arr.length <= 1) return [arr];
    
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
        const perms = generatePermutations(remaining);
        
        for (let perm of perms) {
            result.push([current, ...perm]);
        }
    }
    return result;
}

// 使用示例
const arr = [1, 2, 3];
const perms = generatePermutations(arr);
console.log(perms); // [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]`;

    // 组合生成算法
    document.getElementById('combinationCode').textContent = `// 组合生成算法 - 递归实现
function generateCombinations(arr, k) {
    if (k === 0) return [[]];
    if (arr.length === 0) return [];
    
    const [first, ...rest] = arr;
    const combsWithoutFirst = generateCombinations(rest, k);
    const combsWithFirst = generateCombinations(rest, k - 1).map(comb => [first, ...comb]);
    
    return [...combsWithoutFirst, ...combsWithFirst];
}

// 使用示例
const arr = [1, 2, 3, 4];
const combs = generateCombinations(arr, 2);
console.log(combs); // [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]`;

    // 斐波那契数列算法
    document.getElementById('fibonacciCode').textContent = `// 斐波那契数列算法 - 多种实现方式

// 1. 递归实现（简单但效率低）
function fibonacciRecursive(n) {
    if (n <= 1) return n;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// 2. 动态规划实现（高效）
function fibonacciDP(n) {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// 3. 空间优化实现
function fibonacciOptimized(n) {
    if (n <= 1) return n;
    
    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) {
        [prev, curr] = [curr, prev + curr];
    }
    
    return curr;
}

// 使用示例
console.log(fibonacciDP(10)); // 55`;

    // 动态规划算法
    document.getElementById('dpCode').textContent = `// 动态规划算法示例 - 背包问题

// 0-1背包问题：给定物品的重量和价值，在背包容量限制下选择物品使总价值最大
function knapsack01(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                // 可以选择放入或不放入第i个物品
                dp[i][w] = Math.max(
                    dp[i - 1][w], // 不放入
                    dp[i - 1][w - weights[i - 1]] + values[i - 1] // 放入
                );
            } else {
                // 第i个物品太重，无法放入
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}

// 使用示例
const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 6];
const capacity = 10;
const maxValue = knapsack01(weights, values, capacity);
console.log('最大价值:', maxValue); // 最大价值: 10`;
}

// 复制代码功能
function copyCode(targetId) {
    const codeElement = document.getElementById(targetId);
    if (codeElement) {
        const text = codeElement.textContent;
        
        // 创建临时文本区域
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        
        // 选择并复制文本
        textArea.select();
        document.execCommand('copy');
        
        // 移除临时元素
        document.body.removeChild(textArea);
        
        // 显示复制成功提示
        const button = document.querySelector(`[data-target="${targetId}"]`);
        const originalText = button.textContent;
        button.textContent = '已复制！';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#667eea';
        }, 2000);
    }
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 