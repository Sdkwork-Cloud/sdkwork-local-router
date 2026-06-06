import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-api-credits-ultra',
    name: 'ModelKit API 高速智能充值包',
    type: 'virtual',
    category: 'api-credits',
    price: 199,
    originalPrice: 299,
    badge: '今日推荐',
    merchantName: 'ModelKit 官方自营',
    description: '支持主流全模型矩阵（GPT-4o/Claude/Gemini/DeepSeek）加速包，尊享优先专线队列，大QPS不降速。',
    longDescription: '为您生产级开发与高负荷大模型微调、通信测试和路由吞吐量模拟提供绝佳保障。此款极速接口余额卡包将直接向您发放加密通兑券码，在 App 秘钥管理中心激活后可无障碍覆盖全网高级模型，绕过服务商原发限流。',
    imageUrl: '🏷️',
    features: [
      '涵盖丰富输入输出混合 Token 容量，高性价比',
      '极低公网时延（直连节点自适应线路）',
      '优先于普通账号分发至备选 API 路由',
      '券码 100% 独立非公开生产，不可逆解密防伪保障',
      '全局可用，支持在任意热插拔 MCP 节点中代付 token 成本'
    ],
    specs: {
      '产品类别': '智能网络充值 / 虚拟通兑',
      '适用模型': '全模型通用矩阵',
      '兑换时效': '购买后 2 年内首批激活有效',
      '并发限制': '最高 80 QPS 加速'
    },
    skus: [
      { id: 'sku-api-300m', name: '3 亿混合流量包 (轻量试用)', price: 199, originalPrice: 299, stock: 994 },
      { id: 'sku-api-850m', name: '8.5 亿混合充值包 (核心主力)', price: 499, originalPrice: 799, stock: 450 },
      { id: 'sku-api-2b', name: '20 亿混合极客包 (企业/长周期)', price: 999, originalPrice: 1599, stock: 120 }
    ],
    couponFormat: 'MK-API-CRED-XXXX-XXXX-XXXX',
    sellerName: 'ModelKit 官方极客角',
    sellerAvatar: '🏢',
    sellerCredit: '官方天猫 950 极高信用',
    location: '杭州·阿里中心',
    condition: '一键交付',
    views: 24500,
    wants: 1890,
    comments: [
      {
        id: 'c1',
        user: '@copilot_coder',
        avatar: '🐙',
        time: '3小时前',
        question: '这个是实时充值到账吗？在国外节点能用不？',
        reply: {
          user: 'ModelKit 官方极客角',
          time: '2.5小时前',
          answer: '自营商品，下单后自动2秒在右侧订单区发券，支持全球多节点直连代理，去凭证管理页面热装载即可。'
        }
      }
    ]
  },
  {
    id: 'prod-cot-thinking',
    name: 'DeepReasoning 思维链推理算力包',
    type: 'virtual',
    category: 'api-credits',
    price: 99,
    badge: '爆品算力',
    merchantName: '算力源头供应链',
    description: '助力复杂代码重构与前沿架构模型深度拆解，提供长逻辑思考树 (CoT) 算力独立挂池。',
    longDescription: '高级思维链及高耗能推理专用的额度卡。极速释放 OpenAI o3-mini (xhigh), Claude 3.5 Sonnet 思维逻辑拆析, 针对极其难啃的逆向分析、内存安全校验与高精度并发锁检测提供强大的底层推理步骤池结算。',
    imageUrl: '🧠',
    features: [
      '精细化推理耗能单列：不与普通 API 费率混合扣减',
      '支持激活多步思考推理节点的可视化 logic 折回路径',
      '对大规模复杂并发业务代码的逆向建模极佳',
      '高保真防丢单，即使连接异常也会回滚步骤扣费'
    ],
    specs: {
      '产品类别': '复杂思维链推理券 (CoT Voucher)',
      '算力载体': 'H100 推理物理算力集群',
      '发放机制': '生成唯一验证码，支持秒级热插拔对齐'
    },
    skus: [
      { id: 'sku-cot-15m', name: '1500 万思维推理步骤 (初体验)', price: 99, originalPrice: 129, stock: 873 },
      { id: 'sku-cot-50m', name: '5000 万思维推理步骤 (推荐款)', price: 299, originalPrice: 399, stock: 541 },
      { id: 'sku-cot-150m', name: '1.5 亿步骤超强推理包 (高级极客)', price: 799, originalPrice: 999, stock: 98 }
    ],
    couponFormat: 'MK-REAS-THNK-XXXX-XXXX-XXXX',
    sellerName: '算力源头供应链',
    sellerAvatar: '⚡',
    sellerCredit: '极速发货率 99.8%',
    location: '北京·中关村',
    condition: '秒发算力',
    views: 12800,
    wants: 942,
    comments: [
      {
        id: 'c2',
        user: '@deepseek_lover',
        avatar: '🐋',
        time: '5小时前',
        question: '用来跑 DeepSeek-Coder-V2 这种深度推理卡吗？思考树会不会断？',
        reply: {
          user: '算力源头供应链',
          time: '4小时前',
          answer: '完美对齐！我们在中继有128张独立 H100 挂池专供思维步骤的计算，确保深度上下文思考树生成过程一爽到底。'
        }
      }
    ]
  },
  {
    id: 'prod-mcp-hw-node',
    name: 'ModelKit Core-Box v2 智能 MCP 物理网卡终端',
    type: 'physical',
    category: 'hardware',
    price: 899,
    originalPrice: 1099,
    badge: '旗舰硬件',
    merchantName: 'ModelKit 官方自营',
    description: '免内网穿透直连局域网的物理网关终端，双千兆口、机身配高精度 OLED 实时通信屏幕。',
    longDescription: '为解决频繁使用本地工具调用 API 导致的链路抖动、穿透失效及本地防火墙异常配置而自研的嵌入式实体中转硬件。内置 ModelKit Core 编译态系统，上行通过硬件极低延迟加密直接接入安全专线，向全球 MCP、服务器、浏览器提供顺畅通讯。',
    imageUrl: '📟',
    features: [
      '搭载 2x RTL8111H 实物千兆防雷网络输入输出口',
      '最高配置支持 2.4 英寸超窄边黑金 OLED 分辨率状态屏，支持 60FPS 实时流量折线绘制',
      '一键将本地 Python/sqlite 数据库一桥映射，免除任何云盘或域名认证',
      '工业级铝镁合金超薄阳极氧化散热外壳'
    ],
    specs: {
      '微控制器芯片': '双核 Cortex-A53 1.5GHz 工业级处理器',
      '物理接口': 'Type-C 供电接口 / 2x RJ45 电流防护隔离千兆口',
      '机载存储': '64GB 高耐久 eMMC 安全隔离区',
      '包装包含': 'Core-Box实体、阻弧级超五类自锁网线、30W PD插头'
    },
    skus: [
      { id: 'sku-hw-std', name: '标准双千兆防雷版 (不带屏幕面板)', price: 899, originalPrice: 1099, stock: 54, specs: { '机身屏幕': '不带屏幕' } },
      { id: 'sku-hw-oled', name: '旗舰双核 OLED 屏装 (黑金实时波形)', price: 1299, originalPrice: 1599, stock: 27, specs: { '机身屏幕': '2.4 英寸高精 OLED 60FPS' } }
    ],
    estimatedDelivery: '顺丰航空件 24 小时极速打单发出 (全国 2 天内送达)',
    sellerName: '开源硬件老杨',
    sellerAvatar: '🛠️',
    sellerCredit: '数码发烧老兵 782分极好',
    location: '深圳·华强北',
    condition: '全新未拆',
    views: 8940,
    wants: 520,
    comments: [
      {
        id: 'c3',
        user: '@pi_pioneer',
        avatar: '🍇',
        time: '1天前',
        question: '这个和普通树莓派自建有什么优势？需要折腾系统吗？',
        reply: {
          user: '开源硬件老杨',
          time: '1天前',
          answer: '不需要折腾！内置 ModelKit 嵌入式自编译 Core OS。开机直接生成隧道路由，安全隔离，硬件级高抗干扰！'
        }
      }
    ]
  },
  {
    id: 'prod-hoodie-code',
    name: 'ModelKit 限量联名重磅刺绣帽衫',
    type: 'physical',
    category: 'merchandise',
    price: 349,
    badge: '极客着装',
    merchantName: 'ModelKit 官方自营',
    description: '450G 重磅纯棉磨毛洗水拼接设计，胸前高精度「Code is Art」纳米丝线编织刺绣。',
    longDescription: '专为高敏极客和开发先锋精工打造的概念周边卫衣。版型挺阔，触感如云。防泼水科技编织表面防油污与落下的咖啡，隐藏式内置双袋设计可平合放置本地安全密钥钥匙。',
    imageUrl: '🧥',
    features: [
      '450G 双抗精梳超长纤维重磅纯棉，内部精细绒感磨毛',
      '领口与背部饰有 ModelKit 像素化徽标与多色刺绣节点树图案',
      '隐形收纳拉链口袋，磁吸防盗，贴身保护实体硬件密钥',
      '耐洗涤不缩水，防静电科技，长时间静坐对电脑抗干扰'
    ],
    specs: {
      '面料材质': '92% 优质重磅新疆棉 / 8% 导电功能聚酯纤维',
      '版型设计': '极宽大宽松版型 (Unisex款)'
    },
    skus: [
      { id: 'sku-hoodie-m-slate', name: 'M码 / Cosmic Slate (深灰色)', price: 349, stock: 40, specs: { '尺码': 'Medium (M)', '颜色方案': '深灰 Cosmic Slate' } },
      { id: 'sku-hoodie-l-slate', name: 'L码 / Cosmic Slate (深灰色)', price: 349, stock: 85, specs: { '尺码': 'Large (L)', '颜色方案': '深灰 Cosmic Slate' } },
      { id: 'sku-hoodie-xl-slate', name: 'XL码 / Cosmic Slate (深灰色)', price: 349, stock: 50, specs: { '尺码': 'X-Large (XL)', '颜色方案': '深灰 Cosmic Slate' } },
      { id: 'sku-hoodie-m-ice', name: 'M码 / Glacier Mint (极地绿)', price: 349, stock: 15, specs: { '尺码': 'Medium (M)', '颜色方案': '冰川绿 Glacier Mint' } },
      { id: 'sku-hoodie-l-ice', name: 'L码 / Glacier Mint (极地绿)', price: 349, stock: 32, specs: { '尺码': 'Large (L)', '颜色方案': '冰川绿 Glacier Mint' } }
    ],
    estimatedDelivery: '顺丰陆运，拍下后 48 小时内完成出库发寄',
    sellerName: '极客美学潮品店',
    sellerAvatar: '👗',
    sellerCredit: '4.9 颗星金牌时尚老店',
    location: '广州·天河',
    condition: '全新未剪吊牌',
    views: 5400,
    wants: 320,
    comments: [
      {
        id: 'c4',
        user: '@web_wizard',
        avatar: '🧙‍♂️',
        time: '2天前',
        question: '微胖 178 / 78kg 穿那个号？平时码偏小吗？',
        reply: {
          user: '极客美学潮品店',
          time: '2天前',
          answer: '建议拿L码宽松，面料采用 450G 双股重磅，非常敦实保暖！'
        }
      }
    ]
  },
  {
    id: 'prod-custom-keycap',
    name: 'Retro Terminal 双色注塑 PBT 极客主题键帽',
    type: 'physical',
    category: 'merchandise',
    price: 199,
    badge: '外设尖货',
    merchantName: '外设极客淘宝专营店',
    description: 'PBT 五面热升华，经典灰绿终端底色。高度还原 ASCII、MCP 连接符、汇编跳转键符号。',
    longDescription: '键帽字体由纯矢量微缩像素极客文字精雕热升华而成。不随时间油光磨损，完美贴合机械键盘 Cherry MX 及各类市面常规防错位十字轴心。让您的键盘桌面对齐 ModelKit 的科技终端之美。',
    imageUrl: '⌨️',
    features: [
      '高级抗油抗损 PBT 双色不透光注塑，经久耐磨',
      '兼容 61/87/98/104 常见布局键盘',
      '个性化功能按键：印有 GOTO, RET, HALT, PUSH 以及炫酷的 ModelKit 网关闪电标'
    ],
    specs: {
      '按键结构': 'CHERRY 经典微弧高度，五面热升华细腻肌理',
      '附赠赠品': '人体工学金属拔键器 / 磁吸外盒'
    },
    skus: [
      { id: 'sku-cap-std', name: '87 键基础极简配 (经典灰绿配色)', price: 199, stock: 45, specs: { '按键数量': '87 Keys 布局' } },
      { id: 'sku-cap-full', name: '142 键完整全键盘精配 (多布局支持)', price: 269, stock: 110, specs: { '按键数量': '142 Keys 全配列' } }
    ],
    estimatedDelivery: '精细纸箱中通快递，24h 内限时出库',
    sellerName: '阿关键帽客制化',
    sellerAvatar: '⌨️',
    sellerCredit: '发烧键盘设计师 信用极佳',
    location: '东莞·石龙',
    condition: '成色全新',
    views: 3400,
    wants: 115,
    comments: [
      {
        id: 'c5',
        user: '@clack_clack',
        avatar: '🐿️',
        time: '3天前',
        question: '字符是用久了会掉吗？手汗重会不会打油？',
        reply: {
          user: '阿关键帽客制化',
          time: '3天前',
          answer: '采用 85% 高含量优质 PBT 素材五面高位热升华，字符深入微孔，就算用刷子猛刷也不褪色！'
        }
      }
    ]
  },
  {
    id: 'prod-gateway-key-annual',
    name: 'ModelKit 多节点安全 Proxy 网关激活密钥',
    type: 'virtual',
    category: 'keys',
    price: 29,
    badge: '必备密匙',
    merchantName: 'ModelKit 官方自营',
    description: '为您解锁云端 12 个亚太及欧美专线中继对等代理，支持多子域名负载均衡，独立隧道防污染。',
    longDescription: '若您已拥有自己的模型代理，却仍在遭受防火长城、连接握手中断、DNS 污染或域名遭污染无法直接唤醒 MCP 外部组件的痛点，该密钥支持激活长周期的 AES-256 SSH 安全隧道。由我们自建的高阻抗骨干防护网络，为您的域名直接架起对等中转连线。',
    imageUrl: '🔑',
    features: [
      '授权启用 12+ 个节点智能权重负载均衡',
      '自动对握手重放包在本地内存过滤，抗污染度高',
      '支持单路由绑定高达 50 次不同的实体/虚拟 MCP 组件物理映射',
      '附送全量 Ingress 拦截器及 TLS 1.3 对称加解密'
    ],
    specs: {
      '产品类别': 'SSH & Ingress 安全网关授权 Key',
      '连接带宽': '独享 20Mbps 上下对等对空物理管道'
    },
    skus: [
      { id: 'sku-key-体验', name: '1 个月极客快体验激活密匙', price: 29, originalPrice: 39, stock: 1500, specs: { '使用有效期': '激活之日起 30 天' } },
      { id: 'sku-key-高能', name: '6 个月中轻度开发者激活密钥', price: 119, originalPrice: 199, stock: 740, specs: { '使用有效期': '激活之日起 180 天' } },
      { id: 'sku-key-专业', name: '12 个月全域高带宽尊享年度密钥', price: 199, originalPrice: 350, stock: 1150, specs: { '使用有效期': '激活之日起 365 天' } }
    ],
    couponFormat: 'MK-GATE-SEC-XXXX-XXXX-XXXX',
    sellerName: '安全通道守护组',
    sellerAvatar: '⛓️',
    sellerCredit: '阿里云安全合伙人担保',
    location: '上海·张江',
    condition: '秒级到账',
    views: 15200,
    wants: 1560,
    comments: [
      {
        id: 'c6',
        user: '@nginx_expert',
        avatar: '🦊',
        time: '4天前',
        question: '支持 SSL 自动证书续期吗？还是需要自己搞？',
        reply: {
          user: '安全通道守护组',
          time: '4天前',
          answer: '中继代理层默认集成 Let’s Encrypt 双端证书全自动静默轮转，您不需要做任何 DNS TXT 记录的手动签发。'
        }
      }
    ]
  },
  {
    id: 'prod-used-raspi',
    name: '【闲置捡漏】树莓派 Raspberry Pi 4B (4G) 配全套开发外壳 + 散热片',
    type: 'physical',
    category: 'hardware',
    price: 249,
    originalPrice: 450,
    badge: '二手超值',
    merchantName: '毕业退坑玩家',
    description: '退坑捡漏，主板功能完好，送亚克力堆叠外壳、原装充电适配器和多阶极客小风扇。',
    longDescription: '之前用来做物联网大毕设的树莓派 4B。内存为 4GB Standard，内置千兆网口，板载原生完美，没有任何飞线或烧焦焊盘。系统盘已刷好 ModelKit Lite 版本，插电即可当作微型 MCP 本地独立调试中继。',
    imageUrl: '🍓',
    features: [
      '经典 Broadcom BCM2711 强悍四核 A72 1.5GHz 核心算力',
      '已加配全铜片多段散热片，重负载满速运行仅 48 度',
      '附赠 Kingston 128G 高速 SD 白金启动卡',
      '成色好，无任何摔碰痕迹，静电袋无尘包装'
    ],
    specs: {
      '成色指标': '95成新 (箱说齐全，主板亮绿灯)',
      '主板板级': 'Raspberry Pi 4 Model B Rev 1.4',
      '机身供电': 'USB-C (5V 3A / 推荐原装充电器)'
    },
    skus: [
      { id: 'sku-pi-4b4g', name: '4G版主板 + 散热片 (全自理配卡)', price: 249, originalPrice: 450, stock: 1, specs: { '内存大小': '4GB', '配件方案': '不带SD卡' } },
      { id: 'sku-pi-4b4g-full', name: '4G顶配 + 128G卡 + 30W充电器 (插手即玩)', price: 319, originalPrice: 580, stock: 1, specs: { '内存大小': '4GB', '配件方案': '含 Kingston 128G+ 充电机' } }
    ],
    estimatedDelivery: '申通或顺丰到付，当晚拍下当晚从高校直接寄出',
    sellerName: '摆烂开发退坑出',
    sellerAvatar: '🍓',
    sellerCredit: '高校实人认证 792 极好芝麻分',
    location: '杭州·西湖区',
    condition: '95新无病修',
    views: 9102,
    wants: 482,
    comments: [
      {
        id: 'c7',
        user: '@hardware_newbie',
        avatar: '🦫',
        time: '5小时前',
        question: '老板，200包邮能出不？能出的话我立刻拍了。',
        reply: {
          user: '摆烂开发退坑出',
          time: '4小时前',
          answer: '不包了，兄弟。板子成色无敌，送的亚克力外壳都三十块了。想要你可以发起【聊一聊】砍砍价看！'
        }
      }
    ]
  },
  {
    id: 'prod-mechanical-keyboard',
    name: '【个人闲置】HHKB Professional Hybrid Type-S 静电容无线蓝牙键盘',
    type: 'physical',
    category: 'merchandise',
    price: 1390,
    originalPrice: 2299,
    badge: '极客毒物',
    merchantName: '键盘发烧藏馆',
    description: '静电容键盘天花板！极简白侧刻无冲突，支持多设备无缝轮转，敲击声如春雨细腻。',
    longDescription: '程序员终极白月光静电容键盘。 Hybrid Type-S 静音双重顶配，四层设备蓝牙切换加物理 Type-C 直拔。因公司升级 MacBook 键盘平时很少用而闲置。原厂白壳有一点点极微弱的正常氧化泛黄（静电容白色外壳通病），键帽已在超声波清洗机彻底除渍除尘。',
    imageUrl: '⌨️',
    features: [
      'Top-re 静电质感无触点打字，防止指节长期酸痛',
      'Hybrid 四频道高速对齐，换机速度不卡顿',
      '侧刻 PBT 酷黑炭字体，指感磨砂有阻尼',
      '全键无冲，可通过专用映射客户端更改热键'
    ],
    specs: {
      '产品成色': '92成新 (空格有轻微泛微黄与极浅油光)',
      '键盘开关': '45g 触发静电容微动结构',
      '输入接口': 'Bluetooth 4.2 / USB Type-C 盲插'
    },
    skus: [
      { id: 'sku-hhkb-std', name: 'HHKB 白侧刻 Type-S (标准箱装)', price: 1390, originalPrice: 2299, stock: 1, specs: { '键帽版本': '侧刻墨字 (有线/无线双模)' } }
    ],
    estimatedDelivery: '顺丰航空保价包邮，拍下后当场包装提供视频确认',
    sellerName: '键帽馆长退坑玩具',
    sellerAvatar: '🕶️',
    sellerCredit: '芝麻分 804 极高信誉',
    location: '北京·海淀',
    condition: '92新极细油光',
    views: 4320,
    wants: 195,
    comments: [
      {
        id: 'c8',
        user: '@vimmer_pro',
        avatar: '🐍',
        time: '8小时前',
        question: '用来写 Vim 的人觉得 Ctrl 键调到 CapsLock 习惯吗？',
        reply: {
          user: '键盘发烧藏馆',
          time: '7小时前',
          answer: '可以说是天作之合！ Ctrl 在 CapsLock 的位置小手指不用特意蜷缩，Vim 飞一般的效率！'
        }
      }
    ]
  }
];