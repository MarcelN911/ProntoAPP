
const CATEGORY_ICONS = {
    "Kolumbianisch": "🇨🇴",
    "Burger": "🍔",
    "Pizza": "🍕",
    "Pasta": "🍝",
    "Salat": "🥗",
    "Getränke": "🥤"
};


let menu = {
    "Kolumbianisch": {
        "banner": 
            {
                "banner-img": "./assets/img/.png",
            },
        "info": [
            {
            "name": "Bandeja Paisa",
            "listLabel": "Beschreibung:",
            "description": ["Reis", "rote Bohnen", "Hackfleisch", "Chicharrón", "Chorizo", "Spiegelei", "Avocado", "Arepa", "frittierte Kochbanane"],
            "price": 17.99,
            "deliveryTime": "20-25",
            "img": "./assets/img/col1.webp",
            },
            {
            "name": "Arepa de Queso",
            "listLabel": "Beschreibung:",
            "description": ["Maismehl", "Käse", "Butter", "Prise Salz, Milch"],
            "price": 9.99,
            "img": "./assets/img/col2.webp", 
            },
            {
            "name": "Sancocho de Gallina",
            "listLabel": "Beschreibung:",
            "description": ["Suppenhuhn", "Kochbananen", "Yucca", "Kartoffeln", "Maiskolben", "Koriander", "Zwiebeln", "Knoblauch"],
            "price": 9.49,
            "img": "./assets/img/col3.webp",
            },
            {
            "name": "Pechuga con Arroz",
            "listLabel": "Beschreibung:",
            "description": ["Zart gegrillte Hähnchenbrust", "weißer Reis", "frischer Beilagensalat", "Avocado", "gebratene Kochbananen-Scheiben"],
            "price": 12.99,
            "img": "./assets/img/col4.webp",
            },
            {
            "name": "Patacones con Todo",
            "listLabel": "Beschreibung:",
            "description": ["große frittierte grüne Kochbananen-Scheiben", "Rindfleisch", "Hogao-Sauce", "Guacamole", "Käse", "Koriander"],
            "price": 13.99,
            "img": "./assets/img/col5.webp",
            }
        ],
    },

    "Burger": {
        "banner": 
            {
                "banner-img": "./assets/img/Burger.png",
            },  
        "info": [
            {
            "name": "Signature Cheeseburger",
            "listLabel": "Beschreibung:",
            "description": ["Brioche-Bun", "Rindfleisch-Patty", "Cheddar", "Gurken", "Ketchup", "Senf", "Zwiebeln", "Salat"],
            "price": 12.99,
            "img": "./assets/img/Burger1.webp",
            },
            {
            "name": "Crispy Chicken Burger",
            "listLabel": "Beschreibung:",
            "description": ["Sesam-Brötchen", "panierte Hähnchenbrust", "Eisbergsalat", "Mayonnaise", "Tomaten"],
            "price": 11.99,
            "img": "./assets/img/Burger2.webp",
            },
            {
            "name": "American Classic Burger",
            "listLabel": "Beschreibung:",
            "description": ["Weizen-Brötchen", "Rindfleisch-Patty", "Tomatenscheiben", "Zwiebelringe", "Gewürzgurken", "Salat", "Barbecuesauce"],
            "price": 14.99,
            "img": "./assets/img/Burger3.webp",
            },
            {
            "name": "Smashed Burger",
            "listLabel": "Beschreibung:",
            "description": ["Potato-Roll", "flach gepresstes Rindfleisch-Patty", "doppelt Cheddar", "karamellisierte Zwiebeln", "Senf-Mayo-Sauce"],
            "price": 13.99,
            "img": "./assets/img/Burger4.webp",
            },
            {
            "name": "BBQ Bacon Burger",
            "listLabel": "Beschreibung:",
            "description": ["Weizen-Brötchen", "Rindfleisch-Patty", "Cheddar", "knuspriger Bacon", "Röstzwiebeln", "Barbecuesauce", "Salat"],
            "price": 15.49,
            "img": "./assets/img/Burger5.webp",
            },
        ],
    },

    "Pizza": {
        "banner": 
            {
                "banner-img": "./assets/img/Pizza.png",
            },
        "info": [
            {
            "name": "Margherita",
            "listLabel": "Beschreibung:",
            "description": ["Tomatensauce", "Mozzarella", "frisches Basilikum", "Oliven\u00f6l"],
            "price": 10.99,
            "img": "./assets/img/Pizza1.webp",
            "sizes": {
                "Klein (30cm)": 10.99,
                "Mittel (35cm)": 13.99,
                "Gro\u00df (40cm)": 16.99
            }
            },
            {
            "name": "Schnitzel",
            "listLabel": "Beschreibung:",
            "description": ["Sauce-Hollondaise", "Mozzarella", "Schnitzel-Streifen", "Brokolli"],
            "price": 14.99,
            "img": "./assets/img/Pizza2.webp",
            "sizes": {
                "Klein (30cm)": 14.99,
                "Mittel (35cm)": 17.99,
                "Gro\u00df (40cm)": 20.99
            }
            },
            {
            "name": "Prosciutto",
            "listLabel": "Beschreibung:",
            "description": ["Sauce-Hollondaise", "Mozzarella", "Parmaschinken", "Parmesan"],
            "price": 15.99,
            "img": "./assets/img/Pizza3.webp",
            "sizes": {
                "Klein (30cm)": 15.99,
                "Mittel (35cm)": 18.99,
                "Gro\u00df (40cm)": 21.99
            }
            },
            {
            "name": "Tonno",
            "listLabel": "Beschreibung:",
            "description": ["Tomatensauce", "Mozzarella", "Thunfisch", "rote Zwiebeln", "Oliven"],
            "price": 13.99,
            "img": "./assets/img/Pizza4.webp",
            "sizes": {
                "Klein (30cm)": 13.99,
                "Mittel (35cm)": 16.99,
                "Gro\u00df (40cm)": 19.99
            }
            },
            {
            "name": "Salami",
            "listLabel": "Beschreibung:",
            "description": ["Tomatensauce", "Mozzarella", "Salami"],
            "price": 12.99,
            "img": "./assets/img/Pizza5.webp",
            "sizes": {
                "Klein (30cm)": 12.99,
                "Mittel (35cm)": 15.99,
                "Gro\u00df (40cm)": 18.99
            }
            },
        ],
    },
    
    "Pasta": {
        "banner": 
            {
                "banner-img": "./assets/img/Burger.png",
            },
        "info": [
            {
            "name": "Carbonara",
            "listLabel": "Beschreibung:",
            "description": ["Spaghetti", "Speck", "Eier", "Parmesan", "Pfeffer"],
            "price": 13.49,
            "img": "./assets/img/Pasta4.webp",
            },
            {
            "name": "Spaghetti Bolognese",
            "listLabel": "Beschreibung:",
            "description": ["Spaghetti", "Rinderhackfleisch", "Tomatensauce", "Parmesan", "frisches Basilikum"],
            "price": 11.99,
            "img": "./assets/img/Pasta1.webp",
            },
            {
            "name": "Fettuccine Alfredo",
            "listLabel": "Beschreibung:",
            "description": ["Fettuccine", "Sahnesauce", "Parmesan", "Petersilie"],
            "price": 12.99,
            "img": "./assets/img/Pasta2.webp",
            },
            {
            "name": "Penne Arrabbiata",
            "listLabel": "Beschreibung:",
            "description": ["Penne", "würzige Tomatensauce", "Knoblauch", "Chiliflocken", "Basilikum"],
            "price": 10.99,
            "img": "./assets/img/Pasta3.webp",
            },
            {
            "name": "Lasagne",
            "listLabel": "Beschreibung:",
            "description": ["Lasagneblätter", "Rinderhackfleisch", "Tomatensauce", "Béchamelsauce", "Mozzarella", "Parmesan"],
            "price": 14.99,
            "img": "./assets/img/Pasta5.webp",
            },
        ],
    },

    "Salat": {
        "banner": 
            {
                "banner-img": "./assets/img/Salad.png",
            },
        "info": [
            {
            "name": "Caesar Salat",
            "listLabel": "Beschreibung:",
            "description": ["Römersalat", "Croutons", "Parmesan", "Caesar-Dressing", "Hähnchenbruststreifen"],
            "price": 11.99,
            "img": "./assets/img/Salat1.webp",
            },
            {
            "name": "Griechischer Salat",
            "listLabel": "Beschreibung:",
            "description": ["Gurken", "Tomaten", "rote Zwiebeln", "Feta-Käse", "Oliven", "Oregano", "Olivenöl"],
            "price": 10.99,
            "img": "./assets/img/Salat2.webp", 
            },
            {
            "name": "Caprese Salat",
            "listLabel": "Beschreibung:",
            "description": ["Tomatenscheiben", "Mozzarella", "frisches Basilikum", "Balsamico-Reduktion", "Olivenöl"],
            "price": 9.99,
            "img": "./assets/img/Salat3.webp",
            },
            {
            "name": "Nicoise Salat",
            "listLabel": "Beschreibung:",
            "description": ["Thunfisch", "grüne Bohnen", "Kartoffeln", "Eier", "Oliven", "Tomaten", "Vinaigrette"],
            "price": 12.99,
            "img": "./assets/img/Salat4.webp",
            },
            {
            "name": "Mediterraner Halloumi-Salat",
            "listLabel": "Beschreibung:",
            "description": ["Blattsalate", "gegrillter Halloumi", "Kirschtomaten", "Gurken", "rote Zwiebeln", "Oliven", "geröstete Pinienkerne", "Honig-Senf-Dressing"],
            "price": 13.99,
            "img": "./assets/img/Salat5.webp",
            }
        ],
    },

    "Getränke": {
        "banner": 
            {
                "banner-img": "./assets/img/Burger.png",
            },
        "info": [
            {
            "name": "Saft",
            "listLabel": "Beschreibung:",
            "description": ["frisch gepresst"],
            "price": 3.49,
            "img": "./assets/img/drink3.webp",
            "variants": ["Orange", "Apfel", "Banane", "Erdbeere", "Mango", "Maracuja", "Beerenmix"]
            },
            {
            "name": "Coca-Cola",
            "listLabel": "Beschreibung:",
            "description": ["kohlensäurehaltig"],
            "price": 2.99,
            "img": "./assets/img/drink1.webp",
            "variants": ["Classic", "Zero", "Light"]
            },
            {
            "name": "Mineralwasser",
            "listLabel": "Beschreibung:",
            "description": ["erfrischend"],
            "price": 2.49,
            "img": "./assets/img/drink2.webp",
            "variants": ["mit Kohlensäure", "ohne Kohlensäure"]
            },
            {
            "name": "Bier",
            "listLabel": "Beschreibung:",
            "description": ["verschiedene Sorten"],
            "price": 3.99,
            "img": "./assets/img/drink4.webp",
            "variants": ["Pils", "Weizen", "Radler", "Alkoholfrei"]
            },
            {
            "name": "Kaffee",
            "listLabel": "Beschreibung:",
            "description": ["heiß und aromatisch"],
            "price": 3.49,
            "img": "./assets/img/drink5.webp",
            "variants": ["Espresso", "Cappuccino", "Latte Macchiato", "Americano"]
            }
        ]
    }
}

let basket = [];