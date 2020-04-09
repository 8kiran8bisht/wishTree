const products=
{
    productDB:[],

    init()
    {
        
        this.productDB.push(
            {
                name:`bc01`,
                category:`Baby-Care`,
                page:`/product/babyCare`,
                img:`../img/b2.PNG`,
                price:150,
                onHome:0,
                promotion:0,
                bestseller:0,
                description:` BreatheFrida The 3-in-1 Humidifier, Diffuser + Nightlight `
            });
            this.productDB.push(
                {
                    name:`bc02`,
                    category:`Baby-Care`,
                    page:`/product/babyCare`,
                    img:`../img/b0.jpg`,
                    price:100,
                    onHome:1,
                    onProductList:1,
                    promotion:0,
                    bestseller:0,
                    description:` BreatheFrida The 3-in-1 Humidifier, Diffuser + Nightlight `
                });   
        this.productDB.push(
            {
                name:`bc03`,
                category:`Baby-Care`,
                page:`/product/babyCare`,
                img:`../img/b3.PNG`,
                price:400,
                onHome:0,
                promotion:0,
                bestseller:1,
                description:` Contours Journey 5-in-1 Baby Carrier `
            });
        this.productDB.push(
            {
                name:`bc04`,
                category:`Baby-Care`,
                page:`/product/babyCare`,
                img:`../img/b4.PNG`,
                price:100,
                onHome:0,
                promotion:0,
                bestseller:1,
                description:` Bribht Starts Toucan Tango Bouncer `
            });
        this.productDB.push(
            {
                name:`bc05`,
                category:`Baby-Care`,
                page:`/product/babyCare`,
                img:`../img/b5.PNG`,
                price:80,
                onHome:0,
                promotion:1,
                bestseller:1,
                description:` Sensory Play Space Newborn-to-Toddler Discovery Gym `
             });
        this.productDB.push(
            {
                name:`bc06`,
                category:`Baby-Care`,
                page:`/product/babyCare`,
                img:`../img/b6.PNG`,
                price:120,
                onHome:0,
                promotion:1,
                bestseller:1,
                description:` The Original Baby Bullet`
            });
            this.productDB.push(
                {
                    name:`bc06`,
                category:`Baby-Care`,
                page:`/product/babyCare`,
                img:`../img/b1.PNG`,
                price:60,
                onHome:0,
                promotion:1,
                bestseller:1,
                description:` Barun-Age Precision Digital Thermometer `
                    });
        this.productDB.push(
            {
            
            category:`Electronics`,
            img:`../img/e2.PNG`,
            price:200,
            onHome:0,
            promotion:0,
            bestseller:1,
            description:` Waterproof Bluetooth Wireless Speaker`
            });

        this.productDB.push(
            {
            category:`Valentine's Day`,
            page:`/product/valentine`,
            img:`../img/v0.jpg`,
            price:100,
            onHome:1,
            onProductList:1,
            promotion:0,
            bestSeller:1,
    
        });
        this.productDB.push(
            {
            category:`Valentine's Day`,
            page:`/product/valentine`,
            img:`../img/v1.jpg`,
            price:100,
            onHome:0,
            promotion:0,
            bestSeller:0,
            description:`500 gram, heart shaped cookies filled with chocolate`
        });
        this.productDB.push(
            {
            category:`Valentine's Day`,
            page:`/product/valentine`,
            img:`../img/v2.jpg`,
            price:1000,
            onHome:0,
            promotion:0,
            bestSeller:1,
            description:`white gold ring with swarovski crysta `
        });
        
        this.productDB.push(
            {
            category:`Valentine's Day`,
            page:`/product/valentine`,
            img:`../img/v3.jpg`,
            price:200,
            onHome:0,
            promotion:0,
            bestSeller:1,
            description:`set of two teddy bear pair with heart shape pillow`
        
        });
        this.productDB.push(
            {
            category:`Valentine's Day`,
            page:`/product/valentine`,
            img:`../img/v4.jpg`,
            promotion:0,
            price:50,
            onHome:0,
            bestSeller:1,
            description:`valentine day card with 2 heart sticks`
        });
        this.productDB.push(
            {
            category:`Valentine's Day`,
            page:`/product/valentine`,
            img:`../img/v5.jpg`,
            price:100,
            onHome:0,
            promotion:0,
            bestSeller:0,
            description:`teddy bear with flower bouquet`
        });
        this.productDB.push(
            {
            category:`Promotion`,
            page:`/product/onPromotion`,
            img:`../img/s00.jpg`,
            promotion:0,
            onHome:0,
            bestSeller:1,
            price:200,
            description:`brown leather school shoes with rubber sole`
        });
        this.productDB.push(
            {
            category:`Promotion`,
            page:`/product/promotion`,
            onHome:0,
            img:`../img/s01.jpg`,
            promotion:0,
            bestSeller:1,
            price:250,
            description:`red high heel women sandals`
        });
        this.productDB.push(
            {
            category:`Promotion`,
            page:`/product/promotion`,
            img:`../img/c1.jpg`,
            promotion:1,
            bestSeller:0,
            price:50,
            description:`orange pure cotton shirt`
        });
        this.productDB.push(
            {
            category:`Promotion`,
            page:`/product/promotion`,
            img:`../img/c4.jpg`,
            promotion:1,
            bestSeller:0,
            price:80,
            description:'white women shoes'
        });
        this.productDB.push(
            {
            category:`Promotion`,
            page:`/product/onPromotion`,
            img:`../img/02.jpg`,
            onProductList:1
        });
        this.productDB.push(
            {
            category:`Best Seller`,
            page:`/product/bestSeller`,
            img:`../img/b.jpg`,
            onProductList:1 
        });
        this.productDB.push(
            {
            category:`Promotion`,
            page:`/product/promotion`,
            img:`../img/s02.jpg`,
            promotion:0,
            onHome:0,
            bestSeller:1,
            price:80,
            description:`women plage shirt-cotton `
        });
        this.productDB.push(
            {
            category:`Baby-Care`,
            img:`../img/b1.PNG`,
            price:100,
            }
        );                        
        this.productDB.push(
            {
            category:`Electronics`,
            img:`../img/e.PNG`,
            onHome:0,
            promotion:1,
            bestseller:0,
            price:100,
            description:` Acer 27”1080p Hd 75Hz 1ms GtG TN LED Gaming Monitor `
            }
        );
        this.productDB.push(
            {
            category:`Electronics`,
            page:`/product/electronics`,
            img:`../img/e3.PNG`,
            price:150,
            onHome:0,
            promotion:1,
            bestseller:0,
            description:` Ear Noise Cancelling Bluetooth Headphone`
        });    
      
        this.productDB.push(
            {
            category:`Electronics`,
            page:`/product/electronics`,
            img:`../img/e4.PNG`,
            price:200,
            onHome:0,
            promotion:1,
            bestseller:1,
            description:` Smartwatch – Amazon Alexa & heart rate tracking`
        });        
        this.productDB.push(
            {
            category:`Electronics`,
            page:`/product/electronics`,
            img:`../img/e5.PNG`,
            price:700,
            onHome:0,
            promotion:1,
            bestseller:1,
            description:` Hp 15.6” Laptop( A6-9225 Processor/1TB HDD/8GB RAM/Windows 10)`
        });
        this.productDB.push(
            {
            category:`Electronics`,
            page:`/product/electronics`,
            img:`../img/e6.PNG`,
            price:500,
            onHome:0,
            promotion:1,
            bestseller:0,
            description:` Xbox One Elite Series 2 Wireless Controller`
        });
        this.productDB.push(
            {
            category:`Electronics`,
            page:`/product/electronics`,
            img:`../img/E0.jpg`,
            price:500,
            onHome:1,
            onProductList:1,
            promotion:0,
            bestseller:0,
            description:` Xbox One Elite Series 2 Wireless Controller`
        });
        this.productDB.push(
            {
            category:`Shoes`,
            page:`/product/shoes`,
            img:`../img/s1.PNG`,
            price:100,
            onHome:0,
            promotion:0,
            bestseller:0,
            description:` adidas ( Sole:rubber  Material: Leather)`
        });                    
        this.productDB.push(
            {
            category:`Shoes`,
            page:`/product/shoes`,
            img:`../img/s2.PNG`,
            price:80,
            onHome:0,
            promotion:1,
            bestseller:1,
            description:` lacoste( Sole:rubber  Material: Leather)`
            }
        );                       
        this.productDB.push(
            {
            category:`Shoes`,
            page:`/product/shoes`,
            img:`../img/s3.PNG`,
            price:70,
            onHome:0,
            promotion:0,
            bestseller:1,
            description:` converse(Sole:rubber  Material:fabric)`
            }
        );
        this.productDB.push(
            {
            category:`Shoes`,
            page:`/product/shoes`,
            img:`../img/s0.jpg`,
            price:120,
            onHome:1,
            onProductList:1,
            promotion:0,
            bestseller:1,
            description:` converse(Sole:rubber  Material:fabric)`
            }
        );
        this.productDB.push(
            {
            category:`Shoes`,
            page:`/product/shoes`,
            img:`../img/s4.PNG`,
            price:100,
            onHome:0,
            promotion:0,
            bestseller:1,
            description:` lacoste ( Sole:rubber  Material: Leather)`
            }
        );                                
        this.productDB.push(
            {
            category:`Shoes`,
            page:`/product/shoes`,
            img:`../img/s5.PNG`,
            price:110,
            onHome:0,
            promotion:0,
            bestseller:1,
            description:` lascoste ( Sole:rubber  Material: Leather)`
            }
        );
        this.productDB.push(
            {
            category:`Shoes`,
            page:`/product/shoes`,
            img:`../img/s6.PNG`,
            price:120,
            onHome:0,
            promotion:0,
            bestseller:1,
            description:` Fila ( Sole:rubber  Material: Leather)`
            }
        );                                               
    },
    getProductList(){
        arrHommePage=[];
        arrHommePage=[];
        this.productDB.forEach(element=>{
            if(element.onProductList==1)
            arrHommePage.push(element);
        }

        )
        return arrHommePage;

    },
    getProductById(id){
        arrHommePage=[];
        this.productDB.forEach(element=>{
            if(element.name==id)
            arrHommePage.push(element);
        }

        )
        return arrHommePage;

    },
    getAllProducts()
    {
        arrHommePage=[];
        this.productDB.forEach(element=>{
            if(element.onHome==1)
            arrHommePage.push(element);
        }

        )
        return arrHommePage;
    },
    getAllShoes()
    {
        arrHommePage=[];
        this.productDB.forEach(element=>{
            if(element.category==`Shoes` && element.onHome==0)
            arrHommePage.push(element);
        }

        )
        return arrHommePage;
    },
    getAllVday()
    {
        arrHommePage=[];
        this.productDB.forEach(element=>{
            if(element.category==`Valentine's Day` && element.onHome==0)
            arrHommePage.push(element);
        }

        )
        return arrHommePage;
    },
    getAllElectronics()
    {
        arrHommePage=[];
        this.productDB.forEach(element=>{
            if(element.category==`Electronics` && element.onHome==0)
            arrHommePage.push(element);
        }

        )
        return arrHommePage;
    },
    getAllbabyCare()
    {
        arrHommePage=[];
        this.productDB.forEach(element=>{
            if(element.category==`Baby-Care` && element.onHome==0)
            arrHommePage.push(element);
        }

        )
        return arrHommePage;
    },
    getAllPromotion()
    {
        arrPromo=[];
        this.productDB.forEach(element=>{
            if(element.promotion==1 && element.onHome==0)
            arrPromo.push(element);
        }

        )
        return arrPromo;
    },
    getBestSeller()
    {
        bestSeller=[];
        this.productDB.forEach(element=>{
            if(element.bestSeller==1 && element.onHome==0)
            bestSeller.push(element);
        }

        )
        return bestSeller;
    }
}

products.init();
module.exports=products;