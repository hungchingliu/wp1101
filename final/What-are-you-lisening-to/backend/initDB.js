import userModel from "./models/user.js"

const TaipeiBounds={
    north: 25.078,
    south: 25.010,
    east: 121.61,
    west: 121.48
}

var RandomName = "杜祥憲, 江佳伸, 廖珮夫, 王雅惠, 黃伊陽, 陳宛臻, 楊志舜, 黃淑慧, 陳宏強, 李智傑, 韓劭延, 黃冠萱, 鄭翰瑜, 黃宜君, 許涵聿, 黎建緯, 周如昇, 簡志軒, 楊惠婷, 許文昇, 潘仲霞, 陳昶函, 吳喬海, 林晏淳, 楊惠雅, 許建勳, 林舜文, 溫宛玲, 黃育廷, 陳琪利, 林雅芳, 陳蓉珠, 張介志, 胡姵信, 蘇玟君, 黃志文, 陳玉蓁, 高彥志, 吳宗辛, 林麗卿, 楊玉鳳, 劉志豪, 楊雅雯, 黃怡臻, 李旺郁, 黃淑偉, 劉文堯, 柳向源, 陳佑富, 林俊德, 林禹伯, 張鈞吉, 徐惠婷, 趙嘉慧, 林雅玲, 林智依, 趙俊嘉, 符哲銘, 黃子羽, 劉語禮, 林怡東, 袁明哲, 劉昀裕, 黃韻如, 陳怡陽, 張家達, 李信宏, 楊維榮, 陳韋廷, 陳琇亞, 吳宏達, 張惠偉, 張景惟, 林思安, 王建軍, 李旺竹, 王美惠, 李剛仰, 林芳珍, 林嘉慧, 張家奇, 連淑均, 陳岱蓁, 蔡月映, 楊珮君, 吳佳彥, 連庭瑋, 吳思謙, 黃英任, 王盈漢, 郭尚善, 李羿城, 林郁玉, 黃美恭, 陳志和, 周雅茹, 吳育如, 黃思俐, 耿尹杰, 李美珍, 黃志祥, 李豐珠, 楊淑珍, 孫南韻, 沈巧法, 趙詩涵, 林宜坤, 林侑州, 幸豪卉, 郭盈君, 吳姿吟, 吳財明, 陳思華, 劉冠軒, 呂怡伶, 黃和竹, 陳莉真, 黃婉羽, 徐可清, 詹祐倩, 索鎮春, 陳冠士, 陳仁駿, 黃維鈺, 李育雪, 羅淑芬, 田淑君, 賴慈宜, 楊左年, 徐筱婷, 陳友迪, 李庭瑋, 鐘雅娟, 張剛希, 林美恬, 陳泰士, 潘雅文, 王平姍, 劉志賢, 林志茜, 趙至綺, 盧盈甄, 駱揚儀, 杜秀玲, 陳名新, 陳佳恭, 邱俊齊, 梁牧音, 侯建宏, 王聖筠, 王志軒, 黃美南, 楊丹陽, 陳惠文, 林竹美, 李喬純, 陳秋迪, 馮冰陽, 賈靜如, 陳柏堯, 林佳玲, 趙政憲, 孫智堯, 郭光忠, 毛夢鑫, 林翰宏, 林佩君, 黃子揚, 陳昱蘋, 林郁涵, 吳美美, 陳婉如, 韓郁翔, 程怡婷, 許家豪, 陳信名, 林怡君, 陳耿恬, 謝怡君, 王冠勳, 劉香彬, 童介娟, 謝千月, 張佩君, 楊燦翰, 杜如君, 鐘亮紫, 吳健豪, 吳伶秋, 陳崇妮, 陳雅軒, 吳家銘, 劉清銘, 蕭金鳳, 盧治正, 胡姿穎, 孫世雲, 井庭玫, 楊士銘, 王少來, 林孟穎, 楊建輝, 鄭宏偉, 李峻強, 李仁豪, 王安琪, 吳佳琳, 劉奇玟, 林志平, 黃世亦, 錢柏清, 方欣怡, 黃俊美, 蕭欣怡, 蔡俊賢, 郭月梅, 方怡秀, 林昭洋, 楊佳蓉, 吳柏翔, 陳秉強, 鄭玉芳, 楊立偉, 劉祥琴, 吳怡臻, 林鈺城, 李怡惠, 林韋寶, 韓宜靜, 柳淑慧, 蔡宜旺, 李佳明, 梁振豪, 劉彥君, 吳淑湖, 張紀如, 劉怡禎, 陳穎薇, 烏志維, 涂筠韻, 李俊富, 王嘉成, 黃莉水, 王琇仲, 彭俊豪, 曹吉嘉, 陳韋伯, 周郁雯, 黃孟君, 楊雅晴, 韓又雪, 黃詩昀, 黃茂侑, 李純育, 吳紀亨, 金柏豪, 鄭丞玫, 鄧俊瑋, 林如依, 嵇介青, 陳逸琳, 鄧志宏, 郭倍郁, 朱佳蓉, 王冠伶, 吳建妹, 張淑泰, 謝綠禎, 林明源, 吳弘翰, 馮冠宇, 錢語珮, 林思賢, 陳聿士, 蔡宗翰, 林宜富, 黃淑玫, 黃雅青, 阮和韋, 劉冠宇, 林蓉富, 黃光卿, 陳建佑, 黃昆鑫, 林家銘, 金昶麟, 孫昕恩, 陳俐妹, 王宥威, 李家良, 胡詩雅, 黃家祥, 鄭冠雪, 陳志成, 查嘉韋, 芮志明, 白隆福, 張書雲, 林宜山, 王喜樺, 夏哲瑋, 陳志偉, 蔡淑慧, 詹育心, 蔡孟君, 曾秉淑, 吳信一, 張璇鴻, 張美蘋, 周茹茵, 盧巧妹, 吳家屏, 張美惠, 陳皇芸, 王泰貴, 黃于恭, 洪火靖, 農孟儒, 陳俊冰, 林映諭, 陳俞妏, 黃善為, 郭彥翔, 游映芬, 吳培樺, 張慧娟, 李文如, 林文君, 曾艾筠, 林怡安, 劉彥康, 劉美玲, 陳慶珠, 何舒婷, 劉家凡, 朱容伸, 徐敬其, 謝偉傑, 謝佳財, 吳宗樺, 鄭雅宣, 吳苑添, 謝旺樂, 陳信宏, 羅俊傑, 劉柏豪, 蔡嘉秋, 陳佳劭, 鐘雅婷, 羅欣潔, 黃郁發, 蔣學彥, 郭怡婷, 吳惠君, 陳志人, 陳威禾, 陳逸智, 蔡彥文, 張恩昀, 陳俊賢, 王怡君, 陳君南, 倪香汝, 胡雅茹, 常伊吟, 王雅良, 洪劭青, 吳堅廷, 高明憲, 蔡宗柏, 朱雨霖, 何思豪, 黃嘉祥, 阮麗卿, 龍智鈞, 吳淳禮, 戎哲維, 謝宗翰, 郭信豪, 陳芳元, 李順妏, 呂祖純, 陳家弘, 閔喜銘, 陳瑞文, 陳宗毅, 洪惟昕, 葉于倫, 黃哲偉, 邱淑宇, 朱宜靜, 丁琳妮, 潘中鴻, 翁嘉玲, 楊守恩, 陳得林, 羊人璇, 陳柏和, 毛玉華, 陳姿志, 江薇天, 林佩修, 蔡佩忠, 陳家慶, 王淑玲, 謝文一, 周佩禾, 李珮坤, 孫慧婷, 呂竹方, 張志豪, 羅偉銘, 孫惠雯, 鐘雅芬, 陳盈裕, 周怡婷, 董凡泉, 劉真萱, 曹志維, 王卉綺, 張淑良, 韓呈學, 翟雅玲, 蔡佩珊, 胡雅芬, 劉宏達, 夏政翰, 溫亦芸, 黃俊宏, 林湖雅, 潘緯儀, 房雅云, 許淑娟, 蔡君豪, 利依坤, 蔡志明, 張漢剛, 韓怡君, 許淑光, 丁俊宇, 陳阿俐, 楊玟能, 謝柏勇, 張俊賢, 包典能, 蔡心怡, 李思穎, 謝湘娟, 趙怡禎, 周丞梅, 謝華佩, 冷瑤惠, 劉慧萍, 陳惠妹, 鄭惠娟, 張山妹, 王欣潔, 楊欣瑩, 杜冠蓁, 曾雨侑, 姚純全, 黃玉琴, 林家銘, 蘇怡伶, 季香君, 劉俊佑, 周清鈺, 吳碧桂, 荀緯銘, 丁采瑋, 侯偉誠, 劉至丞, 林美華, 郭家卉, 黃家霖, 滑學希, 李嘉中, 姚志穎, 蔡有歡, 洪書為, 楊思穎, 陳建良, 劉思穎, 章伊韋, 張耀城, 陳世昌, 李育儒, 楊惠恭, 張姿婷, 陳昭州, 蔡彥航, 陳靜怡, 林立茵, 楊昕綸, 邱秀娟, 葉宜靜, 黃詩揚, 黃林來, 陳思穎, 黃雅惠"
RandomName = RandomName.split(", ")

