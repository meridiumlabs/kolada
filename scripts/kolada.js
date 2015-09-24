var koladaAPI = {};
// Load Google Charts
google.load("visualization", "1", { packages: ["corechart"] });
// Configuration
koladaAPI.simular_municipalities = ['1489', '0381', '1382', '1494', '2181', '0486', '1287', '1487'];
koladaAPI.sknv_municipalities = ['1260', '1278', '1283', '1284', '1276', '1282', '1275', '1214', '1277', '1257'];
koladaAPI.municipalities = {};
koladaAPI.municipalities['1292'] = '�ngelholm';
metrics = [
{ "id": "N09805", "title": "Aktiviteter kommunala bibliotek f�r barn och unga, antal/1000 inv 0-20 �r", "description": "Antal aktiviteter f�r barn och unga dividerat med antal inv�nare 0-20 �r 31/12, dividerat med 1000. K�lla: Kungliga biblioteket och SCB." },{ "id": "N17500", "title": "Betygspo�ng efter avslutad gymnasieutbildning, genomsnitt", "description": "Elevernas sammanlagda betygspo�ng. (Kursens po�ng multiplicerat med vikt f�r betyg (IG=0, G=10, VG=15, MVG=20). Endast betygsatta kurser �r medr�knade.), dividerat med po�ngsumman f�r respektive nationellt program. Avser elever folkbokf�rda i kommunen. Uppgiften avser l�s�r. Endast betygsatta kurser �r medr�knade. Fr.o.m. �r 2010 ber�knas den genomsnittliga betygspo�ngen endast p� kurser som ing�r i det fullst�ndiga programmet. Om eleven har l�st fler kurser, inom ramen f�r ut�kat program, p�verkar detta inte betygspo�ngen. K�lla: SCB och Skolverket." },{ "id": "N00914", "title": "F�rv�rvsarbetande inv�nare 20-64 �r, andel (%)", "description": "Antal f�rv�rvsarbetande i �ldern 20-64 �r dividerat med antal inv�nare i �ldern 20-64 �r den 31/12. Med f�rv�rvsarbetande avses personer med l�neinkomst av anst�llning under november m�nad, och personer med inkomst av aktiv n�ringsverksamhet. K�lla: SCB:s registerbaserade arbetsmarknadsstatistik (RAMS)." },{ "id": "N17404", "title": "Gymnasieelever som fullf�ljer sin utbildning inom 4 �r, inkl. IV, andel (%)", "description": "Andel (%) av kommunens folkbokf�rda elever �r 1 i gymnasieskolan som inte fanns i gymnasieskolan n�got av de tv� n�rmast f�reg�ende �ren och som erh�llit slutbetyg eller motsvarande inom loppet av fyra l�s�r. IV-programmet �r inkluderat. Uppgifterna avser elever i gymnasieskolan folkbokf�rda i kommunen oavsett huvudman f�r skola eller elevens studieort. K�lla: Skolverket" },{ "id": "N01801", "title": "Inflyttade, antal", "description": "Antal inflyttade under �ret. Avser inrikes inflyttade + immigrerade. K�lla: SCB." },{ "id": "N33900", "title": "Inv�nare 0-20 �r, andel (%)", "description": "Antal inv�nare 0-20 �r den 31/12 dividerat med antal inv�nare totalt den 31/12. K�lla: SCB." },{ "id": "N35900", "title": "Inv�nare 21-64 �r, andel (%)", "description": "Antal inv�nare 21-64 �r den 31/12 dividerat med antal inv�nare totalt den 31/12. K�lla: SCB." },{ "id": "N01982", "title": "Inv�nare 25-64 �r med eftergymnasial utbildning, andel (%)", "description": "Inv�nare med eftergymnasial utbildning 25-64 �r, andel (%). Eftergymnasial avser: eftergymnasial utbildning kortare �n 3 �r, l�ngre �n 3 �r samt forskarutbildning. K�lla: SCB." },{ "id": "N01812", "title": "Inv�nare 65-79 �r, andel (%)", "description": "Antal inv�nare 65-79 �r dividerat med antal inv�nare totalt 31/12. K�lla: SCB." },{ "id": "N01813", "title": "Inv�nare 80+, andel (%)", "description": "Antal inv�nare 80+ 31/12 dividerat med antal inv�nare totalt 31/12. K�lla: SCB." },{ "id": "N01951", "title": "Inv�nare totalt, antal", "description": "Antal inv�nare totalt den 31/12. K�lla: SCB." },{ "id": "N28014", "title": "Kostnad boende enligt LSS kr/brukare", "description": "Bruttokostnad minus interna int�kter och f�rs�ljning till andra kommuner och landsting och externa int�kter f�r bostads- och lokalhyror, dividerad med antal barn och ungdomar i familjehem eller i bostad med s�rskild service f�r barn och ungdom enligt 9 � 8 LSS samt antal personer i bostad med s�rskild service f�r vuxna eller annan s�rskilt anpassad bostad f�r vuxna enligt 9 � 9 LSS. K�lla: SCB och Socialstyrelsen." },{ "id": "N28015", "title": "Kostnad daglig verksamhet enl. LSS, kr/brukare", "description": "Bruttokostnad minus interna int�kter och f�rs�ljning till andra kommuner och landsting och externa int�kter f�r bostads- och lokalhyror, dividerad med antal personer med beslut om daglig verksamhet enligt 9 � 10 LSS. K�lla: SCB och Socialstyrelsen." },{ "id": "N31001", "title": "Kostnad ekonomiskt bist�nd, kr/inv", "description": "Bruttokostnad minus interna int�kter och f�rs�ljning till andra kommuner och landsting f�r ekonomiskt bist�nd (inkl. utredningskostnader), dividerad med antal inv�nare totalt den 31/12. F�rs�rjningsst�d till flyktinghush�ll ing�r inte. K�lla: SCB." },{ "id": "N10007", "title": "Kostnad f�rskola och skolbarnsomsorg, kr/inskrivet barn", "description": "Bruttokostnad minus interna int�kter och f�rs�ljning till andra kommuner och landsting f�r f�rskola och skolbarnsomsorg, 1-12 �r dividerat med genomsnittligt antal inskrivna barn �r t-1 och �r t som var inskrivna i f�rskola, fritidshem och pedagogisk omsorg. Avser samtlig regi. K�lla: SCB." },{ "id": "N35025", "title": "Kostnad institutionsv�rd vuxna missbrukare, kr/v�rddygn", "description": "Bruttokostnad minus interna int�kter och f�rs�ljning till andra kommuner och landsting, avseende vuxna personer med missbruksproblem placerade i institutionsv�rd (SoL + LVM), dividerad med antal v�rddygn.\n. K�lla: SCB." },{ "id": "N28006", "title": "Kostnad personlig assistans enl. LSS/SFB exkl. ers�ttning fr�n F�rs�kringskassan, kr/inv 0-64 �r", "description": "Bruttokostnad minus interna int�kter och f�rs�ljning till andra kommuner och landsting f�r personlig assistans enligt LSS/SFB exkl. ers�ttning fr�n F�rs�kringskassan, dividerat med antal inv�nare 0-64 �r 31/12. Avser samtlig regi. K�lla: SCB." },{ "id": "N23002", "title": "Kostnad s�rskilt boende �ldreomsorg exkl lokalkostnader, kr/brukare", "description": "Bruttokostnad minus interna int�kter och f�rs�ljning till andra kommuner och landsting f�r s�rskilt boende �ldreomsorg exkl. lokalkostnader, dividerat med antal personer 65+ som bor permanent i s�rskilda boendeformer. Avser samtlig regi. Fr.o.m. 2013 s� avses ett m�nadssnitt under �ret av individstatistiken. 2007-2012 h�mtas antalet brukare fr�n Socialstyrelsens individstatistik 1/10. T.o.m. 2006 fr�n Socialstyrelsens m�ngdstatistik. K�lla: SCB och Socialstyrelsens individstatistik." },{ "id": "N33009", "title": "Kostnad �ppna insatser barn och unga, kr/inv", "description": "Bruttokostnad minus interna int�kter och f�rs�ljning till andra kommuner och landsting f�r �ppna insatser barn och unga, dividerat med antal inv�nare totalt 31/12. Avser inviduellt behovspr�vad �ppen v�rd samt �vriga insatser f�r barn och unga. Avser samtlig regi. K�lla: SCB:s R�kenskapssammandrag." },{ "id": "N35011", "title": "Kostnad �ppna insatser vuxna missbrukare, kr/inv", "description": "Bruttokostnad minus interna int�kter och f�rs�ljning till andra kommuner och landsting f�r �ppna insatser vuxna missbrukare, dividerat med antal inv�nare totalt 31/12. Avser �ppna insatser till bist�nd som avser boende, indiv. behovspr�vad v�rd samt �vriga insatser f�r vuxna missbrukare. Avser samtlig regi. K�lla: SCB:s R�kenskapssammandrag." },{ "id": "N35007", "title": "Kostnad �ppna insatser, individuellt behovspr. kr/inv 21-64 �r", "description": "Bruttokostnad minus interna int�kter och f�rs�ljning till andra kommuner och landsting f�r �ppna insatser, individuellt behovspr, dividerat med antal inv�nare 21-64 �r 31/12. Avser samtlig regi. K�lla: SCB." },{ "id": "N33101", "title": "Kostnad/v�rddygn f�r familjehemsv�rd av barn och unga 0-20 �r, kr (genomsnitt)", "description": "Bruttokostnad minus interna int�kter och f�rs�ljning till andra kommuner och landsting f�r familjehemsv�rd av barn och unga 0-20 �r, dividerad med antal v�rddygn i familjehem f�r barn och unga 0-20 �r under �ret. K�lla: SCB och Socialstyrelsen." },{ "id": "N33100", "title": "Kostnad/v�rddygn f�r institutionsv�rd av barn och unga 0-20 �r, kr (genomsnitt)", "description": "Bruttokostnad minus interna int�kter och f�rs�ljning till andra kommuner och landsting f�r institutionsv�rd av barn och unga 0-20 �r, dividerad med antal v�rddygn p� institution f�r barn och unga 0-20 �r under �ret. K�lla: SCB och Socialstyrelsen." },{ "id": "N09801", "title": "L�n fr�n kommunala bibliotek, antal/inv", "description": "Totalt antal l�n i kommunen (inkl all media och barnlitteratur) dividerat med antal inv�nare den 31/12. K�lla: Kungliga biblioteket och SCB." },{ "id": "N15031", "title": "L�rare med pedagogisk h�gskoleexamen i kommunal grundskola, (%)", "description": "Andel (%) l�rare i �rskurs 1-9, omr�knat till heltidstj�nster, med l�rarexamen, f�rskoll�rarexamen eller fritidspedagogexamen och med utf�rdat examensbevis, i kommunala skolor i kommunen. Avser l�s�r, m�tt den 15 oktober. K�lla Skolverket (Siris)." },{ "id": "N00924", "title": "Nettoinpendling till kommun, andel (%)", "description": "Antal inpendlare minus antal utpendlare till kommunen dividerat med antal f�rv�rvsarbetare i kommunen. Multipliceras med 100 f�r redovisning i procent. K�lla: SCB." },{ "id": "N45034", "title": "Nettoinvesteringar inom energi, vatten och avfall kommun, kr/inv", "description": "Investeringsutgift-inkomst inom energi, vatten och avfall kommun, tkr dividerat med antal inv�nare totalt 31/12. K�lla: SCB." },{ "id": "N07024", "title": "Nettokostnad gator och v�gar samt parkering, kr/inv", "description": "Nettokostnad f�r gator och v�gar samt parkering, dividerat med antal inv�nare totalt 31/12. Med nettokostnad avses bruttokostnad minus bruttoint�kt. Avser drift och underh�ll av statskommunala, kommunala och enskilda gator och v�gar inklusive olika former av trafiks�kerhets�tg�rder. Kostnader och int�kter f�r kommunal parkering f�rs ocks� till denna verksamhet. Avser samtlig regi. K�lla: SCB:s R�kenskapssammandrag." },{ "id": "N07025", "title": "Nettokostnad parker, kr/inv", "description": "Nettokostnad f�r parker, dividerat med antal inv�nare totalt 31/12. Med nettokostnad avses bruttokostnad minus bruttoint�kt. Avser kommunal parkverksamhet som parker, lekplatser, offentliga toaletter, naturomr�den etc. H�r redovisas �ven kostnader f�r naturreservat om det inte har en mycket uttalad naturv�rdsprofil, d� de redovisas under milj�, h�lsa och h�llbar utveckling. Avser samtlig regi. K�lla: SCB:s R�kenskapssammandrag." },{ "id": "U07417", "title": "U. Anm�lda st�ld- och tillgreppsbrott, antal/1000 inv", "description": "Uppgifterna har h�mtats fr�n Brottsf�rebyggande r�dets officiella kriminalstatistik och belyser brottsligheten utifr�n de brott som anm�ls till och handl�ggs av polis, tull, �klagare, domstol och kriminalv�rd. Brott som inte anm�ls kommer d�rf�r inte med i kriminalstatistiken. Brott som har �gt rum tidigare, men anm�lts under redovisnings�ret finns med i statistiken, liksom brott som anm�lts i Sverige men beg�tts utomlands. I mindre omfattning finns �ven anm�lda brott som i senare utredning inte visar sig vara brott redovisad. I brottskategorin st�ld- och tillgreppsbrott ing�r st�ld, tillgrepp av fordon, st�ld ur och fr� fordon, inbrottsst�ld, st�ld och snatteri, st�ld av vapen, amunition och spr�ng�mnen, �vriga st�ldbrott (kap. 8) samtt r�n inklusive grovt r�n. Antalet anm�lda brott har sedan justerats med uppgifter fr�n SCB om befolkningen i respektive kommun. Uppgifterna g�ller f�r perioden �r T-2 till �r T. K�lla Brottsf�rebyggande r�det" },{ "id": "U28405", "title": "U. Boendeplatser enl. LSS � 9.9 d�r den boende har inflytande �ver maten (huvudm�let), andel (%)", "description": "Antal boendeplatser enligt LSS � 9.9 p� boendeenhet d�r den brukare som vill och kan har inflytande �ver den mat (huvudm�let) som lagas och serveras, dividerat med totalt antal boendeplatser enligt LSS � 9.9 i kommunen. Det kan t.ex. inneb�ra att man tillsammans med �vriga p� boendet planerar veckomatsedel. Avser alla boendeenheter oavsett regi (kommunal eller privat). K�lla: Egen unders�kning i kommunen." },{ "id": "U09800", "title": "U. Deltagartillf�llen i idrottsf�reningar, antal/inv 7-20 �r", "description": "Antal deltagartillf�llen i �ldern 7-20 �r i LOK-st�dsber�ttigade idrottsf�reningar under �ret, dividerat med antal inv�nare 7-20 �r den 31/12. Deltagartillf�llen �r summan av antalet n�rvarande deltagare i av RF godk�nda sammankomster f�r vilken f�reningen s�kt LOK-st�d (Statligt lokalt aktivitetsst�d). LOK-st�det ges till aktiviteter f�r pojkar och flickor 7-20 �r. St�d ges �ven till handikappidrottare som �r �ldre �n 20 �r, men detta �r exkluderat i denna sammanr�kning. En sammankomst �r en ledarledd gruppaktivitet inriktad mot f�reningens idrottsliga verksamhet. K�lla Riksidrottsf�rbundet" },{ "id": "U07409", "title": "U. Ekologiska livsmedel i kommunens verksamhet, andel (%)", "description": "Kostnad i kronor f�r ink�pta ekologiska livsmedel dividerat med kostnad i kronor f�r total m�ngd ink�pta livsmedel i kommunen. Avser ekologiska livsmedel enligt KRAV-m�rkning, EU:s milj�symbol f�r ekologiska livsmedel eller andra likv�rdiga symboler d�r det finns en erk�nd certifiering som garanterar produktens ekologiskt producerade inneh�ll. M�tningen avser �rets f�rsta 6 m�nader. K�lla: Egen unders�kning i kommunen." },{ "id": "U60900", "title": "U. Elever i �k. 9 beh�riga till gymnasieskolan, andel (%)", "description": "Andelen (%) elever i �rskurs 9 som �r beh�riga till gymnasieskolans nationella program v�rterminen �r T. F�r att en elev ska vara beh�rig till det nationella programmet kr�vs minst betyget Godk�nt i �mnena svenska eller svenska som andraspr�k, engelska och matematik. Andelen ber�knas av dem som f�tt eller skulle ha f�tt betyg enligt det m�l- och kunskapsrelaterade betygssystemet (elever som l�mnat �rskurs 9 utan slutbetyg ing�r s�ledes inte). K�lla Statistiska centralbyr�n" },{ "id": "U07414", "title": "U. Hush�llsavfall som �tervinns genom material�tervinning, inkl. biologisk behandling, andel (%)", "description": "Andel hush�llsavfall som �tervinns genom material�tervinning, inklusive biologisk behandling (%). K�lla: Avfall Sverige" },{ "id": "U07431", "title": "U. Informationsindex f�r kommunens webbplats - Bygga och bo", "description": "Informationsindex omfattar den information som finns p� kommunens hemsida. Syftet med informationsindex �r att kunna visa en samlad bild av kommunens informationsgivning till medborgarna och synligg�ra starka och svaga sidor. Unders�kningen g�r till s� att en extern granskare g�r igenom kommunens hemsida f�r att f� svar p� ett antal givna fr�gor. Svaret p� varje fr�ga m�ste hittas inom tidsbegr�nsningen 2 minuter. Om ett omfattande och l�tt�versk�dligt svar p� fr�gan hittas inom denna tidsram s� ges 3 po�ng och ett kortfattat och �vergripande svar ger 1 po�ng. Om svaret ej finns eller inte kan hittas inom 2 minuter ges 0 po�ng. Po�ngen f�r varje fr�ga summeras och redovisas h�r som procent (%) av maxpo�ng. K�lla: SKL (Information till alla)" },{ "id": "U07432", "title": "U. Informationsindex f�r kommunens webbplats - Gator, v�gar och milj�", "description": "Informationsindex omfattar den information som finns p� kommunens hemsida. Syftet med informationsindex �r att kunna visa en samlad bild av kommunens informationsgivning till medborgarna och synligg�ra starka och svaga sidor. Unders�kningen g�r till s� att en extern granskare g�r igenom kommunens hemsida f�r att f� svar p� ett antal givna fr�gor. Svaret p� varje fr�ga m�ste hittas inom tidsbegr�nsningen 2 minuter. Om ett omfattande och l�tt�versk�dligt svar p� fr�gan hittas inom denna tidsram s� ges 3 po�ng och ett kortfattat och �vergripande svar ger 1 po�ng. Om svaret ej finns eller inte kan hittas inom 2 minuter ges 0 po�ng. Po�ngen f�r varje fr�ga summeras och redovisas h�r som procent (%) av maxpo�ng. K�lla: SKL (Information till alla)" },{ "id": "U07801", "title": "U. Insamlat hush�llsavfall kommun, kg/inv", "description": "Antal kg hush�llsavfall per inv�nare och �r i kommunen. I hush�llsavfall ing�r k�rl- och s�ckavfall, grovavfall inklusive tr�dg�rdsavfall, farligt avfall, j�mf�rligt avfall fr�n bland annat aff�rer, kontor, industrier och restauranger, samt den del av hush�llsavfallet som omfattas av producentansvar (f�rpackningar, tidningar, elavfall, batterier etc.), �ven om det inte faller under kommunalt renh�llningsansvar. Inv�narantalet justeras med h�nsyn till fritidshus, g�stn�tter och in-/utpendling. I utpr�glade fritidshuskommuner eller kommuner med omfattande turistverksamhet genereras betydligt mer hush�llsavfall �n vad de permanentboende ger upphov till. �ven i kommuner med stort inpendlings�verskott genereras mycket hush�llsavfall via arbetsplatserna. Genom att anv�nda ett justerat inv�narantal speglas m�ngden avfall per person p� ett mer korrekt s�tt f�r den egna kommunen, vilket underl�ttar j�mf�relser med andra kommuner. K�lla: Avfall Sverige." },{ "id": "U07453", "title": "U. Inv�nare som upplevt oro f�r bostadsinbrott, andel (%)", "description": "Andel personer som svarat 'Ja' p� fr�gan 'Har det h�nt under det senaste �ret att du oroat dig f�r att du ska drabbas av inbrott i din bostad?' Data fr�n �ren T-3 och T. K�lla Nationella trygghetsunders�kning, NTU" },{ "id": "U21420", "title": "U. N�jd Kund-Index, hemtj�nst (�ldreomsorg) - helhet", "description": "Brukarnas omd�me om hj�lpen och omv�rdnaden i sin helhet fr�n hemtj�nsten enligt N�jd Kund Index. K�lla: Nationell brukarunders�kning inom v�rden och omsorgen om �ldre, Socialstyrelsen." },{ "id": "U23413", "title": "U. N�jd Kund-Index, �ldreboende - helhet", "description": "Brukarnas omd�me om hj�lpen och omv�rdnaden i sin helhet inom s�rskilt boende enligt N�jd Kund Index. K�lla: Nationell brukarunders�kning inom v�rden och omsorgen om �ldre, Socialstyrelsen." },{ "id": "U09407", "title": "U. N�jd Medborgar-Index - Bibliotek", "description": "Medborgarnas bed�mning av biblioteksverksamheten i kommunen, skala 1-100. K�lla SCB:s medborgarunders�kningar." },{ "id": "U09408", "title": "U. N�jd Region-Index - Fritidsaktiviteter", "description": "Medborgarnas bed�mning av hur m�jligheten till fritidsaktivteter �r i kommunen, skala 1-100. K�lla SCB:s medborgarunders�kningar." },{ "id": "U28409", "title": "U. Personer som deltar i daglig verksamhet enl. LSS d�r brukarna kan byta syssels�ttning inom dagliga verksamheten, andel (%)", "description": "Antal personer som deltar i daglig verksamhet enligt LSS d�r brukaren har m�jlighet att byta syssels�ttning inom ramen f�r dagliga verksamheten, dividerat med totalt antal personer som deltar i daglig verksamhet enligt LSS i kommunen. Kan g�lla s�v�l ny geografisk arbetsplats s�v�l som samma arbetsplats men med ny syssels�ttning. Avser all daglig verksamhet oavsett regi (kommunal eller privat). K�lla: Egen unders�kning i kommunen." },{ "id": "U28435", "title": "U. Personer som deltar i daglig verksamhet enl. LSS d�r enhetens verksamhet �r �ppen under sommaren, andel (%)", "description": "Baseras p� enhetsenk�tsfr�gan �r enhetens dagliga verksamhet �ppen under sommaren?. Med �ppet avses att brukare kan delta i enhetens dagliga verksamhet, antingen i ordinarie lokaler eller genom andra sommaraktiviteter som enheten organiserar. Procentandelen ber�knas som totalt antal personer som deltar i DV-enhet som svarat ja, hela sommaren, p� fr�gan dividerat med totalt antal personer som deltar i daglig verksamhet enligt LSS i kommunen, multiplicerat med 100. Avser all daglig verksamhet oavsett regi (kommunal eller privat) inom kommunens geografiska omr�de. Felk�llor kan vara placeringar �ver kommungr�nserna samt att samma brukare kan delta p� flera enheter. Svarsalternativen p� fr�gan har �ndrats n�got �r 2012. K�lla: Av RKA specialbest�llt nyckeltal baserat p� svar fr�n Socialstyrelsens enhetsenk�t." },{ "id": "U28434", "title": "U. Personer som deltar i daglig verksamhet enl. LSS d�r regelbundna m�ten genomf�rs d�r brukarna �r med och best�mmer i gemensamma fr�gor, andel (%)", "description": "Baseras p� enhetsenk�tsfr�gan Har ni regelbundna m�ten, arbetsplatstr�ffar, d�r personer som deltar i enhetens dagliga verksamhet �r med och best�mmer i gemensamma fr�gor?. Procentandelen ber�knas som totalt antal personer som deltar i DV-enhet som svarat minst en g�ng i m�naden eller mer p� fr�gan dividerat med totalt antal personer som deltar i daglig verksamhet enligt LSS i kommunen, multiplicerat med 100. Avser all daglig verksamhet oavsett regi (kommunal eller privat) inom kommunens geografiska omr�de. Felk�llor kan vara placeringar �ver kommungr�nserna samt att samma brukare kan delta p� flera enheter. K�lla: Av RKA specialbest�llt nyckeltal baserat p� svar fr�n Socialstyrelsens enhetsenk�t." },{ "id": "U11401", "title": "U. Plats p� f�rskola p� �nskat placeringsdatum, andel barn (%)", "description": "Andel (%) barn som erbjudits plats f�re eller p� �nskat placeringsdatum. Om �nskat placeringsdatum infaller p� l�rdag, s�ndag eller helgdag r�knas f�rsta kommande vardag som �nskat placeringsdatum. M�tperiod �rets 6 f�rsta m�nader. K�lla: Egen unders�kning i kommunen." },{ "id": "U28418", "title": "U. Verkst�llighetstid i antal dagar fr�n beslut till insats avseende boende enl. LSS � 9.9, medelv�rde", "description": "Genomsnittligt antal dagar som g�tt mellan beslut och p�b�rjad insats (inflyttning) i boende enligt LSS. Avser alla beslut om LSS-insats avseende boende under �rets 6 f�rsta m�nader (minimum 4 beslut), exklusive ompr�vningar. K�lla: Egen unders�kning i kommunen." },{ "id": "U23401", "title": "U. V�ntetid i antal dagar fr�n ans�kningsdatum till erbjudet inflyttningsdatum till s�rskilt boende, medelv�rde", "description": "Medelv�rde, antal dagar fr�n ans�kningsdatum till erbjudet inflyttningsdatum avseende s�rskilt boende inom �ldreomsorg. Med ans�kningsdatum avses det datum d� ans�kan om plats p� s�rskilt boende kommer in till kommunen, oavsett om ans�kan g�rs skriftligt eller muntligt. Med erbjudet inflyttningsdatum avses det datum d� den enskilde enligt kommunens erbjudande har m�jlighet att flytta in p� ett s�rskilt boende, oavsett om den enskilde sedan v�ljer att flytta in eller inte. Avser samtliga utredningar avseende plats p� s�rskilt boende som avslutades i kommunen under f�rsta halv�ret, och som avs�g personer som vid tidpunkten f�r ans�kan var 65 �r eller �ldre. K�lla Egen unders�kning i kommunen." },{ "id": "U31402", "title": "U. V�ntetid i antal dagar fr�n f�rsta kontakttillf�llet f�r ans�kan vid nybes�k till beslut inom f�rs�rjningsst�d, medelv�rde", "description": "Genomsnittligt antal dagar fr�n f�rsta kontakten f�r ans�kan vid nybes�k, med socialtj�nsten till dess att beslut om f�rs�rjningsst�d har fattats. Med f�rsta kontakt avses muntlig eller skriftlig kontakt ang�ende ans�kan om f�rs�rjningsst�d. Allm�nna f�rfr�gningar exkluderas. M�tperiod �r f�rsta halv�ret. K�lla: Egen unders�kning i kommunen." },{ "id": "N05401", "title": "Valdeltagande i senaste kommunvalet, (%)", "description": "Antal avgivna r�ster i senaste kommunalvalet (giltiga och ogiltiga) dividerat med antal r�stber�ttigade, multiplicerat med 100. K�lla: Valmyndigheten och SCB." },{ "id": "N09808", "title": "�ppeth�llande huvudbiblioteket, timmar/vecka", "description": "�ppeth�llande i antal timmar/vecka vid kommunens huvudbibliotek. Avser en genomsnittsvecka vintertid. K�lla: Kungliga biblioteket och SCB." }
 ];
