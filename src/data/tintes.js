// Carta de tintes Vehicolor 1K y 2K.
// Códigos, nombres y mezclas de las cartas oficiales (public/cartas-color/*.pdf).
// Los colores se midieron sobre la carta escaneada: en pantalla son aproximados.

export const TINT_SERIES = [
  { id: '1k-color', system: '1K', name: 'Colores 1K', en: '1K Metallic Color', effect: 'solid', mix: [{ label: 'Con plata 1106', ratio: '1:1' }, { label: 'Con perla 1306', ratio: '6:4' }] },
  { id: '1k-plata', system: '1K', name: 'Platas 1K', en: '1K Silver', effect: 'metallic', mix: [{ label: 'Con azul 1042', ratio: '1:1' }] },
  { id: '1k-plata-color', system: '1K', name: 'Platas de color 1K', en: '1K Special Silver', effect: 'metallic', mix: [{ label: 'Con negro 1021', ratio: '9:1' }] },
  { id: '1k-perla', system: '1K', name: 'Perlas 1K', en: '1K Pearl', effect: 'pearl', mix: [{ label: 'Con negro 1021', ratio: '9:1' }] },
  { id: '1k-perla-especial', system: '1K', name: 'Perlas especiales 1K', en: '1K Special Pearl', effect: 'pearl', mix: [{ label: 'Con negro 1021', ratio: '9:1' }] },
  { id: '1k-perla-cristal', system: '1K', name: 'Perlas cristal 1K', en: '1K Crystal Pearl', effect: 'crystal', mix: [{ label: 'Con negro 1021', ratio: '9:1' }] },
  { id: '2k-solido', system: '2K', name: 'Sólidos 2K', en: '2K Solid Color', effect: 'solid', mix: [{ label: 'Con blanco 2011', ratio: '1:1' }] },
]

