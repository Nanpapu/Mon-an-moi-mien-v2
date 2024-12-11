import { Region } from '../types';

export const regions: Region[] = [
  {
    id: '01',
    name: 'Hà Nội',
    coordinate: {
      latitude: 21.0285,
      longitude: 105.8542,
    },
    recipes: [
      {
        id: '01_01',
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
    id: '48',
    name: 'Đà Nẵng',
    coordinate: {
      latitude: 16.0544,
      longitude: 108.2022,
    },
    recipes: [
      {
        id: '48_01',
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
    id: '79',
    name: 'TP. Hồ Chí Minh',
    coordinate: {
      latitude: 10.7769,
      longitude: 106.7009,
    },
    recipes: [
      {
        id: '79_01',
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
  {
    id: '46',
    name: 'Huế',
    coordinate: {
      latitude: 16.4637,
      longitude: 107.5909,
    },
    recipes: [
      {
        id: '46_01',
        name: 'Cơm Hến Huế',
        region: 'Miền Trung',
        image: 'https://example.com/comhenhu.jpg',
        ingredients: [
          'Cơm',
          'Thịt heo',
          'Tôm',
          'Gan heo',
          'Giá đỗ',
          'Hành lá',
        ],
        instructions: [
          'Nấu nước dùng từ xương heo',
          'Làm sốt từ ớt, tỏi, dầu điều',
          'Trần cơm',
          'Bày trí các nguyên liệu và chan nước dùng',
        ],
      },
    ],
  },
  {
    id: '31',
    name: 'Hải Phòng',
    coordinate: {
      latitude: 20.8449,
      longitude: 106.6881,
    },
    recipes: [
      {
        id: '31_01',
        name: 'Bánh Đa Cua',
        region: 'Miền Bắc',
        image: 'https://example.com/banhdcua.jpg',
        ingredients: [
          'Bánh Đa Cua',
          'Thịt bò',
          'Tôm',
          'Gan heo',
          'Giá đỗ',
          'Hành lá',
        ],
        instructions: [
          'Nấu nước dùng từ xương heo',
          'Làm sốt từ ớt, tỏi, dầu điều',
          'Trần bánh Đa Cua',
          'Bày trí các nguyên liệu và chan nước dùng',
        ],
      },
    ],
  },
  {
    id: '56',
    name: 'Nha Trang',
    coordinate: {
      latitude: 12.2388,
      longitude: 109.1967,
    },
    recipes: [
      {
        id: '56_01',
        name: 'Bún Cá Nha Trang',
        region: 'Miền Trung',
        image: 'https://example.com/bunca.jpg',
        ingredients: [
          'Bún Cá',
          'Tôm',
          'Thịt cá',
          'Rau sống',
          'Hành lá',
          'Gia vị bún cá',
        ],
        instructions: [
          'Nấu nước dùng từ xương cá',
          'Làm sốt từ ớt, tỏi, dầu điều',
          'Trần bún cá',
          'Bày trí các nguyên liệu và chan nước dùng',
        ],
      },
    ],
  },
  {
    id: '92',
    name: 'Cần Thơ',
    coordinate: {
      latitude: 10.0452,
      longitude: 105.7469,
    },
    recipes: [
      {
        id: '92_01',
        name: 'Bún Riêu Cần Thơ',
        region: 'Miền Nam',
        image: 'https://example.com/bunrieucan.jpg',
        ingredients: [
          'Bún Riêu',
          'Thịt heo',
          'Tôm',
          'Gan heo',
          'Giá đỗ',
          'Hành lá',
        ],
        instructions: [
          'Nấu nước dùng từ xương heo',
          'Làm sốt từ ớt, tỏi, dầu điều',
          'Trần bún riêu',
          'Bày trí các nguyên liệu và chan nước dùng',
        ],
      },
    ],
  },
  {
    id: '91',
    name: 'Phú Quốc',
    coordinate: {
      latitude: 10.2896,
      longitude: 103.8520,
    },
    recipes: [
      {
        id: '91_01',
        name: 'Bún Kèn Phú Quốc',
        region: 'Miền Nam',
        image: 'https://example.com/bunken.jpg',
        ingredients: [
          'Bún Kèn',
          'Thịt cá',
          'Tôm',
          'Gan heo',
          'Giá đỗ',
          'Hành lá',
        ],
        instructions: [
          'Nấu nước dùng từ xương cá',
          'Làm sốt từ ớt, tỏi, dầu điều',
          'Trần bún kèn',
          'Bày trí các nguyên liệu và chan nước dùng',
        ],
      },
    ],
  },
  {
    id: '22',
    name: 'Hạ Long',
    coordinate: {
      latitude: 20.9591,
      longitude: 107.0423,
    },
    recipes: [
      {
        id: '22_01',
        name: 'Chả Mực Hạ Long',
        region: 'Miền Bắc',
        image: 'https://example.com/chamuc.jpg',
        ingredients: [
          'Chả Mực',
          'Thịt bò',
          'Tôm',
          'Gan heo',
          'Giá đỗ',
          'Hành lá',
        ],
        instructions: [
          'Nấu nước dùng từ xương heo',
          'Làm sốt từ ớt, tỏi, dầu điều',
          'Trần chả mực',
          'Bày trí các nguyên liệu và chan nước dùng',
        ],
      },
    ],
  }
]; 