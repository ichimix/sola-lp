/**
 * 予約デモ用レッスンデータ
 * 名駅店・栄店：2026年4月スケジュール（50分/1レッスン）
 * 名駅店：月曜定休。栄店：金曜定休。曜日は 0=日〜6=土。
 * 月次で差し替え想定。本番ではAPI/在庫確認に置き換え。
 */
(function (global) {
  /**
   * oaMessage 用の基本ID（@から始まる）。
   * lin.ee/sQ5iTts のテスト公式アカウントの「基本ID」を LINE Official Account Manager で確認し、差し替えてください。
   */
  var LINE_OA_BASIC_ID = '@pif1465v';

  var STORES = {
    meieki: { id: 'meieki', name: '名駅店', lineUrl: 'https://lin.ee/sQ5iTts' },
    sakae:  { id: 'sakae',  name: '栄店',  lineUrl: 'https://lin.ee/sQ5iTts' }
  };

  // 曜日: 0=日, 1=月, ... 6=土
  var DAYS = [
    { value: 0, label: '日曜日' },
    { value: 1, label: '月曜日' },
    { value: 2, label: '火曜日' },
    { value: 3, label: '水曜日' },
    { value: 4, label: '木曜日' },
    { value: 5, label: '金曜日' },
    { value: 6, label: '土曜日' }
  ];

  // 店舗ID → 曜日(0-6) → レッスン配列 { time, name }（開始時刻・レッスン名）
  var LESSONS = {
    meieki: {
      0: [
        { time: '09:40', name: 'リラックス' },
        { time: '11:20', name: '疲労回復' },
        { time: '13:00', name: '太陽礼拝フロー' }
      ],
      1: [],
      2: [
        { time: '09:30', name: 'リラックス' },
        { time: '11:30', name: 'リフレッシュ' },
        { time: '18:10', name: 'スタイルアップ' },
        { time: '19:50', name: 'リラックス' },
        { time: '21:10', name: '疲労回復' }
      ],
      3: [
        { time: '09:30', name: '初級 マットピラティス' },
        { time: '11:30', name: '肩甲骨ヨガ' },
        { time: '18:10', name: 'ブリージング' },
        { time: '19:50', name: '骨盤調整' },
        { time: '21:10', name: '睡眠のためのヨガ（30分）' }
      ],
      4: [
        { time: '09:30', name: 'トータルケアヨガ' },
        { time: '11:30', name: '太陽礼拝フロー' },
        { time: '18:10', name: 'トータルケアヨガ' },
        { time: '19:50', name: '骨盤調整' },
        { time: '21:10', name: 'ヒーリング' }
      ],
      5: [
        { time: '09:30', name: '骨盤リラックス' },
        { time: '11:30', name: 'シェイプ' },
        { time: '18:10', name: 'デトックス' },
        { time: '19:50', name: '脂肪燃焼' }
      ],
      6: [
        { time: '08:00', name: '整体ヨガ' },
        { time: '09:40', name: '代謝UP' },
        { time: '11:20', name: '骨盤調整' },
        { time: '13:00', name: 'コアヨガ' },
        { time: '14:30', name: 'トータルケアヨガ' }
      ]
    },
    sakae: {
      0: [
        { time: '10:00', name: '太陽礼拝フロー' },
        { time: '11:40', name: 'お腹シェイプ' },
        { time: '13:20', name: '骨盤調整' },
        { time: '14:50', name: 'リフレッシュ' },
        { time: '16:30', name: '肩甲骨ヨガ' }
      ],
      1: [
        { time: '10:30', name: 'リフレッシュ' },
        { time: '12:30', name: 'デトックス' },
        { time: '14:10', name: 'リラックス' },
        { time: '18:10', name: '太陽礼拝フロー' },
        { time: '19:50', name: '骨盤リラックス' },
        { time: '21:10', name: 'ナイトヨガ' }
      ],
      2: [
        { time: '10:30', name: 'ブリージング' },
        { time: '12:30', name: '脂肪燃焼' },
        { time: '14:10', name: 'マットピラティス' },
        { time: '17:40', name: 'ハタヨガベーシック' },
        { time: '18:40', name: 'ヒーリング' },
        { time: '19:40', name: '太陽礼拝フロー' }
      ],
      3: [
        { time: '10:30', name: 'リフレッシュ' },
        { time: '12:30', name: '骨盤リラックス' },
        { time: '14:10', name: 'スタイルアップ' },
        { time: '18:10', name: 'リフレッシュ' },
        { time: '19:50', name: 'デトックス' }
      ],
      4: [
        { time: '10:30', name: '太陽礼拝フロー' },
        { time: '12:30', name: '整体ヨガ' },
        { time: '14:10', name: 'むくみ改善ヨガ' },
        { time: '17:40', name: 'マットピラティス' },
        { time: '18:40', name: '美ボディ' },
        { time: '19:40', name: '骨盤調整' },
        { time: '21:10', name: 'リラックス' }
      ],
      5: [],
      6: [
        { time: '08:30', name: '太陽礼拝フロー' },
        { time: '10:00', name: 'デトックス' },
        { time: '11:40', name: 'リセットヨガ' },
        { time: '13:20', name: 'スタイルアップ' },
        { time: '14:50', name: '骨盤リラックス' },
        { time: '16:30', name: 'トータルケアヨガ' },
        { time: '18:00', name: 'リラックス' }
      ]
    }
  };

  function getStores() { return STORES; }
  function getDays() { return DAYS; }
  function getLessons(storeId, dayOfWeek) {
    var byStore = LESSONS[storeId];
    if (!byStore) return [];
    return byStore[dayOfWeek] || [];
  }
  function getStoreName(storeId) {
    var s = STORES[storeId];
    return s ? s.name : '';
  }
  function getLineUrl(storeId) {
    var s = STORES[storeId];
    return s ? s.lineUrl : '';
  }

  /** https://line.me/R/oaMessage/{@ID}/?{URLエンコード済みメッセージ} */
  function buildOaMessageHref(messageText) {
    var id = LINE_OA_BASIC_ID.indexOf('@') === 0 ? LINE_OA_BASIC_ID : '@' + LINE_OA_BASIC_ID;
    return 'https://line.me/R/oaMessage/' + id + '/?' + encodeURIComponent(messageText || '');
  }

  function getLineOaBasicId() {
    return LINE_OA_BASIC_ID;
  }

  global.RESERVATION_DATA = {
    getStores: getStores,
    getDays: getDays,
    getLessons: getLessons,
    getStoreName: getStoreName,
    getLineUrl: getLineUrl,
    buildOaMessageHref: buildOaMessageHref,
    getLineOaBasicId: getLineOaBasicId
  };
})(typeof window !== 'undefined' ? window : this);