// [código, nombre, nombre en la carta, descripción, color puro, tono claro, tono oscuro, [colores en mezcla]]
// Los colores en mezcla siguen el orden de `mix` de su serie.
const ROWS = {
  '1k-color': [
    ['1011', 'Blanco', 'White', 'Blanco estándar', '#f3f4f4', '#f3f5f4', '#f2f4f3', ['#bec6c9', '#f1f3f2']],
    ['1012', 'Blanco para entonar', 'White (for color mixing)', 'Blanco de alto rendimiento', '#f3f4f4', '#f3f5f4', '#f2f4f3', ['#bfc7ca', '#f1f3f2']],
    ['1013', 'Blanco gema', 'Gem white', 'Frente dorado y lado blanco azulado', '#f0efeb', '#f0efeb', '#efeeea', ['#afb3b3', '#eeedeb']],
    ['1021', 'Negro para entonar', 'Black (for color mixing)', 'Negro con matiz amarillo, para entonar', '#0d0d0e', '#0e0f10', '#0b0b0b', ['#524c42', '#262726']],
    ['1022', 'Negro internacional', 'International black', 'Matiz azul; ideal para negro perla', '#090a0e', '#0b0c10', '#08090d', ['#4b463d', '#252525']],
    ['1023', 'Negro azulado', 'Blue black', 'Negro con matiz azul', '#08090c', '#0a0b0f', '#07080a', ['#444036', '#242524']],
    ['1024', 'Negro súper intenso', 'Super black', 'Negro profundo con matiz azul', '#08090b', '#0a0b0d', '#060709', ['#3d392e', '#212322']],
    ['1031', 'Morado', 'Purple', 'Morado con matiz rojo y azul', '#0e0e0f', '#111010', '#0c0c0c', ['#381c5a', '#180546']],
    ['1041', 'Azul rojizo', 'Reddish blue', 'Azul con matiz morado', '#0b081d', '#0c0a1e', '#0a071c', ['#283b69', '#07175b']],
    ['1042', 'Azul estándar', 'Standard blue', 'Azul estándar con ligero matiz rojo', '#06023a', '#06033a', '#060139', ['#001d79', '#02035c']],
    ['1043', 'Azul orgánico', 'Organic blue', 'Frente verde y lado rojo', '#08014d', '#08024c', '#07004e', ['#00247a', '#01036c']],
    ['1044', 'Azul verdoso', 'Greenish blue', 'Frente azul y lado verde', '#04032c', '#05042d', '#03022b', ['#002165', '#000753']],
    ['1045', 'Azul lago', 'Lake blue', 'Frente verdoso y lado verde oscuro', '#01052a', '#03072c', '#000429', ['#002760', '#001260']],
    ['1046', 'Azul transparente', 'Transparent blue', 'Frente verde y lado verde oscuro', '#000424', '#010624', '#000324', ['#00225d', '#000855']],
    ['1047', 'Azul índigo', 'Indigo', 'Muy transparente y vivo, con matiz rojo', '#0f015b', '#10025b', '#0f005b', ['#567fd0', '#1a43bb']],
    ['1051', 'Verde olivo', 'Olive green', 'Frente dorado y lado verde', '#3e4000', '#3f4101', '#3c3e00', ['#ad9a0c', '#937c00']],
    ['1052', 'Verde amarillento', 'Yellowish green', 'Verde con matiz amarillo, color vivo', '#042419', '#06261b', '#022216', ['#369962', '#007b45']],
    ['1053', 'Verde', 'Green', 'Verde con matiz azul', '#0b1717', '#0d1919', '#091515', ['#048266', '#00604d']],
    ['1054', 'Oro mágico', 'Magic gold', 'Frente dorado y lado verde', '#653a00', '#663c00', '#613600', ['#9b9504', '#c69e00']],
    ['1061', 'Amarillo brillante', 'Bright yellow', 'Amarillo semitransparente con matiz azul', '#d9bb00', '#dabe00', '#d5b900', ['#7e7837', '#ddcb00']],
    ['1062', 'Amarillo limón', 'Lemon yellow', 'Matiz verde, no transparente', '#dfbc00', '#e1be02', '#dcb900', ['#877e05', '#e4c900']],
    ['1063', 'Amarillo transparente', 'Transparent yellow', 'Frente rojo y lado verde, muy transparente', '#dd8700', '#df8900', '#db8400', ['#917300', '#cd8f00']],
    ['1064', 'Amarillo medio', 'Medium yellow', 'Matiz rojo, baja saturación', '#e4a001', '#e5a102', '#e29d00', ['#a38900', '#db9d00']],
    ['1065', 'Amarillo ocre', 'Mud yellow', 'Amarillo con matiz rojo, baja saturación', '#936800', '#946901', '#916600', ['#927413', '#9b6e00']],
    ['1071', 'Naranja transparente', 'Transparent orange', 'Naranja de alta transparencia', '#b71000', '#b91201', '#b40c00', ['#8c550f', '#b64211']],
    ['1072', 'Naranja', 'Orange', 'Naranja con matiz amarillo, poca transparencia', '#ae0e00', '#b01103', '#aa0b00', ['#8a4737', '#b22408']],
    ['1073', 'Naranja rojizo', 'Orange', 'Naranja con matiz amarillo, baja saturación', '#c32100', '#c52401', '#c11f00', ['#983f1a', '#b72200']],
    ['1081', 'Rojo', 'Red', 'Rojo con matiz amarillo, baja saturación', '#980001', '#970102', '#960001', ['#7f1c1c', '#950008']],
    ['1082', 'Rojo vivo transparente', 'Transparent bright red', 'Matiz amarillo, muy transparente y vivo', '#950001', '#950101', '#940000', ['#6f130e', '#9b0002']],
    ['1083', 'Rojo transparente', 'Transparent red', 'Rojo con frente y lado amarillentos', '#6a0005', '#6b0105', '#690005', ['#4e0d19', '#670009']],
    ['1084', 'Rojo café', 'Brown red', 'Frente y lado amarillentos', '#310308', '#33040a', '#2e0104', ['#4a130e', '#450007']],
    ['1085', 'Rojo castaño', 'Chestnut red', 'Frente y lado amarillentos, color vivo', '#1d0504', '#1f0705', '#1b0303', ['#4a0e0c', '#340306']],
    ['1086', 'Rojo óxido', 'Iron red', 'Matiz amarillo, baja saturación', '#712609', '#752709', '#702309', ['#8e3c22', '#802401']],
    ['1087', 'Rojo rosa', 'Rose red', 'Rojo vivo con matiz azul', '#4f081a', '#50091b', '#4b0618', ['#ae3986', '#82023c']],
    ['1088', 'Rojo morado', 'Purple red', 'Rojo con matiz azul', '#460d14', '#470e15', '#450c12', ['#87124b', '#6c0921']],
    ['1089', 'Rojo violeta profundo', 'Deep violet red', 'Rojo con matiz morado y azul', '#330009', '#330009', '#330009', ['#61184e', '#520e27']],
    ['1091', 'Amarillo óxido transparente', 'Transparent yellowish green', 'Amarillo con matiz verde, muy transparente', '#5f2900', '#602a01', '#5f2800', ['#998445', '#915e0c']],
    ['1092', 'Rojo óxido transparente', 'Transparent iron red', 'Rojo con matiz amarillo dorado, muy transparente', '#290706', '#2a0807', '#280604', ['#90551a', '#5b1e03']],
    ['1093', 'Café transparente', 'Transparent brown', 'Café con matiz amarillo y negro', '#210a04', '#230c06', '#1f0802', ['#804221', '#4c1407']],
    ['1095', 'Rojo candy 1', 'Candy red 1', 'Rojo transparente muy concentrado, con matiz azul', '#6a0012', '#6a0112', '#690011', ['#89001c', '#74000b']],
    ['1096', 'Rojo candy 2', 'Candy red 2', 'Rojo transparente muy concentrado', '#4b000c', '#4c000c', '#48000a', ['#81000e', '#5d000c']],
    ['1097', 'Rojo vivo extra transparente', 'Highly transparent bright red', 'Rojo de muy alta transparencia', '#930008', '#97000a', '#900006', ['#9f0000', '#b00000']],
  ],
  '1k-plata': [
    ['1101', 'Plata súper fina', 'Super fine silver', 'Grano súper fino: frente gris y lado blanco', '#d3d3d0', '#e9e9e6', '#bcbbb9', ['#0058ac']],
    ['1102', 'Plata súper fina destellante', 'Super fine glittering silver', 'Grano fino: frente blanco brillante y lado oscuro', '#b4b3b0', '#d0cfcc', '#999894', ['#00499f']],
    ['1103', 'Plata fina', 'Fine silver', 'Frente y lado blancos', '#b8b7b4', '#d5d5d1', '#9c9b97', ['#00489f']],
    ['1104', 'Plata fina destellante', 'Fine glittering silver', 'Frente fino y brillante, lado gris', '#a2a19d', '#c6c5c1', '#83827e', ['#004497']],
    ['1105', 'Plata fina blanca', 'Fine white silver', 'Frente ligeramente gris, lado blanco', '#a8a9a5', '#bebebb', '#949490', ['#00408d']],
    ['1106', 'Plata media', 'Medium silver', 'Grano medio con frente blanco brillante', '#949490', '#aeafab', '#7d7d7a', ['#002e7c']],
    ['1107', 'Plata media destellante', 'Medium glittering silver', 'Grano medio con destello', '#787671', '#91908a', '#65645e', ['#00317f']],
    ['1108', 'Plata media blanca', 'Medium white silver', 'Frente un poco más oscuro que la 1106, lado blanco', '#8f908b', '#a2a29e', '#7f7f7b', ['#003881']],
    ['1109', 'Plata media gruesa', 'Medium coarse silver', 'Frente blanco, más destellante y más gruesa que la 1106', '#706b66', '#85817c', '#605c55', ['#002672']],
    ['1110', 'Plata gruesa blanca', 'Coarse white silver', 'Frente ligeramente oscuro, lado con destello', '#74706b', '#84807c', '#66635e', ['#00266d']],
    ['1111', 'Plata gruesa', 'Coarse silver', 'Frente grueso y brillante, lado oscuro', '#645f5a', '#79736e', '#56514b', ['#011962']],
    ['1112', 'Plata extrafina destellante', 'Extra super fine glittering silver', 'Grano extrafino: frente algo oscuro y lado blanquecino', '#68645f', '#75716c', '#5e5954', ['#002d73']],
  ],
  '1k-plata-color': [
    ['1201', 'Plata dorada media', 'Medium golden silver', 'Aluminio de color con matiz dorado', '#b77e13', '#cd9326', '#a56b04', ['#865e15']],
    ['1202', 'Plata naranja dorada', 'Golden orange silver', 'Aluminio naranja muy saturado, lado oscuro', '#964700', '#a25307', '#8a3d00', ['#793e02']],
    ['1203', 'Plata roja dorada', 'Golden red silver', 'Aluminio rojo dorado muy saturado, lado oscuro', '#812b02', '#92390c', '#731e00', ['#5a2006']],
    ['1204', 'Plata roja', 'Red silver', 'Aluminio de color con matiz rojo', '#8e0c25', '#9e1832', '#82021a', ['#631515']],
    ['1205', 'Plata azul', 'Blue silver', 'Aluminio de color con matiz azul', '#00448c', '#054e97', '#003b83', ['#002d59']],
    ['1206', 'Plata verde amarillo', 'Yellow green silver', 'Aluminio de color con matiz verde amarillento', '#7e7b16', '#9a9730', '#696604', ['#413c0c']],
    ['1207', 'Plata verde', 'Green silver', 'Aluminio verde con lado azulado', '#03655b', '#0e7268', '#005a51', ['#072b22']],
  ],
  '1k-perla': [
    ['1301', 'Perla cobre fina', 'Fine copper pearl', 'Cobre fino con matiz rojo y amarillo', '#b6592b', '#ca6c3e', '#a6481b', ['#6c351c']],
    ['1302', 'Perla cobre', 'Copper pearl', 'Cobre con matiz rojo y amarillo, un poco más gruesa que la 1301', '#a4491f', '#ba5e34', '#92380e', ['#572611']],
    ['1303', 'Perla roja fina', 'Fine red pearl', 'Roja fina con tono vino', '#993a2e', '#a7463a', '#8d2e22', ['#57201b']],
    ['1304', 'Perla roja', 'Red pearl', 'Roja estándar, un poco más gruesa que la 1303', '#7f241d', '#8d312a', '#731811', ['#481413']],
    ['1305', 'Perla blanca fina', 'Fine white pearl', 'Para entonar; más fina que la perla blanca', '#e2dfd9', '#e6e3dd', '#dfdcd5', ['#5e5d59']],
    ['1306', 'Perla blanca', 'White pearl', 'Para entonar, no como color principal', '#edebe9', '#f1efed', '#e8e6e4', ['#4c4b4a']],
    ['1307', 'Perla blanca amarillenta', 'White pearl (yellow shade)', 'Matiz amarillo y buena resistencia a la intemperie', '#e9e8e4', '#eeece9', '#e5e4e0', ['#4e4d4b']],
    ['1308', 'Perla extra blanca', 'Extra white pearl', 'Para frentes blanco perla; buena resistencia a la intemperie', '#e9e5e3', '#edeae8', '#e3e0de', ['#4e4d49']],
    ['1309', 'Perla blanca gruesa', 'Coarse white pearl', 'Ligero matiz amarillo, muy destellante y más gruesa que la perla blanca', '#ded8d1', '#e3ddd7', '#dad3ca', ['#3a3a3a']],
    ['1310', 'Perla azul fina', 'Fine blue pearl', 'Azul más fina que la 1311', '#ede7da', '#eee9dc', '#ebe5d8', ['#14385c']],
    ['1311', 'Perla azul', 'Blue pearl', 'Frente azul y lado beige', '#ece6d3', '#ede7d5', '#e9e3d0', ['#052e4d']],
    ['1312', 'Perla verde', 'Green pearl', 'Frente morado y lado amarillo verdoso', '#e3d8d4', '#e6dbd7', '#dfd4d0', ['#404d3b']],
    ['1313', 'Perla dorada', 'Golden pearl', 'Perla amarillo dorado', '#c18201', '#c48604', '#bd7e00', ['#58420c']],
    ['1314', 'Perla dorada fina', 'Fine golden pearl', 'Más fina que la 1313', '#cc960d', '#ce980f', '#c89208', ['#5d4a15']],
    ['1315', 'Perla amarilla', 'Yellow pearl', 'Frente amarillo y lado azul violeta', '#cfced4', '#d1d0d6', '#cdccd2', ['#5e501e']],
    ['1316', 'Perla rojo naranja', 'Orange red pearl', 'Cobre con matiz dorado', '#7e2900', '#812c02', '#7a2500', ['#622e06']],
    ['1317', 'Perla morada', 'Purple pearl', 'Frente amarillo verdoso y lado morado', '#dde4c7', '#dfe5c9', '#dbe2c5', ['#371f49']],
    ['1318', 'Perla morado oscuro', 'Perse pearl', 'Frente morado; con negro, el lado se oscurece', '#d4dfd7', '#d6e1d9', '#d2ddd5', ['#4e2c30']],
    ['1319', 'Perla verde fina', 'Fine green pearl', 'Grano fino: frente rojo morado y lado amarillo verdoso', '#ded4d3', '#dfd5d4', '#dcd2d1', ['#4b583b']],
    ['1320', 'Perla morada fina', 'Fine purple pearl', 'Grano fino: frente amarillo verdoso y lado morado', '#e1e6cc', '#e3e7ce', '#e0e4cb', ['#371f52']],
    ['1321', 'Perla cristal blanca 2#', 'White crystal pearl', 'Grano medio, perla blanca destellante', '#cfcac3', '#d1cdc4', '#cdc8c2', ['#4f5052']],
  ],
  '1k-perla-especial': [
    ['1401', 'Perla roja brillante', 'Bright red pearl', 'Muy saturada: frente azulado y lado amarillo', '#b42c2c', '#bd3434', '#aa2525', ['#7a1f25']],
    ['1402', 'Perla naranja brillante', 'Bright orange pearl', 'Muy saturada: frente amarillento y lado rojizo', '#ad4a00', '#b75303', '#a64300', ['#703802']],
    ['1403', 'Perla rojo intenso', 'Strong red pearl', 'Grano medio, rojo muy saturado', '#8b231e', '#962d29', '#821915', ['#5c1b1a']],
    ['1404', 'Perla flama', 'Flame pearl', 'Verde claro a 45°, rojizo a 15° y verde suave a 110°', '#e2dfd8', '#e8e6df', '#dddad2', ['#4b5252']],
    ['1406', 'Perla roja de alto brillo', 'Highlights red pearl', 'Grano medio, rojo muy intenso', '#841720', '#93222c', '#7b0d17', ['#4a1318']],
    ['1407', 'Perla multicolor rojo verde', 'Blue green purple red pearl', 'Frente rojo, lado verde y morado', '#775c4f', '#887064', '#6b4f42', ['#162926']],
    ['1408', 'Perla multicolor morado verde', 'Multicolor purple green pearl', 'Frente amarillo, lado morado y verde', '#dee2da', '#e3e7e0', '#d9ded5', ['#291a2c']],
    ['1409', 'Perla blanca brillante', 'Bright white pearl', 'Perla blanca de grano medio', '#dad7d1', '#e2dfda', '#d4d0ca', ['#383836']],
    ['1410', 'Perla blanca brillante fina', 'Fine bright white pearl', 'Perla blanca de grano fino', '#e1e0dc', '#e5e4e0', '#dddcd8', ['#4d4e4a']],
    ['1411', 'Perla rojo amarillo', 'Yellow red pearl', 'Frente y lado rojo amarillento', '#d0dbdd', '#d3dedf', '#cdd8da', ['#301f11']],
    ['1412', 'Perla blanca súper destello', 'Super flash white pearl', 'Perla blanca muy destellante', '#cecac1', '#d1cdc5', '#cbc6bd', ['#333332']],
    ['1413', 'Perla blanca efecto vidrio', 'Super bright glass white pearl', 'Perla blanca con destello tipo vidrio', '#d9d3c9', '#ddd7ce', '#d4cdc3', ['#111110']],
    ['1414', 'Perla azul efecto vidrio', 'Super bright glass blue pearl', 'Perla azul con destello tipo vidrio', '#e7e0c7', '#e8e2c9', '#e6dec7', ['#05070b']],
    ['1415', 'Perla gris fina', 'Fine gray pearl', 'Perla gris de grano fino', '#4a4950', '#4e4d55', '#45444b', ['#2e2f2f']],
    ['1416', 'Perla dorado verde morado', 'Golden green purple pearl', 'Frente ligeramente morado y lado verde', '#d1d4d2', '#d3d5d4', '#ced2d1', ['#171c0c']],
    ['1417', 'Perla camaleón', 'Yellow green purple blue chroma pearl', 'Cambia entre amarillo, verde, morado y azul', '#d9b6af', '#dab8b0', '#d7b4ae', ['#162017']],
    ['1418', 'Perla blanca extrafina', 'Extremely fine white pearl', 'Perla blanca de grano extrafino', '#f0ece9', '#f0efeb', '#edeae6', ['#7b7a75']],
  ],
  '1k-perla-cristal': [
    ['1501', 'Perla cristal blanca fina', 'Fine white crystal pearl', 'Blanca fina con destello de cristal', '#edece9', '#f3f2ee', '#e8e7e4', ['#535252']],
    ['1502S', 'Perla cristal blanca S', 'White crystal pearl S', 'Blanca con destello de cristal', '#e5e4e0', '#efefea', '#dcdbd6', ['#2d2d2b']],
    ['1503', 'Perla cristal amarilla', 'Yellow crystal pearl', 'Amarilla con destello de cristal', '#dedede', '#e5e5e5', '#d7d8d8', ['#332913']],
    ['1504', 'Perla cristal roja', 'Red crystal pearl', 'Roja con destello de cristal', '#8a291a', '#902e1f', '#852314', ['#220e0e']],
    ['1505', 'Perla cristal rojo morado', 'Purple red crystal pearl', 'Rojo morado con destello de cristal', '#d7e0db', '#dbe3df', '#d3dcd7', ['#261616']],
    ['1506', 'Perla cristal morada', 'Purple crystal pearl', 'Morada con destello de cristal', '#e0e3c4', '#e2e7c8', '#dcdfc0', ['#190f2a']],
    ['1507', 'Perla cristal azul', 'Blue crystal pearl', 'Azul con destello de cristal', '#e8dfbf', '#e9e3c3', '#e4dbb9', ['#081c39']],
    ['1507S', 'Perla cristal azul S', 'Blue crystal pearl S', 'Azul con destello de cristal', '#eae3be', '#ebe6c0', '#e7dfba', ['#041738']],
    ['1508', 'Perla cristal verde', 'Green crystal pearl', 'Verde con destello de cristal', '#e9d5d7', '#ebd8dc', '#e6d2d4', ['#122618']],
    ['1509', 'Perla cristal cobre', 'Copper crystal pearl', 'Cobre con destello de cristal', '#722305', '#772709', '#6b1d00', ['#2c140a']],
    ['1510', 'Perla cristal dorada', 'Golden crystal pearl', 'Frente rojizo y lado rojo', '#9e5f00', '#a16201', '#9a5b00', ['#352e03']],
    ['1512', 'Perla verde espacial', 'Space green pearl', 'Frente azul verdoso y lado amarillo rojizo', '#f2dfdb', '#f5e2de', '#f0dcd7', ['#062622']],
  ],
  '2k-solido': [
    ['2011', 'Blanco', 'White', 'Blanco estándar', '#fefefe', '#fefefe', '#fefefe', ['#fefefe']],
    ['2012', 'Blanco para entonar', 'White (for color mixing)', 'Blanco de alto rendimiento', '#fefefe', '#fefefe', '#fefefe', ['#fefefe']],
    ['2021', 'Negro para entonar', 'Black (for color mixing)', 'Negro con matiz rojo y amarillo, para entonar', '#1d2027', '#1d2027', '#1d2027', ['#383d40']],
    ['2022', 'Negro azulado', 'Blue black', 'Negro con matiz azul', '#1b1e25', '#1b1e25', '#1b1e25', ['#3f4346']],
    ['2023', 'Negro suave', 'Black', 'Negro de baja concentración para entonar', '#15181f', '#15181f', '#15181f', ['#696b6a']],
    ['2031', 'Morado', 'Purple', 'Morado con matiz rojo y azul', '#1d1e23', '#1d1e23', '#1d1e23', ['#4743a2']],
    ['2041', 'Azul rojizo', 'Reddish blue', 'El azul más rojizo, de frente y de lado', '#181a27', '#181a27', '#181a27', ['#508bd9']],
    ['2042', 'Azul estándar', 'Standard blue', 'Azul con ligero matiz rojo', '#070d3d', '#070d3d', '#070d3d', ['#0050a9']],
    ['2043', 'Azul verdoso', 'Greenish blue', 'Azul con matiz verde', '#080d2b', '#080d2b', '#080d2b', ['#0881c6']],
    ['2044', 'Azul índigo', 'Indigo', 'Muy transparente y vivo, con matiz rojo', '#0a007f', '#0a007f', '#0a007f', ['#73a2f2']],
    ['2051', 'Verde', 'Green', 'Verde con matiz azul', '#04121f', '#04121f', '#04121f', ['#01948a']],
    ['2052', 'Verde amarillento', 'Yellowish green', 'Verde con matiz amarillo, color vivo', '#011812', '#011812', '#011812', ['#3db393']],
    ['2061', 'Amarillo intenso', 'Brilliant yellow', 'Amarillo con matiz verde, color vivo', '#e9c904', '#e9c904', '#e9c904', ['#f6ec4f']],
    ['2062', 'Amarillo limón', 'Lemon yellow', 'Amarillo con matiz verde', '#fbd100', '#fbd100', '#fbd100', ['#ffeb2c']],
    ['2063', 'Amarillo medio', 'Medium yellow', 'Amarillo con matiz rojo; contiene plomo', '#fea115', '#fea115', '#fea115', ['#fdc357']],
    ['2064', 'Amarillo profundo', 'Deep yellow', 'Amarillo profundo con matiz rojo', '#ff8a06', '#ff8a06', '#ff8a06', ['#fec35f']],
    ['2065', 'Amarillo ocre', 'Mud yellow', 'Amarillo con matiz rojo, baja saturación', '#bf8700', '#bf8700', '#bf8700', ['#dba75e']],
    ['2071', 'Naranja rojizo', 'Orange', 'Naranja con matiz amarillo', '#cf3114', '#cf3114', '#cf3114', ['#ed7d69']],
    ['2081', 'Rojo intenso', 'Bright red', 'Rojo muy vivo, para rojos brillantes', '#ac101d', '#ac101d', '#ac101d', ['#c83649']],
    ['2082', 'Rojo', 'Red', 'Rojo con matiz amarillo', '#ad161f', '#ad161f', '#ad161f', ['#c5485a']],
    ['2083', 'Rojo brillante', 'Brilliant red', 'Rojo con matiz azul, vivo y con buen cubriente', '#9c0016', '#9c0016', '#9c0016', ['#b93856']],
    ['2084', 'Rojo vino', 'Claret', 'Rojo con ligero matiz amarillo', '#820e17', '#820e17', '#820e17', ['#a82c5e']],
    ['2085', 'Rojo rosa', 'Rose red', 'Rojo con matiz azul, color vivo', '#520f21', '#520f21', '#520f21', ['#c562a3']],
    ['2086', 'Rojo morado', 'Purple red', 'Rojo con matiz azul', '#4a121f', '#4a121f', '#4a121f', ['#9c3a6d']],
    ['2087', 'Rojo violeta profundo', 'Deep violet red', 'Rojo con matiz azul y lado oscuro', '#39101e', '#39101e', '#39101e', ['#85357c']],
    ['2088', 'Rojo óxido', 'Iron red', 'Rojo con matiz amarillo, baja saturación', '#7a2f1a', '#7a2f1a', '#7a2f1a', ['#ac5d50']],
  ],
}

