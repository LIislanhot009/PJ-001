const roleData = {
  supplier: {
    eyebrow: "Supplier Portal",
    title: "供应商协作台",
    desc: "提交产品资料后，只看到可公开的任务进度、风险摘要、改款动作和复检结论。",
    badge: "供应商视角",
    inputLabel: "产品资料",
    input: "户外庭院灯新品",
    modules: [
      {
        id: "submit",
        label: "资料提交",
        tag: "图片 + 描述",
        title: "提交产品资料",
        sees: "上传产品图、填写产品名称和补充说明，页面显示任务已进入处理队列。",
        does: "系统把产品资料结构化，生成任务记录，并根据角色过滤可见字段。",
        output: "供应商只看到任务进度、资料完整度和下一步提示。",
        steps: ["接收产品资料", "结构化产品字段", "生成协作任务", "进入公开进度面板"],
        results: [
          ["资料完整度", "96%", "图片、品类、用途和关键结构字段已补齐。"],
          ["任务状态", "排队中", "等待进入预检流程。"],
          ["可见范围", "公开版", "隐藏内部候选、底层参数和真实环境信息。"]
        ]
      },
      {
        id: "summary",
        label: "风险摘要",
        tag: "公开结论",
        title: "查看公开风险摘要",
        sees: "看到中/低/高等级摘要、相似点解释和需要重点调整的部位。",
        does: "后台用整图候选和部件证据合并成供应商可读摘要。",
        output: "用非技术语言说明哪些结构建议调整，哪些结构可以保留。",
        steps: ["读取预检结果", "合并相似证据", "转换为公开摘要", "生成下一步建议"],
        results: [
          ["综合等级", "中", "灯罩轮廓和支架比例建议调整。"],
          ["证据摘要", "3 条", "只展示摘要化相似点。"],
          ["下一步", "改款建议", "进入结构动作卡。"]
        ]
      },
      {
        id: "redesign",
        label: "改款建议",
        tag: "动作卡",
        title: "生成改款动作卡",
        sees: "看到可执行动作，例如改灯罩轮廓、调整连接件比例、保留安装孔位。",
        does: "系统把风险点、生产约束和供应商反馈组合成动作卡。",
        output: "每张动作卡包含改哪里、为什么改、约束是什么、如何复检。",
        steps: ["选择重点风险部位", "读取生产约束", "生成动作卡", "等待改后复检"],
        results: [
          ["动作卡", "4 张", "覆盖灯罩、支架、底座和连接件。"],
          ["约束点", "5 个", "保留安装孔、防水密封和成本边界。"],
          ["复检入口", "已开启", "上传新图后继续验证。"]
        ]
      }
    ]
  },
  operator: {
    eyebrow: "Internal Workbench",
    title: "内部运营工作台",
    desc: "内部用户可以跑选品分析、外观风险预检、部件级复核和改后复检。",
    badge: "内部运营视角",
    inputLabel: "分析目标",
    input: "太阳能路径灯",
    modules: [
      {
        id: "market",
        label: "Stage 1",
        tag: "机会分析",
        title: "Stage 1 机会分析",
        sees: "看到机会词、属性方向、定位主题，以及这些结果如何进入后续预检。",
        does: "系统先沉淀词库和属性字典，再结合产品上下文做匹配和摘要。",
        output: "输出机会评分、主推属性和定位主题，作为下一阶段输入。",
        steps: ["解析产品场景", "匹配机会词", "生成属性方向", "输出定位主题"],
        results: [
          ["机会评分", "82", "需求稳定，竞争密度中等。"],
          ["属性方向", "3 个", "节能、易安装、防水。"],
          ["定位主题", "2 个", "花园路径、安全照明。"]
        ]
      },
      {
        id: "risk",
        label: "Stage 2",
        tag: "风险预检",
        title: "Stage 2 外观风险预检",
        sees: "看到整图候选、相似点解释、风险等级和需要人工复核的候选。",
        does: "系统做候选召回、去重、重排和规则分层，输出可复核结果。",
        output: "将风险原因转成结构化证据，方便人工确认和后续优化。",
        steps: ["整图候选召回", "候选合并去重", "相似点解释", "进入人工复核"],
        results: [
          ["候选数", "50", "保留 TopN 用于复核。"],
          ["重点候选", "7", "轮廓、支架、底座存在相似证据。"],
          ["复核队列", "3 条", "优先处理高相似部位。"]
        ]
      },
      {
        id: "part",
        label: "Part Check",
        tag: "部件复核",
        title: "部件级复核",
        sees: "看到灯罩、支架、底座等局部区域的风险证据。",
        does: "系统把整图拆成局部区域，用局部证据补充整图结果。",
        output: "说明哪个部件像、风险来自哪里、改哪里最有效。",
        steps: ["识别关键部件", "生成局部框选", "局部候选检索", "输出部件证据"],
        results: [
          ["检测部件", "6 个", "灯罩、支架、底座、连接件等。"],
          ["高关注", "2 个", "灯罩和连接件优先处理。"],
          ["处理建议", "改款", "进入 Stage 3 动作卡。"]
        ]
      },
      {
        id: "recheck",
        label: "Stage 3",
        tag: "改后复检",
        title: "Stage 3 改款复检",
        sees: "上传改后图后，看到风险是否下降、哪些动作有效、是否可继续出样。",
        does: "系统把新图重新进入预检链路，并和原始任务做对比。",
        output: "输出风险下降比例、保留约束和出样建议。",
        steps: ["接收改后图", "重新预检", "对比前后差异", "归档复检结论"],
        results: [
          ["风险下降", "31%", "主要相似点已减弱。"],
          ["保留约束", "5 项", "安装、防水、成本边界未破坏。"],
          ["闭环状态", "完成", "结果写回任务记录。"]
        ]
      }
    ]
  },
  admin: {
    eyebrow: "Admin Console",
    title: "管理员监控台",
    desc: "管理员关注任务队列、运行健康、异常原因、权限范围和审计记录。",
    badge: "管理员视角",
    inputLabel: "监控范围",
    input: "今日任务概览",
    modules: [
      {
        id: "queue",
        label: "任务队列",
        tag: "排队 / 运行",
        title: "任务队列概览",
        sees: "看到不同模块的排队数、运行数、失败数和卡住的步骤。",
        does: "系统把业务请求转成可观测任务，持续记录状态和耗时。",
        output: "管理员能判断是否需要扩容、重试或人工介入。",
        steps: ["读取任务状态", "聚合模块分布", "标记异常任务", "输出处理建议"],
        results: [
          ["运行中", "9", "当前正在处理的任务。"],
          ["排队中", "16", "等待进入工作流。"],
          ["失败数", "2", "已进入复查列表。"]
        ]
      },
      {
        id: "health",
        label: "运行健康",
        tag: "耗时 / 成功率",
        title: "运行健康看板",
        sees: "看到成功率、平均耗时、异常类型和最近波动。",
        does: "系统按模块聚合调用结果，区分数据、模型、流程和权限问题。",
        output: "给出可执行运维判断，而不是只显示一堆日志。",
        steps: ["聚合调用指标", "计算耗时分布", "识别异常类型", "生成健康摘要"],
        results: [
          ["成功率", "95.4%", "近 24 小时模拟值。"],
          ["平均耗时", "4.8s", "用于判断是否需要排查。"],
          ["告警", "1 条", "部件复核短时波动。"]
        ]
      },
      {
        id: "audit",
        label: "权限审计",
        tag: "角色范围",
        title: "权限与审计",
        sees: "看到不同角色可访问的模块、最近操作和异常拦截记录。",
        does: "系统按角色控制可见字段，并记录安全裁剪后的操作事件。",
        output: "确保外部角色只看到公开结论，内部角色才能进入复核和监控。",
        steps: ["识别用户角色", "检查模块权限", "裁剪输出字段", "记录审计事件"],
        results: [
          ["角色数", "3", "供应商、内部运营、管理员。"],
          ["审计事件", "126", "模拟操作与状态记录。"],
          ["拦截项", "4", "隐藏不适合公开展示的字段。"]
        ]
      }
    ]
  }
};

