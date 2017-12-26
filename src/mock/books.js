const qs = require('qs');
const mockjs = require('mockjs');

const Random = mockjs.Random;

let booksListData = {};

if (!global.booksListData) {
  const data = mockjs.mock({
    'data|30': [{
      'id|+1': 1,
      'name': () => {
        return Random.cname();
      },
      'author': () => {
        return Random.name();
      },
      'publish': () => {
        return 'www.baid.com';
      },
      'type': () => {
        return 'paper';
      },
      'classType': () => {
        return 'art';
      },
      'location': () => {
        return '书架';
      },
      'owner': () => {
        return '公用';
      },
      'barcode': () => {
        return 'sdfds';
      },
      'abstracts': () => {
        return '摘要';
      },
      'price': () => {
        return '76.00';
      },
      'borrower': () => {
        return '张三';
      },
      'planReturnDate': () => {
        return null;
      },
      'idLoanBook': () => {
        return 1111;
      },
      'idBookLog': () => {
        return 2222;
      },
      'status': () => {
        return '空闲';
      },
    }],
    'page': {
      total: 30,
      current: 1,
    },
  });
  booksListData = data;
  global.booksListData = booksListData;
} else {
  booksListData = global.booksListData;
}

const adminUsers = [
  {
    'username': 'admin',
    'password': 'admin',
  },
];

module.exports = {

  'POST /book/books'(req, res) {
    const id = booksListData.page.total + 1;
    booksListData.page.total = booksListData.page.total + 1;

    booksListData.data.push({
      id: id,
      name: req.body.name,
      author: req.body.author,
      publish: req.body.publish,
      type: req.body.type,
      classType: req.body.classType,
      location: req.body.location,
      owner: req.body.owner,
      barcode: req.body.barcode,
      abstracts: req.body.abstracts,
      price: req.body.price,
      borrower: req.body.borrower,
      planReturnDate: req.body.planReturnDate,
      status: req.body.status,
    });
    setTimeout(() => {
      res.json({
        id: id,
      });
    }, 200);
  },

  'POST /book/login'(req, res) {
    const { userName, password } = req.body;
    const user = adminUsers.filter((item) => item.username === userName);

    if (user.length > 0 && user[0].password === password) {
      res.json({ resultCode: '000000', resultMesg: '数据请求成功' });
    } else {
			// res.status(400).end()
      res.json({ resultCode: '111111', resultMesg: '数据请求失败' });
    }
  },
	
  'POST /book/register'(req, res) {
    const data = req.body;
    if (data.username.length > 0 && data.password.length > 0) {
      res.json({ resultCode: '000000', resultMesg: '数据请求成功' });
    } else {
			 res.status(400).end();
    }
  },

  'GET /book/books'(req, res) {
    const page = qs.parse(req.query);
    const pageSize = pageSize || 5;
    const currentPage = page.page || 1;

    let data;
    let newPage;
    const newData = booksListData.data.concat();

    if (page.field) {
      const d = newData.filter((item) => {
        return item[page.filed].indexOf(page.keyword) > -1;
      });

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);

      newPage = {
        current: currentPage * 1,
        total: d.length,
      };
    } else {
      data = booksListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      booksListData.page.current = currentPage * 1;

      newPage = {
        current: booksListData.page.current,
        total: booksListData.page.total,
      };
    }
    setTimeout(() => {
      res.setHeader('x-total-count', booksListData.page.total);
      res.json({
        'booksListData': booksListData.data,
      });
    }, 200);
  },

  'DELETE /book/books/:id'(req, res) {
    const id = parseInt(req.params.id, 10);
    booksListData.data = booksListData.data.filter((item) => {
			// return item.id === id ? false : true;
      if (item.id === id) {
        return false;
      } else {
        return true;
      }
    });

    setTimeout(() => {
      res.json({
        id: id,
      });
    }, 200);
  },
	
  'POST /book/books'(req) {
    const { values } = req.body;
    booksListData.data.forEach((item, index) => {
      if (item.name === values) {
				  booksListData = booksListData.data.splice(index, 1);
      }
      return true;
    });
  },

  'PATCH /book/books/:id'(req, res) {
    const id = parseInt(req.params.id, 10);


    booksListData.data.forEach((item, index) => {
      if (item.id === id) {
        booksListData = booksListData.data.splice(index, 1, {
          id: id,
          name: req.body.name,
          author: req.body.author,
          publish: req.body.publish,
          type: req.body.type,
          classType: req.body.classType,
          location: req.body.location,
          owner: req.body.owner,
          barcode: req.body.barcode,
          abstracts: req.body.abstracts,
          price: req.body.price,
          borrower: req.body.borrower,
          planReturnDate: req.body.planReturnDate,
          status: req.body.status,
        });
        return true;
      }
    });
    setTimeout(() => {
      res.json({
        id: id,
      });
    }, 200);
  },

  
};
booksListData.data;