const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags include its associated Product data
  try {
    const tagdata = await Tag.findAll({
      include: [ {model: Product} ]
    })
    res.status(200).json(tagdata);
  } catch {
    res.status(500).json(err);
  }
 
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` include its associated Product data

  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [ {model: Product } ]
    });
  
    if (!tag) {
      res.status(404).json({message: "No Tag found with this id"});
      return;
    }
  
    res.status(200).json(tag);
  } catch {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {

  // Example
  // {
  //   "tag_name": "black",
  //   "productID": [1,3]
  // }


  // create a new tag
  try {
    Tag.create(req.body)
    .then((tag) => {
      if (req.body.productID.length) {
        const tagIdArray = req.body.productID.map((product_id) => {
          return {
            tag_id: tag.id,
            product_id,
          };
        });
        return ProductTag.bulkCreate(tagIdArray);
      }

      res.status(200).json(tag);
    })
      .then((tagIds) => res.status(200).json(tagIds))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } catch {
    res.status(500).json(err);
  }
  
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
 
  try {
    const updateTag = await Tag.update(req.body, {
      where: { id: req.params.id }
    })
    res.status(200).json(updateTag)
  } catch {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tag = await Tag.findByPk(req.params.id);

  if (!tag) {
    res.json({message: "This tag does not exist"});
    return
  }

  tag.destroy().then(res.status(200).json(tag));
});

module.exports = router;
