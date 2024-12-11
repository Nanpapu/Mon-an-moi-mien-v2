import { Region } from '../types';

export const regions: Region[] = [
  {
    id: '1',
    name: 'Miền Bắc',
    coordinate: {
      latitude: 21.0285,
      longitude: 105.8542,
    },
    recipes: [
      {
        id: 'nb1',
        name: 'Phở Hà Nội',
        region: 'Miền Bắc',
        image: 'https://photo.znews.vn/w1920/Uploaded/qhj_pwqvdvicbu/2021_10_12/food.is.love13..jpeg',
        ingredients: [
          'Bánh phở',
          'Thịt bò',
          'Xương bò',
          'Hành tây',
          'Gừng',
          'Gia vị phở',
        ],
        instructions: [
          'Ninh xương bò với gừng và hành tây trong 6-8 tiếng',
          'Thái thịt bò mỏng',
          'Trần bánh phở',
          'Lắp ráp các nguyên liệu và thêm nước dùng',
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Miền Trung',
    coordinate: {
      latitude: 16.0544,
      longitude: 108.2022,
    },
    recipes: [
      {
        id: 'mt1',
        name: 'Mì Quảng',
        region: 'Miền Trung',
        image: 'https://example.com/miquang.jpg',
        ingredients: [
          'Mì Quảng',
          'Tôm',
          'Thịt heo',
          'Đậu phộng',
          'Rau sống',
          'Bánh tráng',
        ],
        instructions: [
          'Nấu nước dùng từ xương heo',
          'Làm sốt từ ớt, tỏi, dầu điều',
          'Trần mì',
          'Bày trí các nguyên liệu và chan nước dùng',
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Miền Nam',
    coordinate: {
      latitude: 10.7769,
      longitude: 106.7009,
    },
    recipes: [
      {
        id: 'mn1',
        name: 'Hủ tiếu Nam Vang',
        region: 'Miền Nam',
        image: 'https://example.com/hutieunamvang.jpg',
        ingredients: [
          'Bánh hủ tiếu',
          'Thịt heo',
          'Tôm',
          'Gan heo',
          'Giá đỗ',
          'Hành lá',
        ],
        instructions: [
          'Nấu nước dùng từ xương heo và tôm',
          'Sơ chế các loại thịt và hải sản',
          'Trần bánh hủ tiếu',
          'Bày trí và chan nước dùng',
        ],
      },
    ],
  },
]; 