define({
  //style-component
  fill: '填充',
  image: '图片',
  color: '颜色',
  browse: '浏览',
  clearImage: '清除图片',
  position: '位置',
  fit: '适应',
  center: '中间',
  tile: '切片',
  stretch: '伸展',
  dashed: '虚线',
  dotted: '点划线',
  double: '双重线',
  solid: '实心线',
  offsetX: '偏移量X',
  offsetY: '偏移量Y',
  blurRadius: '模糊半径',
  spreadRadius: '扩散半径',
  T: '上',
  R: '右',
  B: '下',
  L: '左',
  TL: '左上',
  TR: '右上',
  BR: '右下',
  BL: '左下',
  lock: "锁定",
  unlock: "取消锁定",
  changeUnit: '更改单位',
  //common-component/text
  align: '排列',
  left: '左',
  right: '右',
  down: '下',
  justify: '两端对齐',
  font: '字体',
  fontSize: '字体大小',
  convert: '转换',
  convertToRem: '转换为REM',
  bold: '粗体',
  italic: '斜体',
  underline: '下划线',
  strike: '删除线',
  background: '背景',
  ordered: '有序的',
  bullet: '无序的',
  link: '链接',
  linkTo: '链接到',
  letterSpacing: '字母间距',
  lineSpacing: '行距',

  //components-for-app-in-builder
  clearAllFormats: '清除所有格式',

  //components/theme-components/editor
  customTheme: '自定义主题',
  //components/theme-components/theme-chooser
  waitForThemeList: '获取主题列表',
  themeCustomizationComing: '主题自定义功能即将上线.',
  //components/theme-components/theme-configurator
  useSharedTheme: '使用共享主题',
  reset: '重置',
  saveAs: '保存为',
  variableTypography: '文本',
  variableBg: '背景',
  variableColor: '文本颜色',
  variableFontFamilyBase: '字体',
  variableFontSizeBase: '基础字号',
  variableHeader: '标题',
  variableBody: '正文',
  variableLink: '链接',
  variableButton: '按钮',
  // components/data-source-chooser
  connectToData: '连接数据',
  setDataSource: '设置数据',
  creatingDataSourceFailed: '添加数据失败!',

  // components/data-source-list
  added: '添加',
  outputs: '产生',
  noAddedDataSourceCanBeUsed: '没有添加的数据可以使用',
  noSelectedType: '没有选中类型',
  type: '类型',
  back: '返回',
  noWidgetOutputCanBeUsed: '没有组件产生的数据可以使用',
  featureLayerType: 'Feature layer',
  featureLayerViewType: 'Feature layer view',
  hubAnnotationsType: 'Hub annotations',
  hubEventsType: 'Hub events',
  mapType: 'Map',
  mapViewType: 'Map view',
  sceneViewType: 'Scene view',
  simpleLocalType: 'Simple local',
  webMapType: 'Web map',
  webSceneType: 'Web scene',
  csvType: 'CSV',
  all: '全部',

  // components/external-data-source-chooser
  chooseData: '选中数据',
  addData: '添加数据',
  serviceType: '服务类型',
  url: 'URL',
  add: '增加',
  webMap: '地图',
  webScene: '场景',
  featureLayer: '图层',
  appData: '应用数据',
  done: '完成',
  hub: 'Hub',
  unSupported: '不支持',
  selected: '已选中',

  // components/image-chooser
  setAnImage: '设置图片',
  localImage: '本地图片',
  urlImage: '网址',
  uploadImage: '上传',
  nextStepForImage: '下一步',
  urlIsHereForImage: '此处填入网址...',
  uploadImageError: '错误',
  imageTypeError: '您上传的图片类型不被支持, 请用以下图片格式: PNG, GIF, JPG, JPEG, BMP, SVG 或者 SVGZ.',

  // components/item-chooser
  sort: '排序',
  search: '搜索',
  modified: '修改时间',
  title: '标题',
  numViews: '查看次数',
  myContent: '我的内容',
  myOrganization: '我的组织',
  public: '公共',
  noItemFoundWarning: '无法找到您正在查找的内容。 请尝试查找其他内容。',

  // components/link-setting
  openIn: '打开',
  appWindow: '应用窗口',
  topWindow: '顶层窗口',
  newWindow: '新窗口',
  webAddress: '网址',
  none: '没有',
  page: '页面',
  view: '视图',
  chooseAPage: '选择一个页面',
  setLink: '设置链接',
  setLinkForTitle: '设置{title}的链接',

  // components/item-detail
  details: '详细信息',
  description: '描述',

  // components/common-modal
  commonModalOk: '确定',
  commonModalCancel: '取消',

  // common-components/expression-builder
  attribute: '属性',
  statistics: '统计',
  expression: '表达式',
  data: '数据',
  operator: '运算符',
  field: '字段',
  name: '名称',
  insert: '插入',

  // common-components/expression-builder-popup
  expressionBuilder: '表达式构建器',

  // common-components/expression-editor
  fields: '属性',
  functions: '函数',
  invalidExpression: '表达式无效',

  // common-components/expression-input
  static: '文本',

  // common-components/field-chooser
  pleaseSetDataSource: '请设置一个数据',

  // message-actions/filter-data-record-action-setting
  chooseDsForFilter: '选择一个数据进行过滤',
  filterNone: '无',
  filterDataRelationShip: '数据关系',
  filterMessageField: '消息字段',

  // message-actions/select-data-record-action-setting
  chooseDsForSelect: '选择一个数据进行选择',
  selectNone: '无',
  selectDataRelationShip: '数据关系',
  selectMessageField: '消息字段',

  //nav styles
  direction: '方向',
  style: '样式',
  default: '默认',
  tabs: '选项卡',
  pills: '填充',
  select: '选中',
  regular: '常规',
  views: '视图',
  auto: '自动',
  custom: '自定义',
  viewsSelected: '{viewNumber}个 视图被选中'
});