import Address from "../models/Address.js"; 

class AddressController {
  async create (req, res) {
    try {
      const newAddress = await Address.create(req.body);
      res.status(201).json(newAddress); 
    }catch (err){
      console.log(err);
    }
  }

  async update (req, res) {
    const id = req.params.id;
    const result = await Address.findOne({
      where: {
        id: id
      }
    });

    if(result) {
      await result.update(req.body); 
      res.json({message: "address update"})
    }else{
      res.status(404).json({message: "erro validate all date"})
    }
  }

  async delete (req, res){
    const result = await Address.findByPk(req.params.id);
    console.log(result)

    if(!result){
      res.json({message: "adrress not found"})
    }
    await result.destroy();
    res.status(200).json({message: "Address deleted sucessufuly"}) 
  }
}
export default new AddressController; 