$(function () {
if ("ontouchstart" in window || "ontouch" in window) { $('body').addClass('touch'); } 


    $('#kolada').show();
    var koladaViewModel = new koladaAPI.koladaViewModel();
    ko.applyBindings(koladaViewModel, $("#kolada")[0]);
    koladaViewModel.loadMunicipalities();
    koladaViewModel.loadYears();
    koladaViewModel.loadMetrics();

});

//Models
koladaAPI.kpiMetrics = function (metric) {
    var self = this;
    self.title = metric.title;
    self.description = metric.description;
    self.id = metric.id;
    self.metricValues = ko.observableArray();
    self.isInTableView = ko.observable(true);
    self.status = ko.observable();
};
koladaAPI.kpiMetricValue = function (metric) {
    var self = this;
    self.kpi = metric.kpi;
    self.municipality = metric.municipality;
    self.period = metric.period;
    self.value = metric.value;
    self.value_f = metric.value_f;
    self.value_m = metric.value_m;
}
koladaAPI.municipality = function (municipality) {
    var self = this;
    self.id = municipality.id;
    self.title = municipality.title;
    self.type = municipality.type;
}

//ViewModels
koladaAPI.koladaViewModel = function () {
    var self = this;
    self.municipalites = ko.observableArray();
    self.years = ko.observableArray();
    self.metrics = ko.observableArray();
    self.selectedMunicipalities = ko.observableArray([]);
    self.selectedYears = ko.observableArray([]);
    self.selectedMetrics = ko.observableArray([]);
    self.loadedMetrics = ko.observableArray([]);
    self.metricsList = ko.observableArray([]);
    self.selectedMetric = ko.observable();
    self.defaultMunicipalityChecked = ko.observable(false),
    self.query = ko.observable();

    //subscriptions
    this.query.subscribe(function (val) {
        self.metrics.removeAll();
        for (var x in metrics) {
            if (metrics[x].title.toLowerCase().indexOf(val.toLowerCase()) >= 0) {
                self.metrics.push(metrics[x]);
            }
        }
    }, this);

    this.selectedMetrics.subscribe(function (metric) {
        if (self.selectedMetrics().length == 0 || self.selectedMunicipalities().length == 0)
            return;
        self.loadedMetrics.removeAll()
        self.loadValues(self.url(), false);

    }, this);
    this.selectedMunicipalities.subscribe(function (municipality) {
        if (self.selectedMetrics().length == 0 || self.selectedMunicipalities().length == 0)
            return;
        self.loadedMetrics.removeAll()
        self.loadValues(self.url(), false);
    }, this);
    this.selectedYears.subscribe(function (year) {
        if (self.selectedMetrics().length == 0 || self.selectedMunicipalities().length == 0)
            return;
        self.loadedMetrics.removeAll()
        self.loadValues(self.url(), false);
    }, this);


    //computed
    self.filterResultText = ko.computed(function () {
        var municipalityToString = '';
        var yearToString = '';
        $.each(self.selectedMunicipalities(), function (index, item) {
            if (index == 0) {
                municipalityToString = item.title
            }
            else {
                municipalityToString += ", " + item.title
            }
        });
        $.each(self.selectedYears(), function (index, item) {
            if (index == 0) {
                yearToString = item
            }
            else {
                yearToString += ", " + item
            }
        });

        return (municipalityToString.toString().length > 0) ? (' f�r omr�dena ' + municipalityToString + ((yearToString.toString().length > 0) ? ' och �ren ' + yearToString : '')) : '';
    }, this);

    self.url = function () {
        var url = '';

        //no selected values, return empty
        if (self.selectedMetrics().length == 0 || self.selectedMunicipalities().length == 0)
            return url;

        var selectedMetricIds = ko.utils.arrayMap(self.selectedMetrics(), function (metric) {
            return metric.id;
        });
        var selectedMunicipalityIds = ko.utils.arrayMap(self.selectedMunicipalities(), function (municipality) {
            return municipality.id;
        });

        $.each(selectedMunicipalityIds, function (index, item) {
            if (item == 'SKNV') {
                selectedMunicipalityIds.splice('SKNV');
                selectedMunicipalityIds = selectedMunicipalityIds.concat(koladaAPI.sknv_municipalities);
            }
            if (item == 'LIKE') {
                selectedMunicipalityIds.splice('LIKE');
                selectedMunicipalityIds = selectedMunicipalityIds.concat(koladaAPI.simular_municipalities);
            }
        });

        if ($.inArray(selectedMunicipalityIds, '1292') == -1) {
            selectedMunicipalityIds.push('1292');
        }

        var years = self.selectedYears().length > 0 ? self.selectedYears().join(',') : self.years().join(',');
        url = 'http://api.kolada.se/v1/data/exact/' + selectedMetricIds.join(',') + '/' + selectedMunicipalityIds.join(',') + '/' + years;

        return url;
    };

    self.filterUrl = ko.computed(function () {
        return self.url();
    }, this);

    //Operations
    self.loadMunicipalities = function (url) {
        if (!url) {
            url = 'http://api.kolada.se/v1/municipality';
        }
        $.support.cors = true;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json'
        }).done(function (data) {
            $.each(data.values, function (index, municipality) {
                if ($.inArray(municipality.id, koladaAPI.simular_municipalities.concat(koladaAPI.sknv_municipalities)) > -1) {
                    self.municipalites.push(municipality);
                    koladaAPI.municipalities[municipality.id] = municipality.title;
                }
            });
            //more values, load next 100 items
            if (data.next) {
                self.loadMunicipalities(data.next);
            }
            if (!data.next) {
                self.municipalites.sort(function (left, right) { return left.title == right.title ? 0 : (left.title < right.title ? -1 : 1) });
                var sknv = new koladaAPI.municipality('');
                sknv.id = 'SKNV';
                sknv.title = 'Sk�ne nordv�st';
                sknv.type = 'L';
                var like = new koladaAPI.municipality('');
                like.id = 'LIKE';
                like.title = '�ngelholm och liknande kommuner';
                like.type = 'L';
                self.municipalites.unshift(like);
                self.municipalites.unshift(sknv);
            }

        }).fail(function (xhr, ajaxOptions, thrownError) {
            console.log(thrownError);
            alert('Kunde inte ladda kommuner');
        });
    };
    self.loadYears = function () {
        var currentYear = parseInt(new Date().getFullYear());
        for (var i = 1; i < 15; i++) {
            self.years.push(currentYear - i);
        };
    };
    self.loadMetrics = function () {
        var mappedmetrics = $.map(metrics, function (metric) {
            return new koladaAPI.kpiMetrics(metric);
        });
        self.metrics(mappedmetrics);

    };
    self.loadValues = function (url, loadChart) {

        $.support.cors = true;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json'
        }).done(function (data) {

            $.each(data.values, function (index, item) {
                self.loadedMetrics.push(new koladaAPI.kpiMetricValue(item));
            });
            if (data.next)
                self.loadValues(data.next, loadChart);

            if (loadChart) {
                var chartArray = koladaAPI.toChartArray(self.loadedMetrics(), self.selectedMetric);
                if (chartArray.length > 0) {
                    koladaAPI.loadChart(chartArray, self.selectedMetric);
                }
                else {
                    $('#chart_div_' + self.selectedMetric().id + '').after('<div class=\"alert-info\">Kan inte ladda diagram f�r valda alternativ</div>');
                }
            }
            else {
                self.metricsList(koladaAPI.toTableArray(self.loadedMetrics()));
            }

        }).fail(function (xhr, ajaxOptions, thrownError) {
            console.log(thrownError);
            alert('Kunde inte ladda det nyckeltal du valt');
        });
    };
    self.toggleExpanded = function (metric, event) {
        var el = event.target;
        if ($(el).hasClass('expanded')) {
            $(el).removeClass('expanded');
            $(el).next('.kolada-content').hide();
        }
        else {
            $(el).addClass('expanded');
            $(el).next('.kolada-content').show();
        }
    };
    self.toggleMatricView = function (metric, event) {
        $(event.target).parent().find('.alert-info').remove();
        var opposite = !metric.isInTableView();
        metric.isInTableView(opposite);
        self.selectedMetric(metric)
        //must load graph separately
        if (!metric.isInTableView()) {
            self.loadedMetrics.removeAll()
            self.loadValues(self.filterUrl(), !opposite);
        }
    };

    self.defaultMunicipalityCheck = function () {
        self.selectedMunicipalities.removeAll();
        if (!self.defaultMunicipalityChecked()) {
            self.selectedMunicipalities.removeAll();
            var eng = new koladaAPI.municipality('');
            eng.id = '1292';
            eng.title = '�ngelholm';
            eng.type = 'K';
            self.selectedMunicipalities.push(eng);
        }
        return true;
    }
    self.sortValues = function (metric, event) {
        var match = ko.utils.arrayFirst(self.metricsList(), function (item) {
            return metric.id === item.id;
        });
        self.metricsList.remove(metric);
        var sortKey = $(event.target).parent().attr('class');
        var sortDirection = $(event.target).attr('class');
        switch (sortKey) {
            case 'area':
                if ($(event.target).hasClass('asc')) {
                    match.metricValues.sort(function (a, b) { return a.municipality > b.municipality ? -1 : 1; });
                }
                else {
                    match.metricValues.sort(function (a, b) { return a.municipality < b.municipality ? -1 : 1; });
                }
                break;
            case 'year':
                if ($(event.target).hasClass('asc')) {
                    match.metricValues.sort(function (a, b) { return a.period > b.period ? -1 : 1; });
                }
                else {
                    match.metricValues.sort(function (a, b) { return a.period < b.period ? -1 : 1; });
                }
                break;
            case 'value':
                if ($(event.target).hasClass('asc')) {
                    match.metricValues.sort(function (a, b) { return a.value > b.value ? -1 : 1; });
                }
                else {
                    match.metricValues.sort(function (a, b) { return a.value < b.value ? -1 : 1; });
                }
                break;
            case 'value_m':
                if ($(event.target).hasClass('asc')) {
                    match.metricValues.sort(function (a, b) { return a.value_m > b.value_m ? -1 : 1; });
                }
                else {
                    match.metricValues.sort(function (a, b) { return a.value_m < b.value_m ? -1 : 1; });
                }
                break;
            case 'value_f':
                if ($(event.target).hasClass('asc')) {
                    match.metricValues.sort(function (a, b) { return a.value_f > b.value_f ? -1 : 1; });
                }
                else {
                    match.metricValues.sort(function (a, b) { return a.value_f < b.value_f ? -1 : 1; });
                }
                break;
        }
        self.metricsList.push(match);
        self.metricsList.sort(function (a, b) { return a.id < b.id ? -1 : 1; });
        sortDirection == 'asc' ? $('.kolada-content .' + sortKey + ' a').addClass('desc').removeClass('asc') : $('.kolada-content .' + sortKey + ' a').addClass('asc').removeClass('desc');

    };

};

