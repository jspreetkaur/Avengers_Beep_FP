document.getElementById('data').onclick = () => {
 
    let request = window.indexedDB.open("products", 1)
        , db, transition, store, index
        ;

    request.onupgradeneeded = (e) => {
        let db = request.result;
        let store = db.createObjectStore("product", { keyPath: "id" });
        let index = store.createIndex("name", "name", { unique: false });
        let storewishlist = db.createObjectStore("wishlist", { keyPath: "xid", autoIncrement: true });
        let indexwishlist = storewishlist.createIndex("name", "name", { unique: false });
        let indexwishlist2 = storewishlist.createIndex("mail", "mail", { unique: false });
        let storedetails = db.createObjectStore("details", { keyPath: "id" });
        let indexdetails = storedetails.createIndex("name", "name", { unique: false });
        let managestore = db.createObjectStore("orders", { keyPath: "mid", autoIncrement: true });
        let indexmanage = managestore.createIndex("name", "name", { unique: false });
        let indexmanage2 = managestore.createIndex("mail", "mail", { unique: false });
        let cartstore = db.createObjectStore("cart", { keyPath: "xid", autoIncrement: true });
        let indexcart = cartstore.createIndex("name", "name", { unique: false });
        let indexcart2 = cartstore.createIndex("mail", "mail", { unique: false });
        let checkinstore = db.createObjectStore("order", { keyPath: "fname" });
        let indexcheckin = checkinstore.createIndex("fname", "fname", { unique: false });
        let userstore = db.createObjectStore("user", { keyPath: "mail" });
        let indexuser = userstore.createIndex("mail", "mail", { unique: false });



    }

    request.onerror = (e) => {
        console.log('error' + e.target.errorCode);
    }
    request.onsuccess = (e) => {
     
        db = request.result;
        alert("hlo")
        transition = db.transaction("product", "readwrite");
        store = transition.objectStore("product");
        index = store.index("name");
        db.onerror = (e) => {
            console.log('error' + e.target.errorCode);
        }

       
        store.put({ "id": 1, "name": "Lenovo ThinkPad E14 ", "originalprice": 500, "price": 300, "description": ["Pre-installed Genuine Windows 10 OS", "Preloaded with MS Office", " Light Laptop without Optical Disk Drive", "14 inch FHD LED Backlit Anti-glare Display"], "category": "laptop", "image": "https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/f3e023b33dba4a3f9c788490bbc1a1c9_17a14ee57d5_image.png?q=90" })
        store.put({
            "id": 2, "name": "acer Aspire 5", "originalprice": 200, "price": 109, "description": ["Stylish & Portable Thin and Light Laptop",
                "15.6 inch Full HD LED-Backlit TFT LCD Display (16:9 Aspect Ratio)",
                " Light Laptop without Optical Disk Drive"], "category": "laptop", "image": "https://rukminim1.flixcart.com/image/416/416/knhsgi80/computer/u/y/4/na-thin-and-light-laptop-acer-original-imag25zfahpqmyjm.jpeg?q=70"
        });
        store.put({
            "id": 3, "name": "ASUS TUF Gaming A17", "originalprice": 660, "price": 570, "description": ["NVIDIA GeForce GTX 1650",
                " 17.3 inch Full HD LED Backlit Anti-glare IPS Display with Adaptive Sync (16:9 Aspect Ratio, 45% NTSC Color Gamut, 250 nits Brightness, 120 Hz Refresh Rate, 800:1 Contrast Ratio, 62.5% sRGB, 47.34% Adobe)"
                , "Light Laptop without Optical Disk Drive",
                "Pre-installed Genuine Windows 10 OS"], "category": "laptop", "image": "https://rukminim1.flixcart.com/image/416/416/kamtsi80/computer/g/k/n/asus-original-imafs5qf3f5cdp5t.jpeg?q=70"
        });
        store.put({ "id": 4, "name": "HP 15s", "originalprice": 840, "price": 530, "description": ["Stylish & Portable Thin and Light Laptop",
            "15.6 inch Full HD LED Backlit Anti-glare IPS Micro-edge Display (250 nits Brightness, 45% NTSC Color Gamut, 141 PPI)",
            "Light Laptop without Optical Disk Drive"], "category": "laptop", "image": "https://rukminim1.flixcart.com/image/416/416/kk2wl8w0/computer/v/h/i/hp-original-imafzgdgrapqqrnr.jpeg?q=70" })
        
            store.put({
            "id": 5, "name": "ASUS Celeron Dual Core", "originalprice": 900, "price": 880, "description": ["Stylish & Portable Thin and Light Laptop",
                "15.6 inch Full HD LED-Backlit TFT LCD Display (16:9 Aspect Ratio)",
                " Light Laptop without Optical Disk Drive"], "category": "laptop", "image": "https://rukminim1.flixcart.com/image/416/416/k9d3p8w0/computer/c/a/h/asus-na-laptop-original-imafr6cbfurgkspg.jpeg?q=70"
        });
        store.put({
            "id": 6, "name": "ASUS TUF Gaming A17", "originalprice": 660, "price": 570, "description": ["NVIDIA GeForce GTX 1650",
                " 17.3 inch Full HD LED Backlit Anti-glare IPS Display with Adaptive Sync (16:9 Aspect Ratio, 45% NTSC Color Gamut, 250 nits Brightness, 120 Hz Refresh Rate, 800:1 Contrast Ratio, 62.5% sRGB, 47.34% Adobe)"
                , "Light Laptop without Optical Disk Drive",
                "Pre-installed Genuine Windows 10 OS"], "category": "laptop", "image": "https://rukminim1.flixcart.com/image/416/416/kamtsi80/computer/g/k/n/asus-original-imafs5qf3f5cdp5t.jpeg?q=70"
        });
        store.put({ "id": 7, "name": "Lenovo ThinkPad E14 ", "originalprice": 500, "price": 300, "description": ["Pre-installed Genuine Windows 10 OS", "Preloaded with MS Office", " Light Laptop without Optical Disk Drive", "14 inch FHD LED Backlit Anti-glare Display"], "category": "laptop", "image": "https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/f3e023b33dba4a3f9c788490bbc1a1c9_17a14ee57d5_image.png?q=90" })
        store.put({
            "id": 8, "name": "acer Aspire 5", "originalprice": 200, "price": 109, "description": ["Stylish & Portable Thin and Light Laptop",
                "15.6 inch Full HD LED-Backlit TFT LCD Display (16:9 Aspect Ratio)",
                " Light Laptop without Optical Disk Drive"], "category": "laptop", "image": "https://rukminim1.flixcart.com/image/416/416/knhsgi80/computer/u/y/4/na-thin-and-light-laptop-acer-original-imag25zfahpqmyjm.jpeg?q=70"
        });
        store.put({
            "id": 9, "name": "ASUS TUF Gaming A17", "originalprice": 660, "price": 570, "description": ["NVIDIA GeForce GTX 1650",
                " 17.3 inch Full HD LED Backlit Anti-glare IPS Display with Adaptive Sync (16:9 Aspect Ratio, 45% NTSC Color Gamut, 250 nits Brightness, 120 Hz Refresh Rate, 800:1 Contrast Ratio, 62.5% sRGB, 47.34% Adobe)"
                , "Light Laptop without Optical Disk Drive",
                "Pre-installed Genuine Windows 10 OS"], "category": "laptop", "image": "https://rukminim1.flixcart.com/image/416/416/kamtsi80/computer/g/k/n/asus-original-imafs5qf3f5cdp5t.jpeg?q=70"
        });
        store.put({ "id": 10, "name": "Lenovo ThinkPad E14 ", "originalprice": 500, "price": 300, "description": ["Pre-installed Genuine Windows 10 OS", "Preloaded with MS Office", " Light Laptop without Optical Disk Drive", "14 inch FHD LED Backlit Anti-glare Display"], "category": "laptop", "image": "https://rukminim1.flixcart.com/image/200/200/cms-rpd-images/f3e023b33dba4a3f9c788490bbc1a1c9_17a14ee57d5_image.png?q=90" })
        store.put({
            "id": 2, "name": "acer Aspire 5", "originalprice": 200, "price": 109, "description": ["Stylish & Portable Thin and Light Laptop",
                "15.6 inch Full HD LED-Backlit TFT LCD Display (16:9 Aspect Ratio)",
                " Light Laptop without Optical Disk Drive"], "category": "laptop", "image": "https://rukminim1.flixcart.com/image/416/416/knhsgi80/computer/u/y/4/na-thin-and-light-laptop-acer-original-imag25zfahpqmyjm.jpeg?q=70"
        });
        store.put({
            "id": 11, "name": "POCO M3", "originalprice": 200, "price": 159, "description": ["6 GB RAM | 64 GB ROM | Expandable Upto 512 GB",
                "16.59 cm (6.53 inch) Full HD+ Display",
                "48MP + 2MP + 2MP | 8MP Front Camera",
                "6000 mAh Lithium-ion Polymer Battery",
                "Qualcomm Snapdragon 662 Processor"], "category": "mobile", "image": "https://rukminim1.flixcart.com/image/416/416/kklhbbk0/mobile/m/s/f/m3-mzb0879in-poco-original-imafzxf686qtxq2x.jpeg?q=70"
        });
        store.put({ "id": 12, "name": "REDMI 9 Power ", "originalprice": 399, "price": 259, "description": ["4 GB RAM | 64 GB ROM",
            "16.59 cm (6.53 inch) Full HD+ Display",
            "48MP + 8MP + 2MP + 2MP | 8MP Front Camera",
           " 6000 mAh Battery",
            "Qualcomm Snapdragon 662 Processor"], "category": "mobile", "image": "https://rukminim1.flixcart.com/image/416/416/kkh6zrk0/mobile/o/o/c/redmi-9-power-mzb084xin-mzb084zin-mi-original-imafztfv3cywtzvz.jpeg?q=70" })
        store.put({
            "id": 13, "name": "realme C20", "originalprice": 100, "price": 80, "description": ["2 GB RAM | 32 GB ROM | Expandable Upto 256 GB",
                "16.51 cm (6.5 inch) HD+ Display",
                "8MP Rear Camera | 5MP Front Camera",
                "5000 mAh Battery",
                "MediaTek Helio G35 Processor"], "category": "mobile", "image": "https://rukminim1.flixcart.com/image/416/416/kn7sdjk0/mobile/w/h/q/c20-rmx3063-realme-original-imagfxfzay72jqvh.jpeg?q=70"
        });
        store.put({
            "id": 14, "name": "SAMSUNG Galaxy F41", "originalprice": 300, "price": 200, "description": ["6 GB RAM | 128 GB ROM | Expandable Upto 512 GB",
                "16.26 cm (6.4 inch) Full HD+ Display",
                "64MP + 8MP + 5MP | 32MP Front Camera",
                "6000 mAh Lithium-ion Battery",
                "Exynos 9611 Processor",
                "Super AMOLED Display"], "category": "mobile", "image": "https://rukminim1.flixcart.com/image/416/416/kfzq8i80/mobile/y/j/f/samsung-galaxy-f41-sm-f415fzbdins-original-imafwbnpdafmeuj6.jpeg?q=70"
        });
        store.put({ "id": 15, "name": "Nokia RM-969", "originalprice": 50, "price": 20, "description": ["32 MB RAM | 64 MB ROM",
            "6.1 cm (2.4 inch) Display",
            "2MP Rear Camera",
            "1100 mAh Battery"], "category": "mobile", "image": "https://rukminim1.flixcart.com/image/416/416/kflftzk0/mobile/g/d/x/nokia-rm-969-220-original-imafwyucxgkhhnsb.jpeg?q=70" })
        
            store.put({
                "id": 16, "name": "POCO M3", "originalprice": 200, "price": 159, "description": ["6 GB RAM | 64 GB ROM | Expandable Upto 512 GB",
                    "16.59 cm (6.53 inch) Full HD+ Display",
                    "48MP + 2MP + 2MP | 8MP Front Camera",
                    "6000 mAh Lithium-ion Polymer Battery",
                    "Qualcomm Snapdragon 662 Processor"], "category": "mobile", "image": "https://rukminim1.flixcart.com/image/416/416/kklhbbk0/mobile/m/s/f/m3-mzb0879in-poco-original-imafzxf686qtxq2x.jpeg?q=70"
            });
            store.put({ "id": 17, "name": "REDMI 9 Power ", "originalprice": 399, "price": 259, "description": ["4 GB RAM | 64 GB ROM",
                "16.59 cm (6.53 inch) Full HD+ Display",
                "48MP + 8MP + 2MP + 2MP | 8MP Front Camera",
               " 6000 mAh Battery",
                "Qualcomm Snapdragon 662 Processor"], "category": "mobile", "image": "https://rukminim1.flixcart.com/image/416/416/kkh6zrk0/mobile/o/o/c/redmi-9-power-mzb084xin-mzb084zin-mi-original-imafztfv3cywtzvz.jpeg?q=70" })
            store.put({
                "id": 18, "name": "realme C20", "originalprice": 100, "price": 80, "description": ["2 GB RAM | 32 GB ROM | Expandable Upto 256 GB",
                    "16.51 cm (6.5 inch) HD+ Display",
                    "8MP Rear Camera | 5MP Front Camera",
                    "5000 mAh Battery",
                    "MediaTek Helio G35 Processor"], "category": "mobile", "image": "https://rukminim1.flixcart.com/image/416/416/kn7sdjk0/mobile/w/h/q/c20-rmx3063-realme-original-imagfxfzay72jqvh.jpeg?q=70"
            });
            store.put({
                "id": 19, "name": "SAMSUNG Galaxy F41", "originalprice": 300, "price": 200, "description": ["6 GB RAM | 128 GB ROM | Expandable Upto 512 GB",
                    "16.26 cm (6.4 inch) Full HD+ Display",
                    "64MP + 8MP + 5MP | 32MP Front Camera",
                    "6000 mAh Lithium-ion Battery",
                    "Exynos 9611 Processor",
                    "Super AMOLED Display"], "category": "mobile", "image": "https://rukminim1.flixcart.com/image/416/416/kfzq8i80/mobile/y/j/f/samsung-galaxy-f41-sm-f415fzbdins-original-imafwbnpdafmeuj6.jpeg?q=70"
            });
            store.put({ "id": 20, "name": "Nokia RM-969", "originalprice": 50, "price": 20, "description": ["32 MB RAM | 64 MB ROM",
                "6.1 cm (2.4 inch) Display",
                "2MP Rear Camera",
                "1100 mAh Battery"], "category": "mobile", "image": "https://rukminim1.flixcart.com/image/416/416/kflftzk0/mobile/g/d/x/nokia-rm-969-220-original-imafwyucxgkhhnsb.jpeg?q=70" })
            
        
        store.put({
            "id": 21, "name": "Printed Men Hooded Neck Black T-Shirt", "originalprice": 30, "price": 20, "description": ["black","printed"], "category": "menwear", "image": "https://rukminim1.flixcart.com/image/880/1056/kl2mljk0/t-shirt/a/3/k/4xl-tblhdfulmask-lion-tripr-original-imagy9tcx7q25wym.jpeg?q=50"
        });
        store.put({ "id": 22, "name": "Color Block Men Round Neck tshirt ", "originalprice": 90, "price": 50, "description": ["yellow","printed"], "category": "menwear", "image": "https://rukminim1.flixcart.com/image/880/1056/ju1jqfk0/t-shirt/u/z/4/l-men-ss19-rgln-hs-white-ylw-blk-strp-maniac-original-imaff9e8dpqzhwgu.jpeg?q=50" })
        store.put({
            "id": 23, "name": "Printed Men Hooded red tshirt", "originalprice": 200, "price": 109, "description": ["red","printed"], "category": "menwear", "image": "https://rukminim1.flixcart.com/image/880/1056/kljrvrk0/t-shirt/q/r/0/l-trdhdful-d32-tripr-original-imagynnpg2fh62ht.jpeg?q=50"
        });
        store.put({
            "id": 24, "name": "Solid Men Mandarin tshirt", "originalprice": 120, "price": 70, "description": ["blue","printed"], "category": "menwear", "image": "https://rukminim1.flixcart.com/image/880/1056/kf75fgw0-0/t-shirt/f/6/j/xxl-t325-pwgh-seven-rocks-original-imafvpbgf6nchmfj.jpeg?q=50"
        });
        store.put({ "id": 25, "name": "Solid Men Hooded tshirt ", "originalprice": 200, "price": 120, "description": ["black","printed"], "category": "menwear", "image": "https://rukminim1.flixcart.com/image/880/1056/kjhgzgw0-0/t-shirt/h/s/2/xxl-tblhdful-d10-tripr-original-imafzfk2cxynenfd.jpeg?q=50" })
        
        store.put({
            "id": 26, "name": "Printed Men Hooded Neck Black T-Shirt", "originalprice": 30, "price": 20, "description": ["black","printed"], "category": "menwear", "image": "https://rukminim1.flixcart.com/image/880/1056/kl2mljk0/t-shirt/a/3/k/4xl-tblhdfulmask-lion-tripr-original-imagy9tcx7q25wym.jpeg?q=50"
        });
        store.put({ "id": 27, "name": "Color Block Men Round Neck tshirt ", "originalprice": 90, "price": 50, "description": ["yellow","printed"], "category": "menwear", "image": "https://rukminim1.flixcart.com/image/880/1056/ju1jqfk0/t-shirt/u/z/4/l-men-ss19-rgln-hs-white-ylw-blk-strp-maniac-original-imaff9e8dpqzhwgu.jpeg?q=50" })
        store.put({
            "id": 28, "name": "Printed Men Hooded red tshirt", "originalprice": 200, "price": 109, "description": ["red","printed"], "category": "menwear", "image": "https://rukminim1.flixcart.com/image/880/1056/kljrvrk0/t-shirt/q/r/0/l-trdhdful-d32-tripr-original-imagynnpg2fh62ht.jpeg?q=50"
        });
        store.put({
            "id": 29, "name": "Solid Men Mandarin tshirt", "originalprice": 120, "price": 70, "description": ["blue","printed"], "category": "menwear", "image": "https://rukminim1.flixcart.com/image/880/1056/kf75fgw0-0/t-shirt/f/6/j/xxl-t325-pwgh-seven-rocks-original-imafvpbgf6nchmfj.jpeg?q=50"
        });
        store.put({ "id": 30, "name": "Solid Men Hooded tshirt ", "originalprice": 200, "price": 120, "description": ["black","printed"], "category": "menwear", "image": "https://rukminim1.flixcart.com/image/880/1056/kjhgzgw0-0/t-shirt/h/s/2/xxl-tblhdful-d10-tripr-original-imafzfk2cxynenfd.jpeg?q=50" })
        
       


        

        transition.oncomplete = () => {
            db.close();
        }
    }
}