export const SERIES_BY_ID = Object.fromEntries(TINT_SERIES.map((s) => [s.id, s]))

// Color de texto legible sobre el color puro (negro sobre claros, blanco sobre oscuros)
function inkFor(hex) {
  const n = parseInt(hex.slice(1), 16)
  const lin = (c) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  }
  const lum = 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255)
  return lum > 0.18 ? '#0a0a0b' : '#ffffff'
}

// Muestra chica en SVG (color puro arriba, mezcla en la esquina) para usarla como foto en Vico
function swatchImg(hex, light, dark, mix) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 30"><defs><linearGradient id="g" x2="1" y2="1"><stop offset="0" stop-color="${light}"/><stop offset=".6" stop-color="${hex}"/><stop offset="1" stop-color="${dark}"/></linearGradient></defs><rect width="40" height="30" fill="url(#g)"/><path d="M40 8V30H12z" fill="${mix}"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// Cada tinte también se puede cotizar con Vico, igual que un producto
export const TINTS = TINT_SERIES.flatMap((s) =>
  ROWS[s.id].map(([code, color, colorEn, summary, hex, light, dark, mix]) => ({
    id: `tinte-${code.toLowerCase()}`,
    cat: 'tinte',
    tag: `Tinte ${s.system}`,
    series: s.id,
    system: s.system,
    code,
    color,
    colorEn,
    name: `Tinte ${code} · ${color}`,
    en: `${s.en} ${code} · ${colorEn}`,
    summary,
    hex,
    light,
    dark,
    mix,
    ink: inkFor(hex),
    img: swatchImg(hex, light, dark, mix[0]),
  })),
)

const count = (system) => TINTS.filter((t) => t.system === system).length
const seriesCount = (system) => TINT_SERIES.filter((s) => s.system === system).length

// Cartas completas: imagen para verla en pantalla y PDF original para descargar
export const TINT_CHARTS = [
  {
    id: '1k', name: 'Carta de tintes 1K', detail: `${seriesCount('1K')} series · ${count('1K')} tintes`,
    image: '/cartas-color/tinte-1k.webp', thumb: '/cartas-color/tinte-1k-mini.webp',
    pdf: '/cartas-color/tinte-1k.pdf', size: '36 MB',
  },
  {
    id: '2k', name: 'Carta de tintes 2K', detail: `${seriesCount('2K')} serie · ${count('2K')} tintes`,
    image: '/cartas-color/tinte-2k.webp', thumb: '/cartas-color/tinte-2k-mini.webp',
    pdf: '/cartas-color/tinte-2k.pdf', size: '7.3 MB',
  },
]
