const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories and includes Product
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoriesData);
  } catch {
    res.status(500).json(err);
  }
})

router.get('/:id', async (req, res) => {
  // find one category by its `id` value

  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with that id'});
      return;
    }

    res.status(200).json(category);

  } catch {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    Category.create({
      category_name: req.body.category_name,
    })
      .then((newCategory) => {
        res.json(newCategory);
      })
      .catch((err) => {
        res.json(err);
      })
  } catch {
    res.status(500).json(err);
  }
  
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
  
    if (!category) {
      res.status(404).json({ message: 'No category found with that id'});
      return;
    }
    category.update({
      category_name: req.body.category_name,
    })
      .then((newCategory) => {
        res.json(newCategory);
      })
      .catch((err) => {
        res.json(err);
      });

  } catch {
    res.status(500).json(err);
  }
  

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
  
    if (!category) {
      res.status(404).json({ message: 'No category found with that id'});
      return;
    }
  
    category.destroy()
      .then(res.status(200).json(category));
  
  } catch {
    res.status(500).json(err);
  }
  
  
});

module.exports = router;
