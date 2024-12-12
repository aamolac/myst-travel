-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mer. 11 déc. 2024 à 22:09
-- Version du serveur : 5.7.39
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `myst_travel`
--

-- --------------------------------------------------------

--
-- Structure de la table `accomodation`
--

CREATE TABLE `accomodation` (
  `id` int(11) NOT NULL,
  `choice` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `accomodation`
--

INSERT INTO `accomodation` (`id`, `choice`) VALUES
(1, 'Classique et Confortable (hôtels, auberges, gîtes)'),
(2, 'Nature et Authenticité (camping, cabanes, écolodges)'),
(3, 'Économique et Pratique (auberges de jeunesse, logements partagés, chambres d\'hôtes)'),
(4, 'Multi-hébergements (plusieurs types de logements pour une expérience diversifiée)'),
(5, 'Aucune préférence');

-- --------------------------------------------------------

--
-- Structure de la table `activity`
--

CREATE TABLE `activity` (
  `id` int(11) NOT NULL,
  `choice` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `activity`
--

INSERT INTO `activity` (`id`, `choice`) VALUES
(1, 'Relax (peu ou pas d’activités physique, principalement repos et détente)'),
(2, 'Modéré (visites touristiques, petites promenades, etc)'),
(3, 'Dynamique (randonnée, vélo ou d\'autres sports doux)'),
(4, 'Intensif (treks en montagne, sports d\'aventure, itinéraires actifs, etc)'),
(5, 'Aventureux (intenses et défis physiques pour les amateurs de sensations fortes et de défis)'),
(6, 'Aucune préférence');

-- --------------------------------------------------------

--
-- Structure de la table `climate`
--

CREATE TABLE `climate` (
  `id` int(11) NOT NULL,
  `choice` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `climate`
--

INSERT INTO `climate` (`id`, `choice`) VALUES
(1, 'Chaud/ensoleillé'),
(2, 'Tempéré/doux'),
(3, 'Frais'),
(4, 'Humide'),
(5, 'Hivernal'),
(6, 'Aucune préférence');

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `email` varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `objectContact_id` int(11) DEFAULT NULL,
  `message` text NOT NULL,
  `publishDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = non lu, 1 = lu, 2= répondu'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`id`, `email`, `objectContact_id`, `message`, `publishDate`, `status`) VALUES
(2, 'mariedes@gmail.com', 2, 'Bonjour, j\'aimerais savoir', '2024-10-08 00:00:00', 1),
(3, 'evacou@gmail.com', 2, 'besoin d\'informations concernant la destination mystère', '2024-10-08 00:00:00', 1),
(8, 'enomol@gmail.com', 4, 'blablablblabla', '2024-10-14 16:57:13', 2),
(9, 'mol@mol.com', 2, 'test', '2024-10-21 15:54:46', 2),
(12, 'qsdf@drf.fr', 4, 'j\'aimerais avoir des informations concernant ma réservation.', '2024-11-05 22:51:10', 2),
(13, 'annaig@gmail.com', 2, 'Bonjour, je souhaite savoir pour la destination mystère ....', '2024-12-11 16:15:25', 0);

-- --------------------------------------------------------

--
-- Structure de la table `culture`
--

CREATE TABLE `culture` (
  `id` int(11) NOT NULL,
  `choice` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `culture`
--

INSERT INTO `culture` (`id`, `choice`) VALUES
(1, 'Très important (je veux goûter et apprendre au maximum)'),
(2, 'Modéré (je veux juste profiter de l’ambiance)'),
(3, 'Peu important (c’est secondaire pour moi)');

-- --------------------------------------------------------

--
-- Structure de la table `customizedTrip`
--

CREATE TABLE `customizedTrip` (
  `id` int(11) NOT NULL,
  `typeExperience_id` int(11) DEFAULT NULL,
  `duration` int(11) UNSIGNED NOT NULL,
  `budget` int(11) UNSIGNED NOT NULL,
  `climate_id` int(11) DEFAULT NULL,
  `accomodation_id` int(11) DEFAULT NULL,
  `activity_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `numberAdult` int(10) UNSIGNED NOT NULL,
  `numberChild` int(10) UNSIGNED DEFAULT NULL,
  `culture_id` int(11) DEFAULT NULL,
  `restriction` varchar(200) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = non traité, 1= en cours de traitement, 2 = traité',
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `customizedTrip`
--

INSERT INTO `customizedTrip` (`id`, `typeExperience_id`, `duration`, `budget`, `climate_id`, `accomodation_id`, `activity_id`, `location_id`, `numberAdult`, `numberChild`, `culture_id`, `restriction`, `createdDate`, `status`, `user_id`) VALUES
(6, 1, 20, 2000, 1, 1, 1, 1, 1, 1, 1, NULL, '2024-10-23 12:19:41', 2, 4),
(11, 2, 18, 100, 1, 2, 3, 2, 6, 2, 2, 'allergie au fraise', '2024-11-13 17:45:37', 0, 13),
(13, 3, 4, 3, 2, 3, 4, 2, 2, NULL, 2, NULL, '2024-11-25 16:33:13', 0, 4),
(16, 2, 14, 550, 3, 3, 3, 3, 1, NULL, 2, NULL, '2024-12-06 18:32:03', 0, 4),
(17, 1, 4, 3, 2, 2, 2, 3, 4, NULL, 2, NULL, '2024-12-06 18:40:04', 0, 4),
(18, 2, 5, 500, 4, 1, 3, 4, 3, 2, 1, NULL, '2024-12-08 12:46:28', 1, 13),
(19, 3, 12, 4, 3, 2, 3, 2, 4, NULL, 3, NULL, '2024-12-11 16:30:29', 1, 18);

-- --------------------------------------------------------

--
-- Structure de la table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `choice` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `location`
--

INSERT INTO `location` (`id`, `choice`) VALUES
(1, 'Europe'),
(2, 'Amérique du Nord/Sud'),
(3, 'Asie'),
(4, 'Afrique'),
(5, 'Océanie'),
(6, 'Aucune préférence');

-- --------------------------------------------------------

--
-- Structure de la table `mystDestination`
--

CREATE TABLE `mystDestination` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `climateClue` text NOT NULL,
  `climate` varchar(50) NOT NULL,
  `experienceClue` text NOT NULL,
  `accomodation` varchar(50) NOT NULL,
  `activityClue` text NOT NULL,
  `activity` varchar(50) NOT NULL,
  `locationClue` text NOT NULL,
  `continent` varchar(50) NOT NULL,
  `budget` decimal(10,2) UNSIGNED NOT NULL,
  `minDuration` int(10) UNSIGNED NOT NULL,
  `maxDuration` int(10) UNSIGNED NOT NULL,
  `image` varchar(50) NOT NULL,
  `alt` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = En ligne, 1 = Hors ligne'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `mystDestination`
--

INSERT INTO `mystDestination` (`id`, `title`, `climateClue`, `climate`, `experienceClue`, `accomodation`, `activityClue`, `activity`, `locationClue`, `continent`, `budget`, `minDuration`, `maxDuration`, `image`, `alt`, `status`) VALUES
(1, 'Aventure Alpine : route vers l\'inconnu', 'Les journées sont idéales pour les activités en plein air, avec une température agréable qui varie selon l’altitude. En montagne, l’air est frais, presque vivifiant, et la chaleur du soleil compense les fraîches brises de la fin de journée. Les nuits apportent une fraîcheur bienvenue, idéale pour observer les étoiles au-dessus des vallées.', 'Frais', 'Imaginez-vous passer la nuit dans des chalets accueillants ou des auberges rustiques, immergés dans une atmosphère typique, où chaque repas est un véritable festin des saveurs locales. Vous découvrirez des traditions ancestrales tout en savourant la tranquillité des lieux, loin de l’agitation des grandes villes. Chaque étape vous plonge dans l\'âme d\'une région au caractère montagnard profond.', 'Multi-hébergements', 'Préparez-vous à un rythme soutenu, entre longues randonnées au cœur de paysages intacts, descentes à vélo sur des sentiers sinueux, et des moments de calme sur les bords des lacs. La journée est une alternance entre effort physique et contemplation des panoramas exceptionnels qui s’offrent à vous.', 'Intensif', 'Ce périple vous conduira à travers des montagnes imposantes, où les paysages varient entre des vallées profondes et des crêtes abruptes. Vous traverserez des régions où les villages traditionnels sont nichés entre les sommets, et où l\'histoire des alpes se lit dans chaque coin de rue. La nature, entre lacs tranquilles et forêts denses, vous offrira une palette de couleurs impressionnantes.', 'Europe', '175.90', 7, 14, 'c2e8934c-73b4-4b16-9a2e-f00d09692c67.webp', 'image 1', 0),
(2, 'Capitale éclatante : tradition et lumières', 'Le climat reste agréable tout au long de l\'année, avec des journées ensoleillées et une température douce qui rend chaque promenade en ville agréable. Les nuits sont légèrement plus fraîches, parfaites pour explorer les rues animées et goûter aux spécialités locales.', 'Tempéré et doux', 'Le voyage inclut une immersion dans une culture ancienne, avec des visites de palais majestueux, mais aussi un aperçu des quartiers modernes où les jeunes générations redéfinissent la ville. Entre les marchés traditionnels et les musées modernes, vous découvrirez les multiples facettes de cette capitale dynamique, tout en séjournant dans un hôtel raffiné.', 'Classique et confortable', 'Les journées seront rythmées par des visites culturelles et des moments de détente dans des jardins apaisants. Vous arpenterez les rues commerçantes et flânerez dans des marchés authentiques, en alternant balades et pauses gourmandes.', 'Modéré', 'Entrez dans une ville vibrante où la modernité côtoie les traditions anciennes. Imaginez une capitale où les néons colorent les rues la nuit, tandis que des temples sereins parsèment le paysage urbain. Le contraste entre le dynamisme des marchés et la tranquillité des jardins impériaux vous offrira une expérience hors du temps, dans un lieu où chaque coin de rue réserve une nouvelle surprise.', 'Asie', '120.00', 14, 21, 'efc2e37b-2a51-43b8-8ed0-a6303afae192.webp', 'Ville avec de nombreux buildings, de nuit', 0),
(3, 'Désert infini : voyage au cœur du sable', 'Attendez-vous à une chaleur sèche pendant la journée, suivie de nuits rafraîchissantes. Le climat désertique exige une adaptation, mais vous découvrirez que le ciel sans nuage la nuit offre une vue imprenable sur les étoiles.', 'Chaud et ensoleillé', 'Votre séjour se déroulera dans des lodges isolés, où vous serez en parfaite symbiose avec l\'environnement. L\'isolement de ces lieux vous permettra de vous reconnecter avec la nature, loin du monde moderne. Les repas au coin du feu sous un ciel étoilé seront des moments inoubliables.', 'Nature et authentique', 'L\'aventure ici est rythmée par des randonnées dans les dunes, des explorations à 4x4 et des safaris pour observer les animaux du désert. Attendez-vous à des journées physiques, mais aussi à des moments de calme où vous pourrez admirer la tranquillité du désert.', 'Dynamique', 'Plongez dans un désert où les dunes infinies semblent se confondre avec l\'horizon. Ce voyage vous conduira dans un lieu sauvage et isolé, là où la nature reprend ses droits. Entre formations rocheuses étonnantes et vastes étendues de sable, vous découvrirez un paysage rude mais d\'une beauté saisissante. Les rares oasis et la faune adaptée à cet environnement extrême ajoutent un aspect fascinant à cette aventure solitaire.', 'Afrique', '150.00', 10, 14, '85e001b6-3130-4eec-b358-eb89e7884b15.webp', 'Dunes de sable', 0),
(23, 'Paradis tropical : nature et découverte', 'L’air chaud et humide de la région crée une atmosphère tropicale parfaite pour des moments de détente au bord de l’eau. La chaleur du jour est contrebalancée par des averses rafraîchissantes et des nuits tempérées, idéales pour observer la faune nocturne.', 'Humide', 'Entre séjours dans des écolodges au cœur de la nature et nuits sur la plage, ce voyage vous offre une immersion totale dans la biodiversité de la région. Vous découvrirez des merveilles cachées et des paysages hors du commun, tout en restant proche de la nature.', 'Nature et authentique', 'Ce périple vous propose une alternance entre explorations actives, comme le kayak ou la randonnée dans la jungle, et moments de calme où vous pourrez savourer la beauté des plages et des récifs coralliens.', 'Modéré', 'Plongez dans une région où la nature se mêle aux plages paradisiaques. Des forêts denses aux volcans actifs, vous explorerez une variété de paysages époustouflants. Découvrez un paradis tropical entre mer turquoise et végétation luxuriante, peuplé d\'animaux exotiques et de secrets anciens enfouis dans la jungle.', 'Amérique', '170.00', 14, 21, '7d94bcd1-371a-4128-99ec-701f157d29af.webp', 'Plage paradisiaque avec un palmier', 0),
(26, 'Escapade historique : charme d\'autrefois', 'Le climat est doux, avec des journées ensoleillées qui apportent une lumière chaleureuse sur les bâtiments historiques. Le soir, une brise agréable se fait sentir, parfait pour une balade tranquille au cœur de la ville.', 'Tempéré et doux', 'Vous séjournerez dans un hôtel confortable, idéalement situé pour explorer à pied cette ville mythique. Visites culturelles, découvertes artistiques et moments de détente autour de la gastronomie locale rythmeront votre séjour.', 'Classique et confortable', 'Avec un niveau d\'activité modéré, vous parcourrez la ville à pied, entre visites de monuments historiques et pauses dans des jardins ou des cafés. Des promenades tranquilles et quelques petites montées seront au programme.', 'Modéré', 'Dans une ville européenne chargée d\'histoire, des monuments impressionnants se dressent, témoignant d\'une époque passée où l\'art et l\'architecture étaient au centre de la vie urbaine. La ville est un véritable musée à ciel ouvert, avec des ruelles pittoresques et des places animées qui invitent à la flânerie.', 'Europe', '130.00', 4, 7, '52d5386f-551a-418f-a8cd-5f1a5642102c.webp', 'Ville avec des toits de briques oranges et une cathédrale', 0),
(27, 'Safari authentique : nature à l\'état pur', 'Le climat est chaud, avec des journées ensoleillées qui accentuent les contrastes entre le sable doré et la végétation luxuriante. Le soir, la fraîcheur s\'installe, apportant une douce évasion après les températures élevées de la journée.', 'Chaud et ensoleillé', 'Séjournez dans des lodges au cœur de la nature, où vous pourrez observer la faune locale pendant vos safaris. Vous partirez à l\'aube pour explorer les parcs et les réserves, avant de vous détendre en soirée sous le ciel étoilé, loin de toute lumière artificielle.', 'Nature et authentique', 'L\'activité est modérée, entre safaris en véhicule tout-terrain et marches guidées pour observer de plus près les animaux. Des moments de relaxation au lodge viendront compléter cette expérience immersive.', 'Modéré', 'Dans une région d\'Afrique connue pour ses paysages vastes et sauvages, la faune se déploie en toute liberté. Ici, la nature brute domine, avec des espaces ouverts et des zones protégées où les animaux vivent dans leur habitat naturel. Vous découvrirez un écosystème riche et dynamique, avec une biodiversité fascinante.', 'Afrique', '220.00', 10, 21, 'f970efa4-63dc-4f08-840e-660d5eb6e039.webp', 'Des éléphants dans la savane', 0),
(28, 'Aventure océanienne : horizon sauvage', 'Le climat est tempéré, avec des journées ensoleillées et agréables, et des nuits fraîches qui apportent un contraste agréable. De courtes averses peuvent survenir, mais elles sont souvent bienvenues pour rafraîchir l’air.', 'Tempéré et doux', 'Vous alternerez entre campings et hébergements variés, chaque étape vous permettant de vous immerger dans la nature. Ce voyage offre à la fois des moments de découverte active et de détente dans des lieux authentiques et tranquilles.', 'Multi-hébergements', 'L\'activité est dynamique, avec des randonnées et des explorations de paysages naturels, parfois exigeants, mais accessibles à tous. Ce voyage combine aventure, nature et moments de tranquillité.', 'Aventureux', 'Explorez une destination lointaine, où des paysages variés vous attendent, des montagnes majestueuses aux plages isolées, en passant par des forêts verdoyantes. Ce road trip vous permettra de traverser une terre riche en biodiversité et en panoramas à couper le souffle.', 'Océanie', '150.00', 14, 21, 'd0d42fa6-f091-4c3c-bf77-291c2b387db4.webp', 'Des moutons sur une montagne, l\'océan au loin', 0),
(29, 'Riviera méditerranéenne : sable et sérénité', 'L\'endroit bénéficie d\'un climat généreusement ensoleillé la majeure partie de l\'année. Les températures y sont douces même en dehors de la saison estivale, parfaites pour des moments de relaxation à l\'extérieur. Les soirées y apportent une brise légère qui favorise un sommeil apaisant après une journée de bien-être.', 'Chaud et ensoleillé', 'Votre séjour inclut un hébergement confortable, fusionnant traditions locales et modernité. Des séances de spa, de méditation en plein air et des massages aux essences naturelles vous attendent. L\'expérience est enrichie par des repas raffinés aux saveurs méditerranéennes, mettant en avant des ingrédients frais et colorés.', 'Classique et confortable', 'Des activités douces vous invitent à explorer les paysages environnants. Des promenades au bord de l\'eau, des sessions de yoga matinal et des baignades dans des sources naturelles font partie du programme. Vous pourrez également profiter d\'excursions vers des points de vue inoubliables sans efforts intenses.', 'Modéré', 'Cette destination est nichée dans une région ensoleillée bordée par des côtes pittoresques, où les collines verdoyantes rencontrent des plages dorées. Le charme de ses villages authentiques, aux maisons blanchies, se mêle à la beauté naturelle environnante. L\'arrière-pays cache des paysages vallonnés parsemés de champs parfumés et de sentiers secrets propices à la détente.', 'Europe', '120.00', 4, 7, 'ae4b7f9e-85c2-486e-8ea4-ffcf339e6f4b.webp', 'Ville bordée par la mer avec des montagnes au loin', 0),
(30, 'Cœur de l\'Asie : aventure lointaine', 'Le climat est sec et changeant, allant de températures douces en été à des journées plus fraîches le reste de l\'année. Des ciels étoilés à la clarté spectaculaire vous accompagneront lors de vos nuits en plein air, offrant un moment de paix rare et inspirant.', 'Frais', 'L\'immersion culturelle est au cœur de cette aventure. Vous logerez dans des habitations nomades typiques, où le confort simple laisse place à une atmosphère chaleureuse et accueillante. Les repas locaux, élaborés à base de produits naturels, vous feront découvrir des saveurs authentiques et méconnues.', 'Nature et authentique', 'Préparez-vous à des randonnées spectaculaires et à des explorations de lieux préservés, ponctuées de rencontres avec la faune locale. Des excursions à cheval et des marches dans des environnements variés feront partie de votre quotidien. Chaque activité est pensée pour mêler aventure et découverte.', 'Aventureux', 'Dans une contrée lointaine où les vastes steppes rencontrent des montagnes majestueuses, cette destination est idéale pour les aventuriers en quête d\'authenticité. Le mode de vie y est resté inchangé depuis des siècles, rythmé par des traditions séculaires. Les paysages infinis s\'étendent à perte de vue, entre plaines verdoyantes et sommets aux neiges éternelles.', 'Asie', '200.00', 12, 15, '8ac70e01-866f-4078-a3cb-e9a4f0608767.webp', 'Des chevaux buvant de l\'eau au premier plan, puis des montagnes au loin', 0),
(31, 'Île méditerranéenne : évasion relaxante', 'Avec un climat doux et ensoleillé, cette destination est parfaite pour des séjours tout au long de l\'année. L\'air marin, combiné à la chaleur du soleil, crée un environnement parfait pour la détente et le bien-être, où l’on peut déconnecter en toute sérénité.', 'Chaud et ensoleillé', 'L’hébergement, dans des petits hôtels de charme surplombant la mer, offre une atmosphère intime et paisible. Des activités comme la baignade dans des criques secrètes, la dégustation de mets locaux et les visites culturelles enrichiront votre séjour. Laissez-vous envoûter par l\'harmonie de l\'île, où chaque détail est pensé pour favoriser la détente.', 'Classique et confortable', 'Les promenades le long des sentiers côtiers et les excursions en bateau vers des grottes marines s\'intègrent naturellement à l\'expérience. L\'accent est mis sur la découverte douce et la relaxation, parfait pour ceux qui souhaitent allier exploration et farniente.', 'Modéré', 'Perchée sur des falaises plongeant dans des eaux cristallines, cette île est un joyau au milieu de la mer, célèbre pour ses couchers de soleil à couper le souffle. Les ruelles étroites, bordées de fleurs et de maisons pittoresques, conduisent à des recoins cachés où le temps semble s\'arrêter.', 'Europe', '180.00', 5, 10, 'ae95bab9-750b-4377-a312-0f0485eae715.webp', 'Ville bordée par la mer avec des montagnes au loin', 0),
(32, 'Aventure glaciaire : immersion au cœur des horizons gelés', 'Le climat de cette destination est souvent frais et imprévisible. Les journées peuvent alterner entre un soleil éclatant et des bourrasques de vent glacé, et il n\'est pas rare de ressentir des variations de température saisissantes au cours d\'une même journée. La proximité des montagnes et des glaciers contribue à cette atmosphère imprévisible et vivifiante.', 'Hivernal', 'Votre séjour comprendra une immersion totale dans un environnement naturel. Vous passerez vos nuits dans divers hébergements allant de simples cabanes de montagne à des refuges écologiques confortables, avec vue sur des paysages époustouflants. L’expérience sera marquée par l\'esprit d\'aventure et la découverte de la faune locale et des traditions régionales.', 'Multi-hébergements', 'Préparez-vous à vivre une aventure active : des randonnées sur des sentiers escarpés, des excursions en kayak le long de côtes sauvages, et l\'observation de glaciers en bateau font partie des activités. L\'environnement spectaculaire invite à se dépasser tout en profitant de l\'air pur et du silence impressionnant de la nature.', 'Aventureux', 'Cette région se trouve dans une terre éloignée, vaste et indomptée, où la nature règne en maître. Des étendues infinies de montagnes, de glaciers scintillants, de lacs aux reflets émeraude et de forêts profondes composent ce lieu unique. Laissez-vous emporter par des paysages dramatiques, où chaque pas révèle un nouveau panorama saisissant, digne d\'une peinture', 'Amérique', '250.00', 14, 21, '2938ce55-2fa7-46b4-b0f7-fa03591fc125.webp', 'Chaine de montagne eneigée au loin, avec un animal en premier plan', 0),
(33, 'Ville antique : trésor du passé', 'La région bénéficie d\'un climat méditerranéen, avec des étés ensoleillés et chauds, parfaits pour explorer les sites historiques en plein air. Les saisons intermédiaires, avec leurs températures agréables et leurs brises douces, sont idéales pour déambuler dans les rues et s\'arrêter dans les cafés pittoresques.', 'Chaud et ensoleillé', 'Votre séjour sera marqué par le charme intemporel des hébergements traditionnels, tels que des villas élégantes et des hôtels de caractère. Des visites guidées privées vous dévoileront les secrets de lieux emblématiques, tandis que des dégustations de mets locaux, servis dans des trattorias familiales, raviront vos papilles et enrichiront votre expérience culturelle.', 'Classique et confortable', 'Le rythme de ce séjour est modéré, adapté aux promenades à travers les ruelles, aux visites de sites historiques et aux découvertes architecturales. Prévoyez des moments de marche prolongée pour admirer les détails et vous imprégner de l\'atmosphère singulière de la ville, entrecoupés de pauses dans des places animées.', 'Modéré', 'Cette ville millénaire est un écrin de patrimoine, où le passé glorieux se mêle harmonieusement au présent. De grandes places bordées de monuments historiques, de ruines antiques et de musées captivants racontent des histoires vieilles de plusieurs siècles. Les rues pavées serpentent entre des édifices majestueux, laissant chaque visiteur émerveillé par la richesse de son histoire.', 'Europe', '120.00', 4, 7, '48d0a46e-ebe6-41ff-9033-4c149f4b2868.webp', 'Une ville, un pont, avec des monuments au loin', 0),
(34, 'Nordique sauvage : évasion verte', 'La région est réputée pour ses hivers rigoureux, où les températures peuvent descendre bien en dessous de zéro, enveloppant la nature d\'une couverture de neige étincelante. En été, les journées s\'étirent sous un soleil radieux, permettant des aventures en plein air sous une douce chaleur.', 'Hivernal', 'Votre hébergement sera typique et authentique : des chalets en bois au bord des lacs, des cabanes nichées au cœur de la forêt, et des hôtels offrant une vue imprenable sur la nature sauvage. Une nuit sous le ciel étoilé, avec l’espoir d’apercevoir les danses des aurores boréales, viendra couronner votre expérience. Profitez aussi des traditions locales, notamment les saunas chauffés au feu de bois.', 'Nature et authentique', 'Les activités incluent des randonnées modérées à travers les paysages enneigés, des balades en chiens de traineau, et des excursions en raquettes. Vous pourrez également explorer la région en canoë ou en bateau pendant la saison estivale, et observer la faune locale, des rennes aux élans majestueux.', 'Modéré', 'Vous découvrirez un territoire parsemé de lacs immaculés, de forêts infinies et de cieux illuminés par des aurores boréales. Cet endroit est un sanctuaire pour les amoureux de la nature et les âmes en quête de sérénité. Entre lacs scintillants et forêts enneigées, chaque instant passé ici invite à la contemplation et au ressourcement.', 'Europe', '170.00', 7, 12, 'ae0caaf5-1877-471a-b52a-7385fc031d6f.webp', 'Chiens de traineau dans la neige', 0),
(35, 'Évasion sauvage : nature majestueuse', 'Le climat varie au gré des saisons et des régions. Si les étés sont doux, parfaits pour profiter des paysages en plein air, les hivers offrent des conditions propices à des expériences uniques. Vous vivrez au rythme des saisons, avec des températures qui changent tout au long de l\'année, apportant un charme différent à chaque période.', 'Tempéré et doux', 'Séjournez dans des hébergements confortables, au cœur de la nature, où le calme et la sérénité sont les maîtres mots. Vous découvrirez des endroits qui allient l’authenticité et la simplicité, idéals pour des moments de détente après des journées bien remplies. Ce voyage est l’occasion de se ressourcer tout en explorant des sites naturels et culturels fascinants.', 'Classique et confortable', 'Les activités proposées varient entre des explorations en plein air et des découvertes culturelles. Vous aurez l\'occasion de parcourir des sentiers boisés, de profiter des lacs pour des moments de tranquillité, et de visiter des lieux empreints d’histoire et de culture. Tout cela à un rythme modéré, sans précipitation, pour profiter pleinement des paysages.', 'Modéré', 'Un vaste territoire où les paysages sont aussi divers que la nature elle-même. Des montagnes majestueuses aux lacs scintillants, cette destination vous plonge dans une atmosphère où l’air frais et les panoramas à couper le souffle sont au rendez-vous. Entouré de forêts verdoyantes et de vastes étendues sauvages, vous aurez l’opportunité d’explorer des sites naturels remarquables, loin de l\'agitation des grandes villes.', 'Amérique', '180.00', 10, 14, 'e22331c4-3a65-4017-a891-eac07ef15dcd.webp', 'Un lac au bord des montagnes enneignées', 0),
(36, 'Odyssée Africaine : liberté et faune', 'Le climat en Afrique du Sud varie en fonction des régions. Les côtes sont tempérées, tandis que l\'intérieur du pays bénéficie d\'un climat plus continental, avec des étés chauds et des hivers frais. Le printemps et l\'automne offrent les meilleures conditions pour explorer le pays, avec des températures douces et des journées ensoleillées.', 'Tempéré et doux', 'Vous séjournerez dans des lodges confortables, des hôtels écologiques ou des chalets au cœur des réserves naturelles. Ce road trip vous permettra de découvrir la culture locale, la cuisine traditionnelle et des paysages incroyables tout en restant dans des hébergements variés et confortables.', 'Multi-hébergements', 'Les activités sont modérées à dynamiques, avec des safaris dans les parcs nationaux, des randonnées dans les montagnes, des excursions en voiture le long de la Garden Route, ainsi que des moments de détente sur les plages de sable doré.', 'Modéré', 'L\'Afrique du Sud offre une diversité incroyable de paysages, allant des plages sauvages aux montagnes majestueuses et aux savanes peuplées de lions, éléphants et rhinocéros. Un road trip à travers ce pays est l\'occasion de découvrir la faune, les vignobles et les plages de renommée mondiale.', 'Afrique', '180.00', 10, 14, 'ba1b3429-53bb-48f6-89b5-9e2b1e2fdf4c.webp', 'Une voiture dans la savane, avec au fond une girafe', 0),
(37, 'Charme ancien : trésors et tradition', 'Le climat est doux, idéal pour flâner en extérieur. L’air frais du matin vous pousse à explorer les parcs verdoyants, où les arbres centenaires créent une ombre agréable pendant vos promenades. Les journées ensoleillées donnent aux toits de la ville une teinte dorée, et les soirées sont rafraîchissantes, parfaites pour savourer une bière artisanale locale sur une terrasse.', 'Tempéré et doux', 'Vous séjournerez dans un hôtel au charme historique, où l’intérieur a été restauré avec goût tout en préservant l\'authenticité du lieu. Les chambres sont spacieuses, décorées de meubles d\'époque, offrant un confort moderne dans un cadre ancien. Le matin, vous serez réveillé par les premiers rayons du soleil qui se frayent un chemin à travers des fenêtres antiques, et vous pourrez apprécier un petit déjeuner avec des produits frais, locaux et faits maison.', 'Classique et confortable', 'Ce séjour sera ponctué de visites à pied à travers la ville, avec une découverte des principaux monuments culturels, mais aussi de lieux cachés loin des sentiers battus. Vous explorerez les galeries d’art, les parcs historiques, et aurez même l’opportunité de faire une petite croisière sur la rivière pour observer la ville sous un autre angle. Le tout dans une atmosphère calme et détendue, sans pression ni hâte.', 'Modéré', 'Une ville où les pavés anciens résonnent sous vos pas et où les rues vous racontent des histoires centenaires. Vous marcherez le long de ponts majestueux surplombant une rivière bordée de vieux bâtiments aux façades baroques, surmontés de toits en ardoise. La ville cache ses secrets derrière chaque coin de rue : des musées dissimulés dans des bâtiments historiques, des places cachées où les habitants aiment se retrouver. Il ne fait aucun doute que ce lieu regorge d’un patrimoine culturel que vous n’oublierez pas.', 'Europe', '130.00', 4, 7, '5be63741-9b72-46c4-a1df-62d30ce17a05.webp', 'Photo d\'une ville, avec une rivière au centre', 0),
(38, 'Horizons glacés : l\'appel de l\'aventure', 'Le climat y est frais, parfois humide, mais c\'est ce qui rend les paysages encore plus saisissants. Le vent puissant de la région fait virevolter les brins d\'herbe tout en apportant une fraîcheur agréable, notamment lors de vos explorations en plein air. Les nuits sont fraîches, mais les journées offrent un répit agréable à la découverte de cette région unique.', 'Humide', 'Tout au long du voyage, vous séjournerez dans des hébergements variés : des refuges en montagne, des maisons d’hôtes au bord des lacs, et des lodges dans des endroits reculés. Chaque étape vous permet de découvrir une facette différente de la Patagonie, du confort d’un lodge chaleureux à l\'authenticité d’une petite cabane isolée.', 'Multi-hébergements', 'Ce voyage est dynamique et actif, avec des randonnées au cœur de parcs nationaux célèbres, des excursions en bateau sur les fjords, des explorations en 4x4 dans des terrains isolés. Vous vivrez chaque étape en pleine immersion dans la nature, un véritable défi pour les aventuriers en quête de sensations fortes et de découvertes à chaque tournant.', 'Dynamique', 'Dans cette région reculée, vous découvrirez des paysages spectaculaires : des montagnes escarpées aux pics enneigés, des glaciers imposants qui dévalent les vallées, et des lacs aux couleurs irréelles. En traversant des forêts denses et des steppes, vous serez constamment entouré par une nature sauvage et indomptée, loin de l’agitation des grandes villes. C\'est un véritable retour à l\'essentiel, un endroit où la beauté brute de la nature prime.', 'Amérique', '160.00', 14, 21, '8db9dab9-7ee0-4aed-8ce3-cda2aa26f429.webp', 'Un lac et des montagnes enneigées au loin', 0),
(39, 'Retraite himalayenne : sérénité intemporelle', 'Le climat est doux, offrant une fraîcheur agréable tout au long de l\'année. Ici, la température idéale pour des moments de calme en extérieur et de contemplation. Que ce soit lors de vos pauses dans les jardins d’herbes médicinales ou lors de vos promenades en altitude, le temps est toujours apaisant, avec des brises légères portées par la montagne.', 'Tempéré et doux', 'Séjournez dans des structures simples, conçues pour permettre une immersion totale dans l’essence spirituelle des lieux. En harmonie avec l\'environnement, les hébergements en bois, épurés mais confortables, vous offriront un cadre propice à la méditation et à la détente. Vous vivrez au rythme des traditions anciennes, dans une atmosphère sereine, où chaque moment devient une occasion de se reconnecter à soi-même.', 'Nature et authentique', 'Les activités proposées sont axées sur le calme et le ressourcement. Vous pratiquerez des séances de yoga au lever du soleil, suivies de méditations guidées qui vous guideront dans un voyage intérieur. Les promenades sont lentes et paisibles, sur des sentiers bordés de fleurs sauvages, permettant à votre esprit de se libérer tout en vous immergeant dans la nature environnante. Ce séjour est avant tout une invitation à ralentir, à être pleinement présent.', 'Relax', 'Imaginez un endroit isolé, où les paysages montagneux se fondent avec la spiritualité des lieux. Des monastères ancestraux se dressent fièrement sur les flancs escarpés des montagnes, accessibles uniquement par des sentiers sinueux qui serpentent à travers des forêts denses. La nature, encore préservée, vous enveloppe de silence et d’une quiétude sans pareille, propice à la réflexion et à la méditation. Vous serez immergé dans un cadre naturel où chaque lever de soleil semble marquer le début d’une nouvelle introspection.', 'Asie', '100.00', 7, 14, '66c936bf-74b5-4ba1-b0be-5768c3253a06.webp', 'Un monastère sur les flancs des montagnes', 0),
(40, 'Immersion sauvage : l\'appel de la nature inaltérée', 'Le climat est chaud et ensoleillé, avec une brise légère qui soulage les températures élevées pendant les safaris. La chaleur de la journée cède la place à des nuits fraîches sous un ciel étoilé. Vous apprécierez le contraste entre l’aridité de certaines zones et la verdure qui s’épanouit après la saison des pluies. La nature est omniprésente, et chaque moment semble être une découverte de nouveaux aspects de ce vaste terrain de jeu naturel.', 'Chaud et ensoleillé', 'L’hébergement est unique et tout en harmonie avec la nature : des lodges en toile et en bois, conçus pour s’intégrer parfaitement dans le paysage. Chaque lodge dispose de sa propre terrasse privée, où vous pourrez admirer la faune sauvage et écouter les bruits de la savane. Le confort est de mise, avec des lits à baldaquin, des salons ouverts pour se détendre après une journée d’exploration, et des repas cuisinés avec des ingrédients locaux frais.', 'Nature et authentique', 'Préparez-vous pour des safaris en 4x4 au cœur des réserves naturelles, où vous serez guidé par des experts locaux passionnés par la faune et la flore. Les matinées sont dédiées à l’observation des animaux sauvages, tandis que l’après-midi sera plus détendu, avec des moments de repos dans le lodge ou des promenades tranquilles à la recherche d’animaux plus petits, souvent invisibles à l’œil nu. Le soir, des feux de camp sont allumés pour une immersion totale dans l’ambiance de la savane.', 'Aventureux', 'Imprégnez-vous des paysages grandioses d’une région où la nature semble toujours intacte. Imaginez une vaste savane, baignée par la lumière dorée du matin, où des troupeaux de zèbres et de gnous se déplacent au loin, tandis que les oiseaux rares chantent dans les arbres. À l’horizon, les montagnes lointaines semblent veiller sur cette terre ancestrale, un monde où le temps semble suspendu. Vous serez immergé dans une ambiance sauvage, loin de toute civilisation moderne.', 'Afrique', '180.00', 7, 14, 'f05cb877-244c-4ff9-b2e1-a247817aca0c.webp', 'Des éléphants dans la savane', 0),
(41, 'Ressourcez-vous : entre sérénité et exploration', 'Le climat est chaud, avec une humidité qui enveloppe doucement la végétation dense, créant une atmosphère apaisante. Les journées sont longues et baignées de lumière, idéales pour des balades dans la jungle, tandis que les nuits restent agréablement chaudes, parfaites pour se détendre après une journée d\'exploration.', 'Chaud et ensoleillé', 'Séjournez dans des bungalows en bois, typiques de la région, ouverts sur la nature. Vous profiterez d’un environnement calme, parfait pour la méditation et la relaxation. Les chambres sont simples mais très confortables, et le décor est un mélange d\'éléments traditionnels et modernes, créant une ambiance zen.', 'Classique et confortable', 'Votre voyage sera axé sur la détente et l’épanouissement personnel. Vous aurez l’opportunité de participer à des séances de yoga au lever du soleil, de méditer dans des temples tranquilles, et de découvrir des pratiques ancestrales liées à la culture locale. Chaque activité est conçue pour vous aider à vous reconnecter avec vous-même, loin du tumulte de la vie quotidienne.', 'Relax', 'Cette île paradisiaque, où les plages bordent des jungles luxuriantes et des montagnes sacrées, est un lieu de sérénité. Vous serez entouré de rizières en terrasses, de temples anciens et de villages traditionnels où les habitants vivent en harmonie avec la nature. Des vallées profondes offrent une tranquillité rare, idéale pour la réflexion et le ressourcement.', 'Asie', '90.00', 14, 21, 'd7f8a5d6-c66f-47f0-973b-7cf72fcffe1e.webp', 'Plage paradisiaque avec des pirogues sur le sable', 0),
(42, 'Expéditions au cœur de la jungle : l\'appel du sauvage', 'Ici, le climat est chaud et souvent humide, propice à une immersion totale dans un écosystème luxuriant. Les températures agréablement chaudes vous encourageront à explorer le jour et à profiter de la fraîcheur relative des nuits.', 'Humide', 'Vous séjournerez dans des lodges en bois, sur pilotis, à l’orée de la jungle, offrant un luxe rustique et une vue imprenable sur la forêt et ses habitants. Ces hébergements disposent de tout le confort nécessaire tout en étant en totale harmonie avec l’environnement, vous assurant une expérience immersive et authentique.', 'Nature et authentique', 'Les activités proposées combinent exploration et détente : excursions en bateau sur des rivières cachées, randonnées guidées par des experts locaux qui vous enseigneront l\'art de survivre dans la jungle, et moments de repos dans des hamacs suspendus face à des paysages à couper le souffle. Des sorties nocturnes sont également proposées pour observer la faune exotique.', 'Dynamique', 'Vous serez plongé dans l\'une des jungles les plus riches et diversifiées de la planète, où la nature règne en maître. Le chant des oiseaux tropicaux et le bruissement des feuilles dans la brise humide accompagnent vos pas sur des chemins de terre serpentant entre les arbres géants. Parfois, un clair de lune perçant la canopée éclaire un bras de rivière mystérieux, où la faune locale se dévoile aux plus attentifs.', 'Amérique', '300.00', 14, 21, '24fa80fb-12b0-41a2-b36f-0a8040c60cd9.webp', 'Forêt verte avec un fleuve traversant', 0),
(43, 'Évasion Alpestre : vues infinies et sérénité montagnarde', 'Le climat est frais, parfait pour les randonnées estivales ou les promenades autour des lacs. Les journées sont ensoleillées mais tempérées par l\'altitude, et les nuits sont fraîches, incitant à se blottir sous des couvertures dans un chalet douillet.', 'Frais', 'Vous séjournerez dans des chalets alpins confortables, dotés de cheminées crépitantes et de terrasses surplombant des panoramas à couper le souffle. L\'intérieur est chaleureux, habillé de bois et de tissus moelleux, créant une atmosphère intime propice au repos après une journée de découverte.', 'Classique et confortable', 'Les activités sont modérées, comprenant des randonnées à travers des sentiers bien entretenus, des visites de petits villages de montagne et des excursions en téléphérique pour atteindre les sommets. Les plus courageux peuvent s\'aventurer à faire de l’escalade légère ou des sorties en parapente pour admirer le paysage alpin depuis les airs.', 'Modéré', 'Partez à la découverte d’une région où les montagnes majestueuses se découpent à l\'horizon, offrant des vues spectaculaires à chaque tournant. Les villages pittoresques avec leurs chalets en bois traditionnels ponctuent le paysage, et les lacs reflètent des sommets enneigés tout au long de l’année. Les échos des cloches des vaches résonnent dans les vallées verdoyantes, où le silence est entrecoupé par le murmure des rivières glaciaires.', 'Europe', '270.00', 5, 10, '516ede0f-d076-4bb1-97c1-ebc5a987d76e.webp', 'Un lac au bord des montagnes', 0),
(44, 'Voyage au temps perdu : secrets des collines anciennes', 'Le climat est tempéré et agréable, surtout au printemps et à l\'automne, avec des températures fraîches qui permettent des promenades sans être accablé par la chaleur. Les soirs peuvent être un peu frais, parfaits pour se réchauffer autour d\'un feu de camp.', 'Tempéré et doux', 'Votre séjour se déroulera dans de petites pensions familiales, au charme rustique, où l\'hospitalité locale est de mise. Ces hébergements simples mais confortables permettent une immersion totale dans la culture régionale, avec des repas faits maison et des chambres aux meubles anciens.', 'Économique et pratique', 'Les activités sont modérées, incluant des randonnées à travers les forêts, des visites de monastères isolés et des explorations de grottes. Les amateurs d’histoire pourront découvrir les coutumes locales et participer à des ateliers artisanaux traditionnels.', 'Modéré', 'Imaginez-vous parcourir des collines verdoyantes où d\'anciennes légendes prennent vie. Des villages séculaires, dont l\'architecture médiévale raconte une histoire ancienne, se nichent entre les montagnes. Au loin, des châteaux mystérieux se dressent, rappelant des récits de chevaliers et de mythes oubliés. Les chemins de randonnée offrent des vues panoramiques sur des vallées brumeuses, où le temps semble s’être arrêté.', 'Europe', '75.00', 5, 8, '3ba517f9-cef1-4882-9ab2-f72aec81f36a.webp', 'Un château dans une montagne', 0),
(45, 'Rêverie sous les étoiles : tranquillité et immersion berbère', 'Le climat est généralement chaud et ensoleillé en journée, mais les températures chutent agréablement le soir, offrant un répit bienvenu et la possibilité de savourer des soirées étoilées.', 'Chaud et ensoleillé', 'Les hébergements se composent de riads simples et accueillants, dotés de cours intérieures où le thé à la menthe est servi sous le parfum des jasmins. L\'architecture traditionnelle, avec ses murs en terre cuite et ses tapis colorés, offre un dépaysement total.', 'Nature et authentique', 'Les activités incluent des balades à dos de mulet, des randonnées sur les chemins de montagne, et la découverte de marchés locaux où l’artisanat est roi. Pour ceux en quête de tranquillité, des séances de méditation en plein air et des bains de pieds dans des ruisseaux de montagne sont idéaux.', 'Relax', 'Dans les montagnes accidentées, à l\'ombre des sommets enneigés, s\'étendent des vallées où des villages berbères colorés se fondent dans le paysage. Les sentiers serpentent entre des cultures en terrasses et des oliveraies parfumées, tandis que l\'air résonne du son lointain des flûtes et des chants pastoraux. Chaque lever de soleil dévoile un décor époustouflant, baigné de lumière dorée.', 'Afrique', '90.00', 4, 7, '77703e12-681c-49e5-b010-e49df9ac4819.webp', 'Village avec le désert au loin', 0),
(46, 'Brumes et montagnes : à la découverte des secrets cachés', 'Le climat est frais et humide, une combinaison parfaite pour découvrir la beauté brute des Highlands. Les journées sont souvent baignées par des cieux changeants, et les nuits offrent une atmosphère cosy sous des couvertures épaisses dans des auberges de charme.', 'Tempéré et doux', 'Séjournez dans des cottages en pierre traditionnels, dotés de cheminées crépitantes et de vues spectaculaires sur les montagnes. Profitez de la simplicité et de l’authenticité des lieux, pour une expérience intime et reposante.', 'Nature et authentique', 'Explorez les sentiers battus lors de randonnées tranquilles à travers les vallées, ou laissez-vous tenter par une balade en bateau sur un loch pour découvrir la faune locale. Une escapade parfaite pour les amateurs de calme et de nature. ', 'Modéré', 'Partez à la découverte d’une région où les paysages sauvages alternent entre montagnes escarpées, lochs mystérieux et forêts denses. Les ruines d\'anciennes forteresses se dressent fièrement au sommet des collines, tandis que des villages pittoresques au charme authentique vous accueillent. Les échos des cornemuses flottent dans l’air frais du matin, et le vent fait danser les brumes qui entourent les lacs secrets. ', 'Europe', '200.00', 2, 4, 'a09a2c58-85f7-4f21-8cd7-598d473a16d3.webp', 'Cascade tombant d\'une falaise dans la mer', 0),
(47, 'Voyage au cœur des traditions : entres saveurs et histoire', 'Le climat est doux et agréable, avec des journées ensoleillées et une brise marine légère. Idéal pour se promener dans les ruelles et découvrir des panoramas époustouflants. Les soirées, tempérées et charmantes, invitent à flâner sous les étoiles.', 'Tempéré et doux', 'Logez dans des maisons traditionnelles, offrant une touche de modernité tout en préservant le charme ancien. Des terrasses ombragées, des jardins secrets et des chambres avec vue sur la mer créent un cadre paisible et agréable.', 'Classique et Confortable', 'Rien de plus agréable que de se perdre dans les rues pavées, d’explorer les marchés locaux ou de goûter aux spécialités culinaires portugaises. Les activités sont douces et permettent une immersion dans la culture locale, tout en offrant des moments de détente bien mérités.', 'Relax', 'Laissez-vous envoûter par l’ambiance envoûtante des ruelles pavées et des maisons aux façades colorées. Cette destination vous plonge dans l’histoire et la culture du pays, où les musiques traditionnelles et l\'odeur des pastéis de nata flottent dans l’air. Des collines verdoyantes offrent une vue imprenable sur l’Atlantique, tandis que les petites places vous invitent à vous arrêter pour savourer un café en terrasse.', 'Europe', '180.00', 2, 4, '218d5061-61ef-4ed0-90bd-b733274bf9cb.webp', 'Tram coloré dans des ruelles', 0);

-- --------------------------------------------------------

--
-- Structure de la table `objectContact`
--

CREATE TABLE `objectContact` (
  `id` int(11) NOT NULL,
  `choice` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `objectContact`
--

INSERT INTO `objectContact` (`id`, `choice`) VALUES
(1, 'Demande d\'informations générales'),
(2, 'Demande d\'informations sur une destination mystère'),
(3, 'Demande d\'informations sur la destination sur-mesure'),
(4, 'Suivi de réservation'),
(5, 'Autres');

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `numberAdult` int(10) UNSIGNED NOT NULL,
  `numberChild` int(10) UNSIGNED DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = non traité, 1 = en cours de traitement, 2 = traité',
  `user_id` int(11) NOT NULL,
  `mystDestination_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `startDate`, `endDate`, `numberAdult`, `numberChild`, `createdDate`, `status`, `user_id`, `mystDestination_id`) VALUES
(7, '2024-10-27', '2024-10-30', 2, NULL, '2024-10-24 15:29:05', 0, 6, 1),
(11, '2024-11-21', '2024-12-02', 4, 2, '2024-11-13 17:27:32', 0, 13, 27),
(14, '2024-11-29', '2024-12-11', 2, NULL, '2024-11-21 22:55:12', 2, 4, 1),
(17, '2024-12-18', '2024-12-31', 2, NULL, '2024-11-26 22:17:42', 0, 13, 1),
(19, '2025-01-01', '2025-01-14', 2, NULL, '2024-11-30 19:27:30', 0, 4, 3),
(25, '2024-12-16', '2024-12-24', 3, NULL, '2024-12-08 12:42:15', 0, 13, 40),
(26, '2024-12-19', '2024-12-25', 4, NULL, '2024-12-11 16:24:54', 1, 18, 34),
(27, '2024-12-25', '2025-01-02', 2, NULL, '2024-12-11 16:28:57', 0, 18, 34);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('PZ4m3gvUBHxTIAMFT26sdPonlwa5KXcv', 1734038686, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-12-12T20:48:41.956Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":4,\"firstname\":\"anna\",\"lastname\":\"mol\",\"email\":\"azerty@gmail.com\",\"role\":\"admin\"},\"isLogged\":true}');

-- --------------------------------------------------------

--
-- Structure de la table `typeExperience`
--

CREATE TABLE `typeExperience` (
  `id` int(11) NOT NULL,
  `choice` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `typeExperience`
--

INSERT INTO `typeExperience` (`id`, `choice`) VALUES
(1, 'Aventure en pleine nature (randonnée, camping, montagnes)'),
(2, 'Détente et relaxation (plages, spas, resorts)'),
(3, 'Découverte culturelle (villes, musées, sites historiques)'),
(4, 'Immersion locale (gastronomie, rencontres avec les locaux)'),
(5, 'Expérience surprenante (mixte, hors des sentiers battus)'),
(6, 'Aucune préférence');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` char(60) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `createdDate`, `role`) VALUES
(4, 'anna', 'mol', 'azerty@gmail.com', '$2b$10$1okWH8Jy1U84FQmmszg5VewUdJIiQNmo2ohfu95Wfsy8R72VSzwuG', '2024-10-08 00:00:00', 'admin'),
(6, 'eva', 'cou', 'evacou@gmail.com', '$2b$10$qJr2r2JoeNAcj2Ef.zFOx.ignBo0eeVtyCjK22XjNvDFirKWYPvCK', '2024-10-08 00:00:00', 'user'),
(13, 'eno', 'mol', 'enomol@gmail.com', '$2b$10$9ggsGGGN8M6rkpUIUHHFbem6/mgIRbM9I9SWEZ0GsVUi.6lWy/R2u', '2024-10-14 16:49:50', 'user'),
(14, 'Fabrice', 'Fabrice', 'fabrice@gmail.com', '$2b$10$0wPkyfdyK8AWMHLPGSEQkuFln0leHD7mDCg31tu.7nYagLmHq/I1m', '2024-12-08 17:50:20', 'user'),
(15, 'admin', 'admin', 'admin@myst-travel.com', '$2b$10$Pn8qTA64/Pkdr2QbmztTPO8xzig8cGARkfi510kQ/8d/T7gaSYYe.', '2024-12-09 12:22:48', 'admin'),
(17, 'Annaïg', 'Molac', 'annaigmolac@gmail.com', '$2b$10$dVMDolUXRUToGTjs9VQo0OOvAYykyYE0y5PZBkkw3gBDUaTht85pW', '2024-12-09 12:27:52', 'user'),
(18, 'user', 'user', 'user@gmail.com', '$2b$10$Gb7IpViG0/QYqqYyj2QYpuwSsqK4xDnLT8KPna5SQsj98QgM5gX3W', '2024-12-11 16:21:22', 'user');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `accomodation`
--
ALTER TABLE `accomodation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `climate`
--
ALTER TABLE `climate`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `contact_ibfk_1` (`objectContact_id`);

--
-- Index pour la table `culture`
--
ALTER TABLE `culture`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `customizedTrip`
--
ALTER TABLE `customizedTrip`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customizedtrip_ibfk_1` (`accomodation_id`),
  ADD KEY `customizedtrip_ibfk_2` (`activity_id`),
  ADD KEY `customizedtrip_ibfk_5` (`culture_id`),
  ADD KEY `customizedtrip_ibfk_7` (`location_id`),
  ADD KEY `customizedtrip_ibfk_8` (`typeExperience_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `customizedtrip_ibfk_4` (`climate_id`);

--
-- Index pour la table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `mystDestination`
--
ALTER TABLE `mystDestination`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `objectContact`
--
ALTER TABLE `objectContact`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservation_ibfk_1` (`mystDestination_id`),
  ADD KEY `reservation_ibfk_2` (`user_id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Index pour la table `typeExperience`
--
ALTER TABLE `typeExperience`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `accomodation`
--
ALTER TABLE `accomodation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `climate`
--
ALTER TABLE `climate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `culture`
--
ALTER TABLE `culture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `customizedTrip`
--
ALTER TABLE `customizedTrip`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `mystDestination`
--
ALTER TABLE `mystDestination`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT pour la table `objectContact`
--
ALTER TABLE `objectContact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `typeExperience`
--
ALTER TABLE `typeExperience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`objectContact_id`) REFERENCES `objectContact` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `customizedTrip`
--
ALTER TABLE `customizedTrip`
  ADD CONSTRAINT `customizedtrip_ibfk_1` FOREIGN KEY (`accomodation_id`) REFERENCES `accomodation` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `customizedtrip_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `customizedtrip_ibfk_4` FOREIGN KEY (`climate_id`) REFERENCES `climate` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `customizedtrip_ibfk_5` FOREIGN KEY (`culture_id`) REFERENCES `culture` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `customizedtrip_ibfk_7` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `customizedtrip_ibfk_8` FOREIGN KEY (`typeExperience_id`) REFERENCES `typeExperience` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `customizedtrip_ibfk_9` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`mystDestination_id`) REFERENCES `mystDestination` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