const Top100 = {
    "items": [
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/72OVnXDzugvrCU25lMi9au",
          "name": "如果可以 - 電影\"月老\"主題曲"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/07plVccQ0N6FTTTonk3c2M",
          "name": "閣愛妳一擺"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/6jNy9WM3zyvG9E5bdVALl8",
          "name": "好不容易 (《華燈初上》片尾曲)"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/4fJlSLYLiu5trFCMZdSQDC",
          "name": "愛情你比我想的閣較偉大 -《當男人戀愛時》電影主題曲"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/5PjdY0CKGZdEuoNab3yDmX",
          "name": "STAY (with Justin Bieber)"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/3jdy4aOla1dwYIqwp69JJN",
          "name": "愛上你算我賤"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/1Ytgo9ipdlTsf6wlg6sXf3",
          "name": "在這座城市遺失了你 (戲劇《他們創業的那些鳥事》插曲)"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/6XBL9naPxZjATbmGAWGJ9V",
          "name": "飞鸟和蝉"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/69AvckyixY1AIGRYDZ1QnO",
          "name": "我很好騙"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/2VEt42QSQxILgEf9B50xxm",
          "name": "不是因為天氣晴朗才愛你"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/3OC84eKMxRJ4x0Hcwl9i4i",
          "name": "刻在我心底的名字 (Your Name Engraved Herein) - 電影<刻在你心底的名字>主題曲"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/0aue1Pz7kyJ1vLRlaCMxTx",
          "name": "妹妹"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/50nfwKoDiSYg8zOCREWAm5",
          "name": "Shivers"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/5Y47GrCrjQY44qFv8Gt0Gm",
          "name": "你不屬於我 - 《比悲傷更悲傷的故事》影集版片尾曲"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/46IZ0fSY2mpAiktS3KOqds",
          "name": "Easy On Me"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/4fouWK6XVHhzl78KzQ1UjL",
          "name": "abcdefu"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/5R3KGS53DCrlbi6cxECAEH",
          "name": "無人知曉"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/7tgzj2IqzSgUpxUhjmcF5m",
          "name": "披星戴月的想你"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/19fp9nI0tq0lcBl7XoCHAb",
          "name": "唯一 (三立/台視戲劇《戀愛是科學》插曲)"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/3rmo8F54jFF8OgYsqTxm5d",
          "name": "Bad Habits"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/4U0bL1ouvksMgvXU2aKq4O",
          "name": "间距"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/1IVj6CsBbTgOEpo0W6hgwN",
          "name": "嘉宾"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/3SJgTyb8a7z66suw0kBZ0T",
          "name": "失重前幸褔"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/53yiHIP3ptxWtT4ambRcgb",
          "name": "終究還是因為愛"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/5rY7xc2h5Imj6iFn97h8Qj",
          "name": "勇气"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/3HYsldPuR1FSOfxcKjwAvv",
          "name": "玻璃心"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/3V2v19gDm4rmRkMwcgS4X2",
          "name": "有些"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/69zgyr5HVKdInjeKpq1qHa",
          "name": "想見你想見你想見你(電視劇\"想見你\"片尾曲)"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/5cU1O9P0EDA0rPkPDykhIm",
          "name": "怎麼了"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/3CEkc8f1UDvI7kohz3ARpA",
          "name": "炙愛 - 女聲版"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/186NCtNk1tUYS7c2DxgJ7O",
          "name": "Christmas Tree"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/0dS8gBiRyiohkB2Z45rA0V",
          "name": "Have A Nice Day"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/2qlUhwv6Hqx5ZZHCucRlGF",
          "name": "與我無關"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/0TqOMBOKodVMnr1NgMwOt7",
          "name": "因為是你 - 原創影集《火神的眼淚》片頭曲"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/7a6VJHMS9ttKsj55cKC51G",
          "name": "浪流連"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/1r9xUipOqoNwggBpENDsvJ",
          "name": "Enemy (with JID) - from the series Arcane League of Legends"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/4iJyoBOLtHqaGxP12qzhQI",
          "name": "Peaches (feat. Daniel Caesar & Giveon)"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/4E5PyVOBH25CICgTURwGXM",
          "name": "CHANGE"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/5f939ccwoOJXxU2Sj6RxU4",
          "name": "以年為單位的愛情(電影《以年為單位的戀愛》片尾主題曲)"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/1nH2PkJL1XoUq8oE6tBZoU",
          "name": "Sacrifice"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/46HNZY1i7O6jwTA7Slo2PI",
          "name": "My Universe"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/4PMakIBWXujbe2MIsuZtOc",
          "name": "對等關係 (feat. 張惠妹)"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/0KWnRv3wxjltYVB3MqjNd2",
          "name": "Without You"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/2bLGJ6yOPN4fAKQkLrJYxp",
          "name": "hair tie"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/5Z9KJZvQzH6PFmb8SNkxuk",
          "name": "INDUSTRY BABY (feat. Jack Harlow)"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/41xYqsuvsCcmCHDTdqPfHY",
          "name": "Way Up"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/7n2FZQsaLb7ZRfRPfEeIvr",
          "name": "ELEVEN"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/27FOde2nUw0pFuj7hlPbaS",
          "name": "愛人錯過"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/2Qxaglvzsc0129JB4O0XCF",
          "name": "我反芻著你留下的寂寞"
        }
      },
      {
        "track": {
          "href": "https://api.spotify.com/v1/tracks/7unyqNvWBxK0LHQ0sqrEar",
          "name": "摩登愛情 (feat. Julia Wu)"
        }
      }
    ]
  }

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
   }
   return result;
}


const initDB = () => {
    RandomName.map((name) => {
        var date = new Date()
        var song = Top100.items[getRandomInt(0, Top100.items.length)]
        var url = song.track.href.split("/")
        const user = userModel({
            id: makeid(11),
            name: name, 
            lat: getRandomArbitrary(TaipeiBounds.south, TaipeiBounds.north),
            lng: getRandomArbitrary(TaipeiBounds.east, TaipeiBounds.west),
            songID: url[url.length - 1],
            songName: song.track.name,
            imageURL: "",
            lastModifiedDate: date.setDate(date.getDate() + 5) //set expired time here
        })
        user.save()
    })
}

export default initDB