let activeRole = "supplier";
let activeModule = "submit";
let runTimer = null;

const roleTabs = Array.from(document.querySelectorAll(".role-tab"));
const moduleTabs = document.querySelector("#moduleTabs");
const workspaceEyebrow = document.querySelector("#workspaceEyebrow");
const workspaceTitle = document.querySelector("#workspaceTitle");
const workspaceDesc = document.querySelector("#workspaceDesc");
const activeRoleBadge = document.querySelector("#activeRoleBadge");
const inputLabel = document.querySelector("#inputLabel");
const demoInput = document.querySelector("#demoInput");
const activeModuleTitle = document.querySelector("#activeModuleTitle");
const activeModuleTag = document.querySelector("#activeModuleTag");
const stepList = document.querySelector("#stepList");
const resultStrip = document.querySelector("#resultStrip");
const userSees = document.querySelector("#userSees");
const systemDoes = document.querySelector("#systemDoes");
const outputMeans = document.querySelector("#outputMeans");
const traceLines = document.querySelector("#traceLines");
const traceId = document.querySelector("#traceId");
const liveStatus = document.querySelector("#liveStatus");
const runButton = document.querySelector("#runButton");

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getRole() {
  return roleData[activeRole];
}

function getModule() {
  const role = getRole();
  return role.modules.find((item) => item.id === activeModule) || role.modules[0];
}

