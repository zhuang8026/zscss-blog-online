-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2021 年 12 月 09 日 03:56
-- 伺服器版本： 10.4.13-MariaDB
-- PHP 版本： 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `zscss_database`
--

-- --------------------------------------------------------

--
-- 資料表結構 `admin`
--

CREATE TABLE `admin` (
  `sid` tinyint(100) NOT NULL COMMENT '管理者ID	',
  `loginStatus` tinyint(10) NOT NULL DEFAULT 0 COMMENT '登入狀態',
  `account` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '管理者帳號',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '管理者密碼',
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '管理者名字',
  `userimg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '使用者頭像',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `admin`
--

INSERT INTO `admin` (`sid`, `loginStatus`, `account`, `password`, `nickname`, `userimg`, `updated_at`) VALUES
(4, 0, 'zhuang8026', 'f13683c5dbdb1e82b649f742e3be6dcb894ae73a', '快樂動起來', 'user01.jpg', '2021-12-07 18:43:50'),
(5, 1, 'wi001', 'b86beaf73419d6316cdc98d5b64ff19b21d603bb', 'wi001', NULL, '2021-12-07 18:08:13'),
(6, 0, 'wi002', '3035ddb0e2a84bd804c543d61b7673b7d6caa3bb', 'wi002', NULL, '2021-04-25 17:53:09'),
(7, 0, 'wi003', '6a626537b4d97091e576be014d5c5f081e596ae2', 'wi003', NULL, '2020-11-10 10:54:22');

-- --------------------------------------------------------

--
-- 資料表結構 `items`
--

CREATE TABLE `items` (
  `itemId` int(11) NOT NULL COMMENT '流水號',
  `penId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '產品細節編號',
  `itemName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '產品名稱',
  `itemImg` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '照片路徑',
  `itemStar` int(11) NOT NULL DEFAULT 0 COMMENT '星星評分',
  `itemsText` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '內容說明',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `items`
--

INSERT INTO `items` (`itemId`, `penId`, `itemName`, `itemImg`, `itemStar`, `itemsText`, `created_at`, `updated_at`) VALUES
(1, 'P00001', 'JS基本觀念：call by value 還是reference 又或是 sharing?', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-02 10:28:23'),
(2, 'P00002', 'slice()、splice()、split() 傻傻分不清', 'js.jpg', 4, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-01 18:15:26'),
(3, 'P00003', 'push()、pop()、shfit()、unshfit() 到底是什麼？', 'js.jpg', 4, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-01 18:19:07'),
(4, 'P00004', 'target  &  currentTarget 差别', 'js.jpg', 3, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-01 18:24:11'),
(5, 'P00005', 'object.assign(target, source) 合併多個對象', 'js.jpg', 3, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-01 18:28:54'),
(6, 'P00006', 'Array function 大全', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-01 18:31:59'),
(7, 'P00007', 'for of & for in 差別', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-01 18:59:33'),
(8, 'P00008', 'append & appendChild & innerHtml 差別', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-01 18:59:33'),
(9, 'P00009', 'charCodeAt () & charAt() 差別', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-01 18:59:33'),
(10, 'P00010', 'sort() 排序', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-01 18:59:33'),
(11, 'P00011', 'replace( ) 字符串替换', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-01 18:59:33'),
(12, 'P00012', 'decodeURIComponent() & encodeURIComponent() 加碼 解碼', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-01 18:59:33'),
(13, 'P00013', 'String( ) & toString( ) 差別', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-01 18:59:33'),
(14, 'P00014', 'parseInt() & parseFloat() & Number() 差別', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-01 18:59:33'),
(15, 'P00015', 'findOne( ) & find( ) 差別', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-02 11:58:00'),
(16, 'P00016', 'setInterval() & clearInterval() 無限循環 和 取消循環', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-02 11:58:00'),
(17, 'P00017', 'promise 回調函數 / 異步函數', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-02 11:58:00'),
(18, 'P00018', 'filter( ) 數組過濾', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-02 11:58:00'),
(19, 'P00019', 'map( ) 迴圈數組', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-02 11:58:00'),
(20, 'P00020', 'some( ) 陣列條件篩選/部分符合', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-02 11:58:00'),
(21, 'P00021', 'every( ) 陣列條件篩選/全部符合', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-02 11:58:00'),
(22, 'P00022', 'reduce( ) 陣列累加器', 'js.jpg', 5, 'JavaScript 基礎概念', '2020-10-26 11:13:40', '2020-12-02 11:58:00'),
(23, 'P00023', '深拷貝和淺拷貝 - 有哪些？', 'js.jpg', 4, 'JavaScript 基礎概念', '2021-04-20 16:13:29', '2021-04-20 16:36:07');

-- --------------------------------------------------------

--
-- 資料表結構 `penBlock`
--

CREATE TABLE `penBlock` (
  `id` int(11) NOT NULL COMMENT '流水編號',
  `bId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '區塊編號',
  `pen_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '區塊抬頭',
  `pen_code` int(11) NOT NULL COMMENT '區塊文字類型',
  `is_text` varchar(9999) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '區塊內容',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `penBlock`
--

INSERT INTO `penBlock` (`id`, `bId`, `pen_title`, `pen_code`, `is_text`, `created_at`, `updated_at`) VALUES
(1, 'P00001', '1. Data Type', 0, '首先，在javascript裡面，有許多種資料型別(data type)，但主要分兩大類，一種是原始型別(primitive type)，另一種是物件(Object)。', '2020-12-01 10:39:42', '2020-12-01 10:39:45'),
(2, 'P00001', '2. Primitive type', 1, '- Null\r\n- Undefined\r\n- Boolean\r\n- Number\r\n- BigInt\r\n- String\r\n- Symbol', '2020-12-01 10:39:16', '2020-12-01 18:09:59'),
(3, 'P00001', '3. Object', 0, 'Primitive type以外的，例如array, function, map …', '2020-12-01 10:39:16', '2020-12-01 10:39:16'),
(4, 'P00001', '4. Call by value', 1, 'var x = 1;\r\nvar y = \"test\";\r\nvar a = x;\r\nvar b = y;\r\na = 2;\r\nb = \"xyz\";\r\nconsole.log(x, y, a, b)  // 1, \"test\", 2, \"xyz\"', '2020-12-01 10:39:16', '2020-12-01 10:39:16'),
(5, 'P00001', '5. Call by Reference === Call by Sharing', 1, 'var ref1 = [1];\r\nvar ref2 = ref1;\r\nref1.push(2);\r\nconsole.log(ref1, ref2);  // [1, 2], [1, 2]\r\n-------------------------------------------------------- 以上\r\nvar personObj1 = {\r\n   name: \'Alex\',\r\n   age: 30\r\n};\r\nvar person = personObj1;\r\nperson.age = 25;   // 將age 賦值 25\r\nperson = {         // 這邊person 又從新賦值了，所以 personObj2 才會和 personObj1 不一樣\r\n   name_1: \'John_1\',\r\n   age_2: 502\r\n};\r\nvar personObj2 = person;\r\nconsole.log(personObj1);\r\nconsole.log(personObj2);\r\n-------------------------------------------------------- 以上\r\n1. 當ref1被宣告時，javascript會在記憶體的某處建立一個object，並將ref1指(reference)到這個object。\r\n2. 接著var ref2 = ref1 這一行，就是讓ref1把相同的reference傳給ref2。 \r\n3. 此時兩個變數都是指向同個object了，因此對這個object操作都會同時影響到ref1 & ref2。', '2020-12-01 10:39:16', '2020-12-01 18:11:23'),
(6, 'P00002', '1. slice()、splice()、split()', 1, '1.  splice()  => 切割陣列 返回 陣列\r\n                 array.splcie(index, 切割個數, 替換變數)\r\n                 array.splice(2, 1, \"william\")\r\n\r\n2.  slice()   => 複製陣列 返回 陣列\r\n                 整列 or 字串 都可使用\r\n                 slice(start, end)\r\n                 let a = [\"a\",\"b\",\"c\",\"d\",\"f\"]\r\n                 a.slice(1, 3) // [\"b\",\"c\"]\r\n\r\n3.  split()   => 分割字串 返回陣列\r\n                 string.split(參數, 分個數)\r\n                 let a = \"how are you ?\"\r\n                 a.split(\"\")      // [\"h\",\"o\",\"w\",\" \",\"a\",\"r\",\"e\"...\"?\"]\r\n                 a.split(\" \")     // [\"how\",\"are\",\"you\",\"?\"]\r\n                 a.split(\" \", 2)  // [\"how\",\"are\"]', '2020-12-01 10:39:16', '2020-12-01 18:17:54'),
(7, 'P00003', '1. push()、pop()、shfit()、unshfit()', 1, '1.  push()  => 將 \"變數\" 資加入到陣列的尾端 並 返回 陣列 \r\n               array.push()\r\n               array.push(\"字串\")     // string\r\n               array.push(1)         // number\r\n               array.push({ 對象 })   // object\r\n               array.push([ 陣列 ])   // array\r\n\r\n2.  pop()   => 刪除 整列 最尾端的 \"資料\" 並 返回 陣列 \r\n               array.pop()\r\n\r\n3.  shfit()   => 刪除 整列 第一筆 \"資料\"\r\n                 array.shfit()\r\n                 let a = [1, 2, 3, 4, 5];\r\n                 a.shfit() // [2, 3, 4, 5]\r\n\r\n3.  unshfit()   => 將pop()刪除的\"資料\" 放到第一個\r\n                   array.unshfit(array.pop())\r\n                   let a = [1, 2, 3, 4, 5]\r\n                   let b = a.pop(\"\")  // [1, 2, 3, 4]\r\n                   a.unshfit(b)        // [5, 1, 2, 3, 4]', '2020-12-01 10:39:16', '2020-12-01 18:22:08'),
(8, 'P00004', '1. target  &  currentTarget', 1, '1.target 是触发 事件的 DOM 物件\r\n2.currentTarget 是触发 當時處理該事件的事件監聽器所註冊的 DOM 物件\r\n3.const listener = event=>{\r\n   console.log(event.type, event.target);\r\n   type   /  触发事件 的 數據類型\r\n   target / 触发事件 的 可返回事件的目标节点\r\n} ', '2020-12-01 10:39:16', '2020-12-01 18:22:08'),
(9, 'P00005', '1. object.assign(target, source)', 1, '1. 将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回该 \"目标对象\"\r\n\r\n1-2. Object.assign(target, ...sources) \r\n     ->  target 只能有一個，source 可以有多個 \r\n\r\n2. Object.assign(target, source);\r\n   ->  target: 目标对象\r\n   ->  source: 源对象\r\n\r\n3.  範例-1:\r\n    var obj = {a: 1};\r\n    var copy = Object.assign({}, obj); // \"{}\" 是 目標對象\r\n    console.log(copy); // {a: 1};\r\n\r\n4.  範例-2：\r\n     const target = { a: 1, b: 2 };\r\n     const source = { b: 4, c: 5 };\r\n     const returnedTarget = Object.assign(target, source);\r\n     console.log(target);          // expected output: Object { a: 1, b: 4, c: 5 }\r\n     console.log(returnedTarget);  // expected output: Object { a: 1, b: 4, c: 5 }', '2020-12-01 10:39:16', '2020-12-01 18:22:08'),
(10, 'P00006', '1. Array API', 1, '1. 會 改變 原始陣列\r\n   -> push()、pop()、shift()、unshift()、reverse()、splice()、sort()、copyWithin()、fill()\r\n      -> push()           // 返回 原本Array\r\n      -> pop()            // 返回 原本Array\r\n      -> shift()          // 返回 原本Array\r\n      -> unshift()        // 返回 原本Array\r\n      -> reverse()        // 返回 原本Array / 反轉      / 陣列反轉\r\n      -> splice()         // 返回 原本Array / 移除並新增 / splice(位置, 移除數量, 添加值)\r\n      -> sort()           // 返回 原本Array / 順序排序   / 對陣列的元素 進行 順序排序\r\n      -> copyWithin()     // 返回 原本Array / 複製      / copyWithin(位置, 複製頭, 複製尾)\r\n      -> fill()           // 返回 原本Array / 替換      / fill(替換的內容, 位置頭, 位置尾)', '2020-12-01 10:39:16', '2020-12-01 18:44:13'),
(11, 'P00006', '2. Array API', 1, '2. 回傳 陣列元素資訊 或 索引值\r\n   -> length、indexOf()、lastIndexOf()、find()、findIndex()、filter()\r\n      -> indexOf()        // 返回 索引        / 判斷陣列中 是否包含 某個值 / 由左而右\r\n      -> lastIndexOf()    // 返回 索引        / 判斷陣列中 是否包含 某個值 / 由右而左\r\n      -> find()           // 返回 元素        / 查找處理陣列 / 將陣列中的「每一個」元素帶入指定的函式內做判斷 / 回傳 第一個 找到元素 or undefined\r\n      -> findIndex()      // 返回 索引        / 查找處理陣列 / 將陣列中的「每一個」元素帶入指定的函式內做判斷 / 回傳 第一個 找到元素 or undefined\r\n  **  -> filter()         // 返回 新的陣列     / 过滤處理陣列 / 將陣列中的「每一個」元素帶入指定的函式內做判斷 / 符合判斷則會回傳一個 新的陣列', '2020-12-01 10:39:16', '2020-12-01 18:44:53'),
(12, 'P00006', '3. Array API', 1, '3. 針對每個元素處理\r\n   -> forEach()、for in、for of\r\n   -> forEach() // 將陣列中每個元素套用到指定的函式裡進行運算 / forEach(整列的每一個值, 索引, 陣列本身)', '2020-12-01 10:39:16', '2020-12-01 18:45:13'),
(13, 'P00006', '4. Array API', 1, '4. 產生新的陣列或新的值\r\n    -> join()           // 返回 字串      / 合併         / 將陣列中所有元素合併，沒有指定 字符 預設會用「逗號」合併\r\n    -> concat()         // 返回 新陣列    / 合併         / 可以將兩個陣列合併在一起，如果是使用 ES6 使用擴展運算符...來代替\r\n    -> slice()          // 返回 新陣列    / 切割部分      / 截取出陣列某部份的元素為一個新的陣列 / slice(位置頭, 位置尾)\r\n    -> map()            // 返回 新陣列    / 遍历處理陣列   / 處理陣列中每個元素，最後回傳出一個新的陣列\r\n       -> map( function(){ this },data ) / 一個函式 ( 必填 ) 和 this參數 (選填)\r\n          -> this 指的就是 data\r\n          -> map( (元素的值/必填, 當前元素的索引值/選填, 當前的陣列/選填)=>{} )\r\n          -> map( (data, index, array)=>{...} )\r\n    -> reduce()         // 返回 number   / 計算處理陣列   / 將陣列中每個元素進行計算（从左至右）\r\n    -> reduceRight()    // 返回 number   / 計算處理陣列   / 將陣列中每個元素進行計算\r\n    -> flat()           // 返回 新陣列    / 多維陣列转换   / 將一個多維陣列 转换 一维阵列 / Infinity 是全部展開成一維陣列\r\n    -> flatMap()        // 返回 新陣列    / 遍历處理 + 多維陣列转换 / 等於map()和flat()的組合，在運算後直接將陣列扁平化處理\r\n    -> toString()       // 返回 字串      / 陣列 轉 字串', '2020-12-01 10:39:16', '2020-12-01 18:46:47'),
(14, 'P00006', '5. Array API', 1, '5. 判斷並回傳布林值\r\n    -> every()          // 返回 boolean   / 是非處理陣列        / ”&&“ 条件都必须达成\r\n    -> some()           // 返回 boolean   / 是非處理陣列        / “||” 条件有一个达成就行\r\n    -> includes()       // 返回 boolean   / 是非處理陣列        / 判斷陣列中是否包含某個值\r\n\r\n6. 其他用法\r\n   -> keys()、valueOf()、values()、entries()\r\n    -> keys()           // 返回 回傳陣列的索引值     / 取得索引(keys)\r\n    -> valueOf()        // 返回 陣列的原始值        / 修改', '2020-12-01 10:39:16', '2020-12-01 18:42:42'),
(15, 'P00007', '1. for of & for in ', 1, '1. for in 是ES5標準。\r\n   for of 是ES6標準。\r\n   -> for of 修復for in的不足 \r\n2. for in 遍歷的是key，for of遍歷的是value   \r\n3. 用法 :\r\n   for(let index in arr){\r\n      console.  log(index ); //  0, 1, 2, .....\r\n   }    \r\n   for (let [key, value] of Object.entries(arr)) {\r\n      console.log(`${key}: ${value}`);  // \"0 : a\", \"1 : b\", \"2 : c\", ....\r\n   }\r\n4. Object.entries（obj）\r\n   參量 / obj  -> 自身[key, value]具有字符串屬性對的對象\r\n   返回值 /    -> 返回一個數組\r\n   const obj = { foo: \'bar\', baz: 42 };\r\n   console.log(Object.entries(obj)); // [ [\'foo\', \'bar\'], [\'baz\', 42] ] ', '2020-12-01 10:39:16', '2020-12-01 19:08:25'),
(16, 'P00008', '1. append & appendChild & innerHtml', 1, '1. append()      => 可以同时传入多个节点或字符串，没有返回值\r\n2. appendChild() => 只能传一个节点，且不直接支持传字符串 \r\n3. innerHTML     =>  添加的是纯字符串，不能获取内部元素的属性\r\n\r\n*** 执行速度的比较上，使用 appendChild 比 innerHTML 要快 ***\r\n\r\nappend 可推入dom,number,string \r\n   ->  v1.append(dom);\r\n\r\nappendChild 只能推入 節點，不能直接推入string\r\n   ->  v3.appendChild(dom); or  v3.appendChild(document.createTextNode(\"apple\"))\r\n\r\ninnerHtml 只能添加string，將string轉換成 text or dom\r\n   ->  v3.innerText= (new Date()).getFullYear(); \r\n   ->  v3.innerText= \"<h1>william</h1>\"', '2020-12-01 10:39:16', '2020-12-01 19:03:15'),
(17, 'P00009', '1. charCodeAt () & charAt()', 1, '1. charCodeAt  可返回指定位置的字符的 Unicode 编码 \r\n2. charAt   返回指定位置的字符 \r\n3. var str=\"Hello world!\"\r\n       str.charAt(1)  // e\r\n       str.charCodeAt(1) // 101', '2020-12-01 10:39:16', '2020-12-01 19:03:15'),
(18, 'P00010', '1. sort()', 1, '1. 数组的元素进行排序\r\n2. 如果调用该方法时没有使用参数，将按字母或數字顺序对数组中的元素进行排序\r\n3. function(a, b){return a - b} \r\n    sort()函數比較兩個值時，它將這些值發送到compare函數，並根據返回的值（負，零，正）對值進行排序 \r\n    ture ->  b則排序之前a \r\n    false -> a則在之前進行排序 b \r\n\r\n    比較40和100 : \r\n    sort()方法將調用compare函數（40，100） \r\n    函數計算40-100 (a - b)，並且由於結果為負數（-60），因此sort函數會將40排序在100前面', '2020-12-01 10:39:16', '2020-12-02 11:01:32'),
(19, 'P00011', '1. replace()', 1, 'var str1 = \"Visit Microsoft!\"\r\nstr1.replace(\"Microsoft\",\"W3School\") // Visit W3School!\r\n------------------------------------\r\nvar str2 = \"- Null- Undefined↵- Boolean↵- Number↵- BigInt↵- String↵- Symbol \"\r\nstr2.replace(/↵/g, \'\\n\')', '2020-12-01 10:39:16', '2020-12-02 11:01:32'),
(20, 'P00012', '1. decodeURIComponent() & encodeURIComponent()', 1, '1.  decodeURIComponent( )   解密\r\n2.  encodeURIComponent( )   加密\r\n3.  var test1=\"台湾省\"\r\n    document.write(encodeURIComponent(test1)+ \"<br />\")  //  %E5%8F%B0%E6%B9%BE%E7%9C%81  \r\n    document.write(decodeURIComponent(test1))            //  台湾省', '2020-12-01 10:39:16', '2020-12-02 11:12:39'),
(21, 'P00013', '1. String( ) & toString( )', 1, '1. toString()可以將所有的的資料都轉換為字串，但是要排除null 和 undefined。     \r\n    二進位制：.toString(2);  \r\n    八進位制：.toString(8);\r\n    十進位制：.toString(10);\r\n    十六進位制：.toString(16);\r\n\r\n    var str = null.toString();\r\n    console.log(str, typeof str);  // 報錯\r\n\r\n    var str = undefined.toString(); \r\n    console.log(str, typeof str);  // 報錯\r\n\r\n2. String()可以將null和undefined轉換為字串，但是沒法轉進位制字串。\r\n    var str = String(null); \r\n    console.log(str, typeof str);  //  null，string \r\n\r\n    var str = String(undefined); \r\n    console.log(str, typeof str);  //  undefined，string ', '2020-12-01 10:39:16', '2020-12-02 11:37:53'),
(22, 'P00014', '1. parseInt() & parseFloat() & Number()', 1, '1. parseInt() 函数可解析一个字符串，并返回一个整数 \r\n   -> parseInt(string, radix) \r\n   ->  注意： 只有字符串中的第一个数字会被返回。\r\n       注意： 开头和结尾的空格是允许的。\r\n       注意：如果字符串的第一个字符不能被转换为数字，那么 parseInt() 会返回 NaN。\r\n       注意：在字符串以\"0\"为开始时旧的浏览器默认使用八进制基数。ES 5，默认的是十进制的基数。\r\n   ->  parseInt(\"10\")  // 10\r\n   ->  parseInt(\"10.33\")  // 10\r\n   ->  parseInt(\"34 45 66\")  // 34\r\n   ->  parseInt(\"40 years\")  // 40\r\n   ->  parseInt(\"He was 40\")  // NaN\r\n\r\n2. parseFloat() 函数可解析一个字符串，并返回一个小數點\r\n   -> parseFloat(string) \r\n   ->  注意： 字符串中只返回第一个数字。\r\n       注意： 开头和结尾的空格是允许的。\r\n       注意： 如果字符串的第一个字符不能被转换为数字，那么 parseFloat() 会返回 NaN。\r\n   -> parseInt(\"10.33\")  // 10.33\r\n\r\n3. Number()  函数把对象的值转换为数字 \r\n   -> Number(object) \r\n   -> 注意：如果对象的值无法转换为数字，那么 Number() 函数返回 NaN。 \r\n   ->  Number( true )  // 1\r\n   ->  Number( false )  // 0\r\n   ->  Number( new Date() )  //  1970 年 1 月 1 日至今的毫秒数 \r\n   ->  Number( 999 )  // 999\r\n   ->  Number( 999 888) // NaN ', '2020-12-01 10:39:16', '2020-12-02 11:37:53'),
(23, 'P00015', '1. findOne( ) & find( )', 1, '1. findOne( ) 尋找數據中的第一個\r\n   ->  在MongoDB中，我們使用find和findOne方法在集合中查找數據。 就像SELECT語句用於在MySQL數據庫的表中查找數據一樣。  \r\n   ->  要從MongoDB中的集合中選擇數據，我們可以使用 findOne()方法 \r\n   ->  該findOne()方法返回選擇中的第一個匹配項 \r\n\r\n2. find( ) 尋找符合函數的數據\r\n   ->  返回通过测试（函数内判断）的数组的第一个元素的值 \r\n   ->  数组中的每个元素都调用一次函数执行 \r\n   ->  https://www.runoob.com/jsref/jsref-find.html ', '2020-12-01 10:39:16', '2020-12-02 11:37:53'),
(24, 'P00016', '1. setInterval() & clearInterval() ', 1, '1. setInterval( ) 無限循環\r\n   ->  var myFun = setInterval(function(){ \r\n                     alert(\"Hello\") \r\n                   }, 3000);\r\n\r\n2. clearInterval( ) 取消循環\r\n   ->  clearInterval(myFun);', '2020-12-01 10:39:16', '2020-12-02 11:37:53'),
(25, 'P00017', '1. promise', 1, '同步任務會阻塞程序執行（alert、for...）\r\n異步任務不會阻塞程序執行（settimeout、fs.readFile.....）\r\n\r\n--------------------------------------\r\n\r\n使用 promise( then、catch、finally )\r\npromise.all & promise.race\r\npromise.resolve & promise.reject\r\n\r\n--------------------------------------\r\n\r\nresolve ：代表成功之後要做的事情 \r\nreject  ：代表失敗之後要做的事情\r\nthen    ：可接受兩個函式作為參數，第一個函式用於成功（resolve）時要執行的任務，第二個函式用於失敗（reject）', '2020-12-01 10:39:16', '2020-12-02 11:37:53'),
(26, 'P00018', '1. filter( )', 1, '1. 創建一個數組，其中填充了所有通過測試的數組元素（作為函數提供） \r\n2. 不會對沒有值的數組元素執行該函數 \r\n\r\nvar aaa = [32, 33, 16, 40]; \r\nfunction aaaclick(data) \r\n   return data >= 18; // 條件\r\n} \r\nconsole.log( aaa.filter(aaaclick) ); // [ 32, 33, 40]', '2020-12-01 10:39:16', '2020-12-02 11:37:53'),
(27, 'P00019', '1. map( ) 介紹', 0, '1. 使用 map() 時他會回傳值，他會將回傳的值 \"組合\" 成一個陣列。\r\n   -> 如果return則是 undefined\r\n   -> 回傳數量等於原始陣列的長度\r\n2. 適合將原始的變數運算後重新組合一個新的陣列。', '2020-12-01 10:39:16', '2020-12-02 11:37:53'),
(28, 'P00019', '2. map( ) 使用', 1, 'var mapEmpty = people.map(function(item, index, array){\r\n});\r\nconsole.log(mapEmpty);    // [undefined, undefined, undefined, undefined]\r\n----------------------\r\nvar mapAgeThan5 = people.map(function(item, index, array){\r\n  return item.age > 5;    // 比較大於五歲的\r\n});\r\nconsole.log(mapAgeThan5); // [true, true, false, false]\r\n----------------------\r\nvar mapAgeThan5_2 = people.map(function(item, index, array){\r\n  // 錯誤示範\r\n  if (item.age > 5) {\r\n    return item;              // 回傳大於五歲的\r\n  }\r\n  return false;               // 別以為空的或是 false 就不會回傳\r\n});\r\n\r\nconsole.log(mapAgeThan5_2);   // [{name: \'Casper\'...}, {name: \'Wang\'...}, false, false]\r\n----------------------\r\nvar mapEat = people.map(function(item, index, array){\r\n  if (item.like !== \'蘿蔔泥\') {\r\n    return `${item.like} 好吃`;\r\n  } else {\r\n    return `${item.like} 不好吃`;\r\n  }\r\n});\r\n\r\nconsole.log(mapEat);          // [\"鍋燒意麵 好吃\", \"炒麵 好吃\", \"蘿蔔泥 不好吃\", \"蘿蔔泥 不好吃\"]', '2020-12-01 10:39:16', '2020-12-02 11:37:53'),
(29, 'P00020', '1. some( ) 介紹', 0, 'some() 可以檢查陣列是否有符合條件，只要有一個參數和條件吻合，就會回傳 true。', '2020-12-01 10:39:16', '2020-12-02 14:13:27'),
(30, 'P00020', '2. some( ) 使用', 1, 'var ans = people.some(function(item, index, array){\r\n  return item.age > 10 // 當全部 age 大於 10 才能回傳 true\r\n});\r\nconsole.log(ans);  // true: 只要有部分符合，則為 true\r\n\r\nvar ans2 = people.some(function(item, index, array){\r\n  return item.age < 25\r\n});\r\nconsole.log(ans2); // true: 只要有部分符合，則為 true  \r\n\r\nvar ans2 = people.some(function(item, index, array){\r\n  return item.age > 25\r\n});\r\nconsole.log(ans2); // false: 全部都不符合則為 false', '2020-12-01 10:39:16', '2020-12-02 11:37:53'),
(31, 'P00021', '1. every( ) 介紹', 0, 'every() 可以檢查所有的陣列是否符合條件，只要有一個參數和條件不符合，則回傳 false，可以用來檢查陣列中的內容是否符合特定條件。', '2020-12-01 10:39:16', '2020-12-02 14:16:38'),
(32, 'P00021', '1. every( ) 使用', 1, 'var ans = array.every(function(item, index, array){\r\n  console.log(item, index, array); // 物件, 索引, 全部陣列\r\n  return item.age > 10 // 當全部 age 大於 10 才能回傳 true\r\n});\r\nconsole.log(ans); // false: 只要有部分不符合，則為 false\r\n\r\nvar ans2 = array.every(function(item, index, array){\r\n  return item.age < 25\r\n});\r\nconsole.log(ans2); // true: 全部 age 都小於 25  ', '2020-12-01 10:39:16', '2020-12-02 14:16:50'),
(33, 'P00022', '1. reduce( ) 介紹', 0, '1. reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。\naccumulator: 前一個參數，如果是第一個陣列的話，值是以另外傳入或初始化的值\r\ncurrentValue: 當前變數\r\ncurrentIndex: 當前索引\r\narray: 全部陣列\r\n** 注意: reduce() 对于空数组是不会执行回调函数的。', '2020-12-01 10:39:16', '2020-12-18 16:56:30'),
(34, 'P00022', '1. reduce( ) 使用', 1, 'var reduceEmpty = people.reduce(function(accumulator, currentValue, currentIndex, array){\r\n});\r\nconsole.log(reduceEmpty);                 // 沒有條件，會是 undefined\r\n\r\nvar reducePlus = people.reduce(function(accumulator, currentValue, currentIndex, array){\r\n  // 分別為前一個回傳值, 目前值, 當前索引值\r\n  console.log(accumulator, currentValue, currentIndex);\r\n  return accumulator + currentValue.age;  // 與前一個值相加\r\n}, 0);                                    // 傳入初始化值為 0\r\nconsole.log(reducePlus);                  // 總和為 46\r\n\r\nvar reducePlus = people.reduce(function(accumulator, currentValue, currentIndex, array){\r\n  console.log(\'reduce\', accumulator, currentValue, currentIndex)\r\n  return Math.max( accumulator, currentValue.age ); // 與前一個值比較哪個大\r\n}, 0);\r\nconsole.log(reducePlus); ', '2020-12-01 10:39:16', '2020-12-02 14:16:50'),
(35, 'P00023', '1. JSON.stringify 和 JSON.parse', 0, '1. 用 JSON.stringify 把对象转换成字符串，再用 JSON.parse 把字符串转换成新的对象。\r\n2. 可以转成 JSON 格式的对象才能使用这种方法，如果对象中包含 function 或 RegExp 这些就不能用这种方法了。', '2021-04-20 16:19:04', '2021-04-20 17:10:29'),
(36, 'P00023', '範例：', 1, 'function deepClone(obj) {\r\n  let i = JSON.stringify(obj);\r\n  let objClone = JSON.parse(i);\r\n  return objClone;\r\n}', '2021-04-20 16:19:04', '2021-04-20 17:15:40'),
(37, 'P00023', '2. Object.assign()', 0, '1. 当對象中只有一级属性，没有二级属性的时候就是 深拷貝。\r\n2. 當對象中有對象的时候，在二级属性以后就是 淺拷貝。', '2021-04-20 16:19:04', '2021-04-20 17:10:29'),
(38, 'P00023', '範例：', 1, 'var obj = { a: 1 };\r\nvar copy = Object.assign({}, obj);', '2021-04-20 16:19:04', '2021-04-20 17:15:40'),
(40, 'P00023', '3. lodash.cloneDeep()', 1, 'let _ = require(\'lodash\');\r\nlet obj1 = {\r\n    a: 1,\r\n    b: { f: { g: 1 } },\r\n    c: [1, 2, 3]\r\n};\r\nlet obj2 = _.cloneDeep(obj1);', '2021-04-20 16:19:04', '2021-04-20 17:31:44'),
(120, 'P00024', 'demo01', 0, 'demo01', '2021-12-07 18:44:18', '2021-12-07 18:44:18'),
(121, 'P00024', 'demo03', 1, 'demo03', '2021-12-07 18:44:18', '2021-12-07 18:44:18');

-- --------------------------------------------------------

--
-- 資料表結構 `penDetail`
--

CREATE TABLE `penDetail` (
  `pId` int(11) NOT NULL COMMENT '流水編號',
  `penId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '細節頁編號',
  `penStar` int(11) NOT NULL COMMENT '單頁評分',
  `penImg` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '標題頭像',
  `penStyle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '內容說明',
  `penTitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '每段title',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT '新增時間',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `penDetail`
--

INSERT INTO `penDetail` (`pId`, `penId`, `penStar`, `penImg`, `penStyle`, `penTitle`, `created_at`, `updated_at`) VALUES
(1, 'P00001', 5, 'js.jpg', 'JavaScript 基礎概念', 'JS基本觀念：call by value 還是reference 又或是 sharing?', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(2, 'P00002', 4, 'js.jpg', 'JavaScript 基礎概念', 'slice()、splice()、split() 傻傻分不清', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(3, 'P00003', 4, 'js.jpg', 'JavaScript 基礎概念', 'push()、pop()、shfit()、unshfit() 到底是什麼？', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(4, 'P00004', 3, 'js.jpg', 'JavaScript 基礎概念', 'target  &  currentTarget 差别', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(5, 'P00005', 3, 'js.jpg', 'JavaScript 基礎概念', 'object.assign(target, source) 合併多個對象', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(6, 'P00006', 5, 'js.jpg', 'JavaScript 基礎概念', 'Array function 大全', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(7, 'P00007', 5, 'js.jpg', 'JavaScript 基礎概念', 'for of & for in 差別', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(8, 'P00008', 5, 'js.jpg', 'JavaScript 基礎概念', 'append & appendChild & innerHtml 差別', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(9, 'P00009', 5, 'js.jpg', 'JavaScript 基礎概念', 'charCodeAt () & charAt() 差別', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(10, 'P00010', 5, 'js.jpg', 'JavaScript 基礎概念', 'sort() 排序', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(11, 'P00011', 5, 'js.jpg', 'JavaScript 基礎概念', 'replace( ) 字符串替换', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(12, 'P00012', 5, 'js.jpg', 'JavaScript 基礎概念', 'decodeURIComponent() & encodeURIComponent() 加碼 解碼', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(13, 'P00013', 5, 'js.jpg', 'JavaScript 基礎概念', 'String( ) & toString( ) 差別', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(14, 'P00014', 5, 'js.jpg', 'JavaScript 基礎概念', 'parseInt() & parseFloat() & Number() 差別', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(15, 'P00015', 5, 'js.jpg', 'JavaScript 基礎概念', 'findOne( ) & find( ) 差別', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(16, 'P00016', 5, 'js.jpg', 'JavaScript 基礎概念', 'setInterval() & clearInterval() 無限循環 和 取消循環', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(17, 'P00017', 5, 'js.jpg', 'JavaScript 基礎概念', 'promise 回調函數 / 異步函數', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(18, 'P00018', 5, 'js.jpg', 'JavaScript 基礎概念', 'filter( ) 數組過濾', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(19, 'P00019', 5, 'js.jpg', 'JavaScript 基礎概念', 'map( ) 迴圈數組', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(20, 'P00020', 5, 'js.jpg', 'JavaScript 基礎概念', 'some( ) 陣列條件篩選/部分符合', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(21, 'P00021', 5, 'js.jpg', 'JavaScript 基礎概念', 'every( ) 陣列條件篩選/全部符合', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(22, 'P00022', 5, 'js.jpg', 'JavaScript 基礎概念', 'reduce( ) 陣列累加器', '2020-11-30 18:25:11', '2021-09-03 17:38:28'),
(23, 'P00023', 4, 'js.jpg', 'JavaScript 基礎概念', '深拷貝和淺拷貝 - 有哪些？', '2021-04-20 16:41:57', '2021-09-03 17:38:28'),
(97, 'P00024', 1, 'js.jpg', 'demo01', 'demo01', '2021-12-07 18:44:18', '2021-12-07 18:44:18');

-- --------------------------------------------------------

--
-- 資料表結構 `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`itemId`);

--
-- 資料表索引 `penBlock`
--
ALTER TABLE `penBlock`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `penDetail`
--
ALTER TABLE `penDetail`
  ADD PRIMARY KEY (`pId`);

--
-- 資料表索引 `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `admin`
--
ALTER TABLE `admin`
  MODIFY `sid` tinyint(100) NOT NULL AUTO_INCREMENT COMMENT '管理者ID	', AUTO_INCREMENT=9;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `items`
--
ALTER TABLE `items`
  MODIFY `itemId` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號', AUTO_INCREMENT=24;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `penBlock`
--
ALTER TABLE `penBlock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水編號', AUTO_INCREMENT=122;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `penDetail`
--
ALTER TABLE `penDetail`
  MODIFY `pId` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水編號', AUTO_INCREMENT=98;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
