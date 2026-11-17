/* =====================================================================
   DATOS DE LOS JUEGOS  (aquí editas descripciones, fotos y videos)
   Para cada juego puedes agregar:

   capturas: ["capturas/elden-1.jpg", "capturas/elden-2.jpg"]
        -> pon tus imágenes en la carpeta "capturas" y escribe su ruta.

   video: "https://www.youtube.com/watch?v=XXXXXXXXXXX"
        -> link de YouTube (el tráiler). También sirve un archivo local:
           video: "videos/elden.mp4"

   Si dejas capturas vacío y video en "", solo se muestra la portada.
   ===================================================================== */

const JUEGOS = [
    {
        id: "neo-racing",
        nombre: "NEO RACING",
        categoria: "CARRERAS",
        precio: 19.90,
        portada: "neo-racing.jpeg.jpeg",
        capturas: [],
        video: "",
        desarrollador: "—",
        lanzamiento: "—",
        etiquetas: ["Carreras", "Arcade", "Velocidad"],
        resumen: "Carreras arcade a toda velocidad en circuitos de estilo neón.",
        descripcion: [
            "Acelera por circuitos futuristas llenos de luces de neón en un juego de carreras arcade pensado para partidas rápidas y emocionantes.",
            "Domina las curvas, mejora tu tiempo en cada vuelta y demuestra quién es el piloto más veloz."
        ]
    },
    {
        id: "spider-man",
        nombre: "MARVEL'S SPIDER-MAN",
        categoria: "AVENTURA Y ACCIÓN",
        precio: 79.90,
        portada: "MARVEL.jpeg.JPG",
        capturas: [],
        video: "https://www.youtube.com/watch?v=q4GdJVvdxss",
        desarrollador: "Insomniac Games",
        lanzamiento: "2018 (PC: 2022)",
        etiquetas: ["Acción", "Aventura", "Mundo abierto", "Superhéroes"],
        resumen: "Balancéate por Nueva York como un Peter Parker experimentado en una aventura original.",
        descripcion: [
            "Peter Parker lleva ocho años siendo Spider-Man. Ahora debe defender Nueva York de nuevos villanos mientras intenta mantener su vida personal a flote.",
            "Recorre toda la ciudad balanceándote entre los rascacielos, combate con acrobacias y gadgets, y enfréntate a villanos clásicos del universo de Marvel en una historia original."
        ]
    },
    {
        id: "fifa-26",
        nombre: "FIFA 26",
        categoria: "DEPORTES",
        precio: 149.90,
        portada: "FIFA26.jpg",
        capturas: [],
        video: "https://www.youtube.com/watch?v=TSi0iJYSQ24",
        desarrollador: "EA Sports",
        lanzamiento: "2025",
        etiquetas: ["Deportes", "Fútbol", "Multijugador"],
        resumen: "El fútbol más popular del mundo, con clubes, ligas y modos online.",
        descripcion: [
            "Vive el fútbol con equipos, jugadores y ligas de todo el mundo. Juega partidos rápidos, arma tu propio equipo o compite contra otros jugadores en línea.",
            "Perfecto para jugar solo o para retar a tus amigos en el sofá."
        ]
    },
    {
        id: "left-4-dead-2",
        nombre: "LEFT 4 DEAD 2",
        categoria: "DISPAROS Y AVENTURA",
        precio: 8.90,
        portada: "LEFT.jpeg",
        capturas: [],
        video: "https://www.youtube.com/watch?v=OqUUfwSN-MY",
        desarrollador: "Valve",
        lanzamiento: "2009",
        etiquetas: ["Disparos", "Cooperativo", "Zombis", "Multijugador"],
        resumen: "Sobrevive con tres amigos a hordas de infectados en este clásico cooperativo.",
        descripcion: [
            "Cuatro supervivientes, miles de infectados y un solo objetivo: llegar con vida al final de cada campaña.",
            "El Director de IA cambia la acción en cada partida: enemigos, objetos y rutas nunca aparecen igual. Juega en cooperativo con tus amigos y trabajen en equipo para salir con vida. Alisten sus f1"
        ]
    },
    {
        id: "the-last-of-us",
        nombre: "THE LAST OF US™ PARTE I",
        categoria: "AVENTURA Y ACCIÓN",
        precio: 99.50,
        portada: "the last of us.jpeg",
        capturas: [],
        video: "https://www.youtube.com/watch?v=Mel8DZBEJTo",
        desarrollador: "Naughty Dog",
        lanzamiento: "2022 (PC: 2023)",
        etiquetas: ["Aventura", "Acción", "Historia", "Supervivencia"],
        resumen: "Joel y Ellie cruzan unos Estados Unidos devastados en una historia inolvidable.",
        descripcion: [
            "Veinte años después de que una pandemia destruyera la civilización, Joel, un superviviente endurecido, recibe la misión de sacar a Ellie, una joven de 14 años, de una zona de cuarentena.",
            "Lo que empieza como un trabajo sencillo se convierte en un viaje brutal a través del país, donde cada encuentro puede ser mortal. Sigilo, combate y una de las historias más aclamadas del medio."
        ]
    },
    {
        id: "dark-souls-3",
        nombre: "DARK SOULS III",
        categoria: "AVENTURA Y ACCIÓN",
        precio: 172.90,
        portada: "DarkSoulsIII.jpeg",
        capturas: [],
        video: "https://www.youtube.com/watch?v=oX0cvtjKt9E",
        desarrollador: "FromSoftware",
        lanzamiento: "2016",
        etiquetas: ["Acción", "RPG", "Difícil", "Fantasía oscura"],
        resumen: "Un reino en ruinas, jefes legendarios y combates donde cada error cuenta.",
        descripcion: [
            "Las llamas se apagan y el reino de Lothric se desmorona. Como un Sin Llama, debes encender de nuevo los fuegos y enfrentarte a los Señores de las Cenizas.",
            "Combate exigente, jefes memorables y un mundo oscuro lleno de secretos que recompensa la paciencia y la estrategia."
        ]
    },
    {
        id: "red-dead-redemption-2",
        nombre: "RED DEAD REDEMPTION 2",
        categoria: "AVENTURA Y ACCIÓN",
        precio: 219.90,
        portada: "red dead.jpeg",
        capturas: [],
        video: "https://www.youtube.com/watch?v=gmA6MrX81z4",
        desarrollador: "Rockstar Games",
        lanzamiento: "2018 (PC: 2019)",
        etiquetas: ["Mundo abierto", "Western", "Acción", "Historia"],
        resumen: "La vida de un forajido en el ocaso del Salvaje Oeste, en un enorme mundo abierto.",
        descripcion: [
            "Estados Unidos, 1899. Arthur Morgan y la banda de Van der Linde huyen por el país con la ley pisándoles los talones.",
            "Cabalga, caza, pesca y vive el Salvaje Oeste en un mundo abierto lleno de detalle, mientras la banda lucha por sobrevivir en una época que está desapareciendo."
        ]
    },
    {
        id: "black-myth-wukong",
        nombre: "BLACK MYTH: WUKONG",
        categoria: "AVENTURA Y ACCIÓN",
        precio: 199.90,
        portada: "black myth wukong.jpeg",
        capturas: [],
        video: "https://www.youtube.com/watch?v=u83VdXAVq08",
        desarrollador: "Game Science",
        lanzamiento: "2024",
        etiquetas: ["Acción", "RPG", "Mitología", "Jefes"],
        resumen: "Un RPG de acción inspirado en el clásico chino «Viaje al Oeste».",
        descripcion: [
            "Encarna al Elegido, un mono con un bastón mágico, y recorre una China mítica llena de monstruos, dioses y paisajes impresionantes.",
            "Combate dinámico, transformaciones, hechizos y enfrentamientos contra jefes espectaculares, basado en la novela «Viaje al Oeste»."
        ]
    },
    {
        id: "resident-evil-4",
        nombre: "RESIDENT EVIL 4 REMAKE",
        categoria: "SUPERVIVENCIA Y TERROR",
        precio: 120.90,
        portada: "resident evil.jpeg",
        capturas: [],
        video: "https://www.youtube.com/watch?v=8N3c044yy-M",
        desarrollador: "Capcom",
        lanzamiento: "2023",
        etiquetas: ["Terror", "Supervivencia", "Acción", "Remake"],
        resumen: "Leon S. Kennedy debe rescatar a la hija del presidente en un pueblo infestado de horror.",
        descripcion: [
            "Seis años después de lo ocurrido en Raccoon City, Leon S. Kennedy viaja a un remoto pueblo europeo para rescatar a Ashley, la hija del presidente de Estados Unidos.",
            "Una reimaginación moderna del clásico: combate más intenso, ambientación aterradora y la tensión de gestionar tus recursos mientras te rodean los enemigos."
        ]
    },
    {
        id: "silent-hill-f",
        nombre: "SILENT HILL f",
        categoria: "SUPERVIVENCIA Y TERROR",
        precio: 232.90,
        portada: "Silent hill f.jpeg",
        capturas: [],
        video: "https://www.youtube.com/watch?v=UypppJriT20",
        desarrollador: "NeoBards Entertainment / Konami",
        lanzamiento: "2025",
        etiquetas: ["Terror", "Psicológico", "Supervivencia", "Historia"],
        resumen: "Terror psicológico ambientado en el Japón de los años 60.",
        descripcion: [
            "Una nueva entrega de la saga Silent Hill que deja atrás el pueblo original para llevarte al Japón de los años 60, donde la belleza y el horror conviven.",
            "Explora, resuelve puzles y sobrevive a criaturas grotescas en una historia psicológica y perturbadora."
        ]
    },
    {
        id: "nier-automata",
        nombre: "NIER: AUTOMATA",
        categoria: "AVENTURA Y ACCIÓN",
        precio: 149.90,
        portada: "nier_automata.jpeg",
        capturas: [],
        video: "https://www.youtube.com/watch?v=wJxNhJ8fjFk",
        desarrollador: "PlatinumGames / Square Enix",
        lanzamiento: "2017",
        etiquetas: ["Acción", "RPG", "Androides", "Ciencia ficción"],
        resumen: "Androides, máquinas y una guerra que esconde una historia profunda.",
        descripcion: [
            "La humanidad se refugia en la Luna mientras androides combaten a las máquinas invasoras en la Tierra. Controla a 2B, 9S y A2 en una historia llena de giros.",
            "Combate rápido y espectacular, cambios de género de juego y varios finales que cambian por completo lo que crees saber."
        ]
    },
    {
        id: "binding-of-isaac",
        nombre: "The Binding of Isaac",
        categoria: "Rogue like,Twin-stick Shooter,Dungeon Crawler",
        precio: 50.90,
        portada: "isaac.jpeg",
        capturas: [],
        video: "https://www.youtube.com/watch?v=27Le3kOOFQk",
        desarrollador: "Edmund McMillen / Nicalis",
        lanzamiento: "2011 (Rebirth: 2014)",
        etiquetas: ["Roguelike", "Twin-stick shooter", "Dungeon crawler", "Indie"],
        resumen: "Baja al sótano, recoge objetos extraños y sobrevive en mazmorras que cambian cada partida.",
        descripcion: [
            "Isaac huye de su madre y se adentra en un sótano lleno de monstruos. Explora mazmorras generadas al azar, dispara lágrimas y combina cientos de objetos.",
            "Cada partida es distinta y con una dificultad que invita a intentarlo una y otra vez."
        ]
    },
    {
        id: "elden-ring",
        nombre: "ELDEN RING",
        categoria: "AVENTURA Y ACCIÓN",
        precio: 199.90,
        portada: "elden-ring.jpeg",
        capturas: [],
        video: "https://www.youtube.com/watch?v=9SOnJrVPHJo",
        desarrollador: "FromSoftware",
        lanzamiento: "2022",
        etiquetas: ["Mundo abierto", "RPG", "Acción", "Fantasía oscura"],
        resumen: "Un enorme mundo abierto de fantasía creado por FromSoftware y George R. R. Martin.",
        descripcion: [
            "Levántate, Sin Luz, y recorre las Tierras Intermedias para restaurar el Círculo de Elden y convertirte en Señor del Círculo.",
            "Explora a pie o a caballo un vasto mundo abierto con mazmorras, castillos y jefes colosales. Combate exigente con libertad total para construir tu personaje."
        ]
    }
];