//Functions
koladaAPI.toTableArray = function (arr) {
    var kpis = [];
    var metricsList = [];
    for (var i in arr) {

        if ($.inArray(arr[i].kpi, kpis) == -1) {
            kpis.push(arr[i].kpi);
        }
    }
    for (var i in kpis) {
        var items = ko.utils.arrayFilter(arr, function (metric) {
            return metric.kpi == kpis[i];
        });

        var metric = ko.utils.arrayFirst(metrics, function (item) {
            return item.id === kpis[i];
        });

        var metricItem = new koladaAPI.kpiMetrics('');
        metricItem.id = kpis[i];
        metricItem.title = metric.title
        metricItem.description = metric.description;
        metricItem.metricValues = items;
        metricsList.push(metricItem);
    }
    return metricsList;
};

koladaAPI.toChartArray = function (arr, selectedMetric) {
    var chartYearData = [];
    var chartValueData = {};

    chartValueData['headers'] = ['year']
    for (var i in arr) {
        if ($.inArray(koladaAPI.municipalities[arr[i].municipality], chartValueData['headers']) == -1) {
            chartValueData['headers'].push(koladaAPI.municipalities[arr[i].municipality]);
        };
        if (arr[i].kpi == selectedMetric().id) {
            if ($.inArray(arr[i].period, chartYearData) == -1) {
                chartYearData.push(arr[i].period);
                chartValueData[arr[i].period] = [];
                chartValueData[arr[i].period].push(arr[i].period)
                chartValueData[arr[i].period].push(arr[i].value == null ? 0 : (arr[i].value));
            }
            else {
                chartValueData[arr[i].period].push(arr[i].value == null ? 0 : (arr[i].value));
            }
        }
    };
    //array to google charts format
    var chartValues = [];
    var isValidChartData = true;
    chartValues.push(chartValueData['headers'])
    for (var i = 0; i < chartYearData.length; i++) {
        chartValues.push(chartValueData[chartYearData[i]])
    }
    for (var i in chartValues) {
        //check if all arrays has same number of posts
        if (i > 0) {
            if (chartValues[i].length !== chartValues[0].length) {
                isValidChartData = false;
            }
        }
    }
    return isValidChartData ? chartValues : [];
};

//Functions
koladaAPI.toggleExpanded = function (el) {
    if ($(el).hasClass('expanded')) {
        $(el).removeClass('expanded');
        $(el).next('.kolada-content').hide();
    }
    else {
        $(el).addClass('expanded');
        $(el).next('.kolada-content').show();
    }
};

koladaAPI.loadChart = function (chartArray, selectedMetric) {

    var chartData = google.visualization.arrayToDataTable(chartArray);
    var options = {
        pointSize: 7,
        height: 400,
        chartArea: { top: 60, left: "10%" }
    };

    var formatter = new google.visualization.NumberFormat({ decimalSymbol: '.', groupingSymbol: '.', fractionDigits: 2 });
    formatter.format(chartData, 1);

    var chart = new google.visualization.LineChart(document.getElementById('chart_div_' + selectedMetric().id));
    //if only one post, show table view
    if (chartArray.length < 3)
        chart = new google.visualization.ColumnChart(document.getElementById('chart_div_' + selectedMetric().id));
    chart.draw(chartData, options);
};


koladaAPI.formatValue = function (value) {
        if(value == null)
            return null;
        var x = value.toFixed(2);
        if (Math.floor(x) == x) {
            x = Math.floor(x);
        }
        return x;
}
