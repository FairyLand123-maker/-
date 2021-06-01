
const ApiRootUrl = 'http://www.dreambook.icu:8088/';

module.exports = {
    // 登录
    AuthLoginByWeixin: ApiRootUrl + 'user/login', //微信登录
    // 首页
    IndexUrl: ApiRootUrl + 'index/appInfo', //首页数据接口
    // 分类
    CatalogList: ApiRootUrl + 'catalog/index', //分类目录全部分类数据接口
    CatalogCurrent: ApiRootUrl + 'catalog/current', //分类目录当前分类数据接口
    GetCurrentList: ApiRootUrl + 'catalog/currentlist',
    // 购物车
    CartAdd: ApiRootUrl + 'car/add', // 添加商品到购物车
    CartList: ApiRootUrl + 'car/list', //获取购物车的数据
    // CartUpdate: ApiRootUrl + 'car/update', // 更新购物车的商品
    CartDelete: ApiRootUrl + 'car/delete', // 删除购物车的商品
    // CartChecked: ApiRootUrl + 'car/checked', // 选择或取消选择商品
    // CartGoodsCount: ApiRootUrl + 'car/goodsCount', // 获取购物车商品件数
    // CartCheckout: ApiRootUrl + 'car/checkout', // 下单前信息确认
    // 商品
    GoodsCount: ApiRootUrl + 'book/count', //统计商品总数
    GoodsDetail: ApiRootUrl + 'book/detail', //获得商品的详情
    GoodsList: ApiRootUrl + 'book/list', //获得商品列表
    GoodsShare: ApiRootUrl + 'book/goodsShare', //获得商品的详情
    SaveUserId: ApiRootUrl + 'book/saveUserId',
    OnSale: ApiRootUrl+'book/onSale',//在售商品
    OutSale: ApiRootUrl+'book/outSale',  //已售商品
    // 收货地址
    AddressDetail: ApiRootUrl + 'address/add', //添加并保存收货地址
    DeleteAddress: ApiRootUrl + 'address/deleteAddress', //删除收货地址
    // SaveAddress: ApiRootUrl + 'address/add', //保存收货地址
    GetAddresses: ApiRootUrl + 'address/list',
    ProvinceList: ApiRootUrl + 'address/listProvince', //获取省份列表
    SchoolList:ApiRootUrl+'address/listSchool',//获取学校列表
    FacultyList:ApiRootUrl+'address/listFaculty',//获取学院列表
    // PayPrepayId: ApiRootUrl + 'pay/preWeixinPay', //获取微信统一下单prepay_id
    // OrderSubmit: ApiRootUrl + 'order/submit', // 提交订单
    //订单
    OrderList: ApiRootUrl + 'order/list', //订单列表详细信息
    OrderDelete:ApiRootUrl+'order/delete',//删除商品
    OrderShow: ApiRootUrl + 'order/show', //订单列表
    OrderAdd: ApiRootUrl + 'order/add', //创建订单
    // OrderCancel: ApiRootUrl + 'order/cancel', //取消订单
    // OrderConfirm: ApiRootUrl + 'order/confirm', //物流详情
    // OrderCount: ApiRootUrl + 'order/count', // 获取订单数
    // OrderCountInfo: ApiRootUrl + 'order/orderCount', // 我的页面获取订单数状态
    // OrderExpressInfo: ApiRootUrl + 'order/express', //物流信息
    // OrderGoods: ApiRootUrl + 'order/orderGoods', // 获取checkout页面的商品列表
    // 搜索
    SearchIndex: ApiRootUrl + 'search/index', //搜索页面数据
    SearchHelper: ApiRootUrl + 'search/helper', //搜索帮助
    SearchClearHistory: ApiRootUrl + 'search/clearHistory', //搜索帮助
    ShowSettings: ApiRootUrl + 'settings/showSettings',
    SaveSettings: ApiRootUrl + 'settings/save',
    SettingsDetail: ApiRootUrl + 'settings/userDetail',
    GetBase64: ApiRootUrl + 'qrcode/getBase64', //获取商品详情二维码
    //学生认证
    StudentCheck:ApiRootUrl+'real/add'//认证注册

};