function setStatus(type, text) {
  liveStatus.className = `live-status ${type || ""}`.trim();
  liveStatus.querySelector("b").textContent = text;
}

function renderModuleTabs() {
  const role = getRole();
  moduleTabs.innerHTML = role.modules
    .map(
      (item) =>
        `<button class="module-tab ${item.id === activeModule ? "active" : ""}" type="button" data-module="${esc(item.id)}">${esc(item.label)}</button>`
    )
    .join("");

  moduleTabs.querySelectorAll(".module-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeModule = button.dataset.module;
      stopRun();
      renderWorkbench(0);
    });
  });
}

function renderSteps(progressIndex) {
  const module = getModule();
  const input = demoInput.value.trim() || getRole().input;
  stepList.innerHTML = module.steps
    .map((step, index) => {
      const state = index < progressIndex ? "done" : index === progressIndex ? "run" : "wait";
      const rowClass = index < progressIndex ? "done" : index === progressIndex ? "active" : "";
      const stateText = index < progressIndex ? "完成" : index === progressIndex ? "运行中" : "等待";
      return `
        <div class="step-row ${rowClass}">
          <span class="num">${index + 1}</span>
          <div>
            <b>${esc(step)}</b>
            <small>${esc(input)} · ${esc(module.tag)}</small>
          </div>
          <span class="pill ${state}">${stateText}</span>
        </div>
      `;
    })
    .join("");
}

function renderResults(done) {
  const module = getModule();
  const results = done
    ? module.results
    : [
        ["当前状态", "预览", "点击运行后会逐步刷新流程和结果。"],
        ["数据来源", "Mock", "纯前端模拟，不请求真实服务。"],
        ["演示重点", "角色差异", "不同角色看到不同页面和字段。"]
      ];

  resultStrip.innerHTML = results
    .map(
      ([label, value, desc]) => `
        <article class="result-card">
          <span>${esc(label)}</span>
          <b>${esc(value)}</b>
          <p>${esc(desc)}</p>
        </article>
      `
    )
    .join("");
}

function renderTrace(progressIndex, done) {
  const module = getModule();
  const now = new Date();
  const suffix = `${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
  traceId.textContent = `trace-demo-${suffix}`;
  const lines = module.steps.slice(0, Math.max(1, progressIndex + 1)).map((step, index) => {
    const status = index < progressIndex || done ? "done" : "running";
    return [`step-${index + 1}`, `${status} · ${step}`];
  });
  if (done) {
    lines.push(["output", "done · result cards refreshed"]);
  }
  traceLines.innerHTML = lines.map(([key, value]) => `<div><b>${esc(key)}</b><span>${esc(value)}</span></div>`).join("");
}

function renderWorkbench(progressIndex = 0, done = false) {
  const role = getRole();
  const module = getModule();
  workspaceEyebrow.textContent = role.eyebrow;
  workspaceTitle.textContent = role.title;
  workspaceDesc.textContent = role.desc;
  activeRoleBadge.textContent = role.badge;
  inputLabel.textContent = role.inputLabel;
  activeModuleTitle.textContent = module.title;
  activeModuleTag.textContent = module.tag;
  userSees.textContent = module.sees;
  systemDoes.textContent = module.does;
  outputMeans.textContent = module.output;

  roleTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.role === activeRole);
  });

  renderModuleTabs();
  renderSteps(progressIndex);
  renderResults(done);
  renderTrace(progressIndex, done);
  setStatus(done ? "done" : "", done ? "已完成" : "待运行");
}

function switchRole(roleKey) {
  activeRole = roleKey;
  activeModule = roleData[roleKey].modules[0].id;
  demoInput.value = roleData[roleKey].input;
  stopRun();
  renderWorkbench(0);
}

function stopRun() {
  if (runTimer) {
    clearInterval(runTimer);
    runTimer = null;
  }
}

function runDemo() {
  stopRun();
  let progress = 0;
  const total = getModule().steps.length;
  setStatus("running", "运行中");
  renderSteps(progress);
  renderResults(false);
  renderTrace(progress, false);

  runTimer = setInterval(() => {
    progress += 1;
    const done = progress >= total;
    renderSteps(Math.min(progress, total));
    renderResults(done);
    renderTrace(Math.min(progress, total), done);
    setStatus(done ? "done" : "running", done ? "已完成" : "运行中");
    if (done) {
      stopRun();
    }
  }, 620);
}

roleTabs.forEach((tab) => {
  tab.addEventListener("click", () => switchRole(tab.dataset.role));
});

runButton.addEventListener("click", runDemo);
demoInput.addEventListener("input", () => renderWorkbench(0));

renderWorkbench(0);
