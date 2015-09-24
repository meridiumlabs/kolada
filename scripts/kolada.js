var koladaAPI = {};
// Load Google Charts
google.load("visualization", "1", { packages: ["corechart"] });
// Configuration
koladaAPI.simular_municipalities = ['1489', '0381', '1382', '1494', '2181', '0486', '1287', '1487'];
koladaAPI.sknv_municipalities = ['1260', '1278', '1283', '1284', '1276', '1282', '1275', '1214', '1277', '1257'];
koladaAPI.municipalities = {};
koladaAPI.municipalities['1292'] = 'Ängelholm';
metrics = [
{ "id": "N09805", "title": "Aktiviteter kommunala bibliotek för barn och unga, antal/1000 inv 0-20 år", "description": "Antal aktiviteter för barn och unga dividerat med antal invånare 0-20 år 31/12, dividerat med 1000. Källa: Kungliga biblioteket och SCB." },{ "id": "N17500", "title": "Betygspoäng efter avslutad gymnasieutbildning, genomsnitt", "description": "Elevernas sammanlagda betygspoäng. (Kursens poäng multiplicerat med vikt för betyg (IG=0, G=10, VG=15, MVG=20). Endast betygsatta kurser är medräknade.), dividerat med poängsumman för respektive nationellt program. Avser elever folkbokförda i kommunen. Uppgiften avser läsår. Endast betygsatta kurser är medräknade. Fr.o.m. år 2010 beräknas den genomsnittliga betygspoängen endast på kurser som ingår i det fullständiga programmet. Om eleven har läst fler kurser, inom ramen för utökat program, påverkar detta inte betygspoängen. Källa: SCB och Skolverket." },{ "id": "N00914", "title": "Förvärvsarbetande invånare 20-64 år, andel (%)", "description": "Antal förvärvsarbetande i åldern 20-64 år dividerat med antal invånare i åldern 20-64 år den 31/12. Med förvärvsarbetande avses personer med löneinkomst av anställning under november månad, och personer med inkomst av aktiv näringsverksamhet. Källa: SCB:s registerbaserade arbetsmarknadsstatistik (RAMS)." },{ "id": "N17404", "title": "Gymnasieelever som fullföljer sin utbildning inom 4 år, inkl. IV, andel (%)", "description": "Andel (%) av kommunens folkbokförda elever år 1 i gymnasieskolan som inte fanns i gymnasieskolan något av de två närmast föregående åren och som erhållit slutbetyg eller motsvarande inom loppet av fyra läsår. IV-programmet är inkluderat. Uppgifterna avser elever i gymnasieskolan folkbokförda i kommunen oavsett huvudman för skola eller elevens studieort. Källa: Skolverket" },{ "id": "N01801", "title": "Inflyttade, antal", "description": "Antal inflyttade under året. Avser inrikes inflyttade + immigrerade. Källa: SCB." },{ "id": "N33900", "title": "Invånare 0-20 år, andel (%)", "description": "Antal invånare 0-20 år den 31/12 dividerat med antal invånare totalt den 31/12. Källa: SCB." },{ "id": "N35900", "title": "Invånare 21-64 år, andel (%)", "description": "Antal invånare 21-64 år den 31/12 dividerat med antal invånare totalt den 31/12. Källa: SCB." },{ "id": "N01982", "title": "Invånare 25-64 år med eftergymnasial utbildning, andel (%)", "description": "Invånare med eftergymnasial utbildning 25-64 år, andel (%). Eftergymnasial avser: eftergymnasial utbildning kortare än 3 år, längre än 3 år samt forskarutbildning. Källa: SCB." },{ "id": "N01812", "title": "Invånare 65-79 år, andel (%)", "description": "Antal invånare 65-79 år dividerat med antal invånare totalt 31/12. Källa: SCB." },{ "id": "N01813", "title": "Invånare 80+, andel (%)", "description": "Antal invånare 80+ 31/12 dividerat med antal invånare totalt 31/12. Källa: SCB." },{ "id": "N01951", "title": "Invånare totalt, antal", "description": "Antal invånare totalt den 31/12. Källa: SCB." },{ "id": "N28014", "title": "Kostnad boende enligt LSS kr/brukare", "description": "Bruttokostnad minus interna intäkter och försäljning till andra kommuner och landsting och externa intäkter för bostads- och lokalhyror, dividerad med antal barn och ungdomar i familjehem eller i bostad med särskild service för barn och ungdom enligt 9 § 8 LSS samt antal personer i bostad med särskild service för vuxna eller annan särskilt anpassad bostad för vuxna enligt 9 § 9 LSS. Källa: SCB och Socialstyrelsen." },{ "id": "N28015", "title": "Kostnad daglig verksamhet enl. LSS, kr/brukare", "description": "Bruttokostnad minus interna intäkter och försäljning till andra kommuner och landsting och externa intäkter för bostads- och lokalhyror, dividerad med antal personer med beslut om daglig verksamhet enligt 9 § 10 LSS. Källa: SCB och Socialstyrelsen." },{ "id": "N31001", "title": "Kostnad ekonomiskt bistånd, kr/inv", "description": "Bruttokostnad minus interna intäkter och försäljning till andra kommuner och landsting för ekonomiskt bistånd (inkl. utredningskostnader), dividerad med antal invånare totalt den 31/12. Försörjningsstöd till flyktinghushåll ingår inte. Källa: SCB." },{ "id": "N10007", "title": "Kostnad förskola och skolbarnsomsorg, kr/inskrivet barn", "description": "Bruttokostnad minus interna intäkter och försäljning till andra kommuner och landsting för förskola och skolbarnsomsorg, 1-12 år dividerat med genomsnittligt antal inskrivna barn år t-1 och år t som var inskrivna i förskola, fritidshem och pedagogisk omsorg. Avser samtlig regi. Källa: SCB." },{ "id": "N35025", "title": "Kostnad institutionsvård vuxna missbrukare, kr/vårddygn", "description": "Bruttokostnad minus interna intäkter och försäljning till andra kommuner och landsting, avseende vuxna personer med missbruksproblem placerade i institutionsvård (SoL + LVM), dividerad med antal vårddygn.\n. Källa: SCB." },{ "id": "N28006", "title": "Kostnad personlig assistans enl. LSS/SFB exkl. ersättning från Försäkringskassan, kr/inv 0-64 år", "description": "Bruttokostnad minus interna intäkter och försäljning till andra kommuner och landsting för personlig assistans enligt LSS/SFB exkl. ersättning från Försäkringskassan, dividerat med antal invånare 0-64 år 31/12. Avser samtlig regi. Källa: SCB." },{ "id": "N23002", "title": "Kostnad särskilt boende äldreomsorg exkl lokalkostnader, kr/brukare", "description": "Bruttokostnad minus interna intäkter och försäljning till andra kommuner och landsting för särskilt boende äldreomsorg exkl. lokalkostnader, dividerat med antal personer 65+ som bor permanent i särskilda boendeformer. Avser samtlig regi. Fr.o.m. 2013 så avses ett månadssnitt under året av individstatistiken. 2007-2012 hämtas antalet brukare från Socialstyrelsens individstatistik 1/10. T.o.m. 2006 från Socialstyrelsens mängdstatistik. Källa: SCB och Socialstyrelsens individstatistik." },{ "id": "N33009", "title": "Kostnad öppna insatser barn och unga, kr/inv", "description": "Bruttokostnad minus interna intäkter och försäljning till andra kommuner och landsting för öppna insatser barn och unga, dividerat med antal invånare totalt 31/12. Avser inviduellt behovsprövad öppen vård samt övriga insatser för barn och unga. Avser samtlig regi. Källa: SCB:s Räkenskapssammandrag." },{ "id": "N35011", "title": "Kostnad öppna insatser vuxna missbrukare, kr/inv", "description": "Bruttokostnad minus interna intäkter och försäljning till andra kommuner och landsting för öppna insatser vuxna missbrukare, dividerat med antal invånare totalt 31/12. Avser öppna insatser till bistånd som avser boende, indiv. behovsprövad vård samt övriga insatser för vuxna missbrukare. Avser samtlig regi. Källa: SCB:s Räkenskapssammandrag." },{ "id": "N35007", "title": "Kostnad öppna insatser, individuellt behovspr. kr/inv 21-64 år", "description": "Bruttokostnad minus interna intäkter och försäljning till andra kommuner och landsting för öppna insatser, individuellt behovspr, dividerat med antal invånare 21-64 år 31/12. Avser samtlig regi. Källa: SCB." },{ "id": "N33101", "title": "Kostnad/vårddygn för familjehemsvård av barn och unga 0-20 år, kr (genomsnitt)", "description": "Bruttokostnad minus interna intäkter och försäljning till andra kommuner och landsting för familjehemsvård av barn och unga 0-20 år, dividerad med antal vårddygn i familjehem för barn och unga 0-20 år under året. Källa: SCB och Socialstyrelsen." },{ "id": "N33100", "title": "Kostnad/vårddygn för institutionsvård av barn och unga 0-20 år, kr (genomsnitt)", "description": "Bruttokostnad minus interna intäkter och försäljning till andra kommuner och landsting för institutionsvård av barn och unga 0-20 år, dividerad med antal vårddygn på institution för barn och unga 0-20 år under året. Källa: SCB och Socialstyrelsen." },{ "id": "N09801", "title": "Lån från kommunala bibliotek, antal/inv", "description": "Totalt antal lån i kommunen (inkl all media och barnlitteratur) dividerat med antal invånare den 31/12. Källa: Kungliga biblioteket och SCB." },{ "id": "N15031", "title": "Lärare med pedagogisk högskoleexamen i kommunal grundskola, (%)", "description": "Andel (%) lärare i årskurs 1-9, omräknat till heltidstjänster, med lärarexamen, förskollärarexamen eller fritidspedagogexamen och med utfärdat examensbevis, i kommunala skolor i kommunen. Avser läsår, mätt den 15 oktober. Källa Skolverket (Siris)." },{ "id": "N00924", "title": "Nettoinpendling till kommun, andel (%)", "description": "Antal inpendlare minus antal utpendlare till kommunen dividerat med antal förvärvsarbetare i kommunen. Multipliceras med 100 för redovisning i procent. Källa: SCB." },{ "id": "N45034", "title": "Nettoinvesteringar inom energi, vatten och avfall kommun, kr/inv", "description": "Investeringsutgift-inkomst inom energi, vatten och avfall kommun, tkr dividerat med antal invånare totalt 31/12. Källa: SCB." },{ "id": "N07024", "title": "Nettokostnad gator och vägar samt parkering, kr/inv", "description": "Nettokostnad för gator och vägar samt parkering, dividerat med antal invånare totalt 31/12. Med nettokostnad avses bruttokostnad minus bruttointäkt. Avser drift och underhåll av statskommunala, kommunala och enskilda gator och vägar inklusive olika former av trafiksäkerhetsåtgärder. Kostnader och intäkter för kommunal parkering förs också till denna verksamhet. Avser samtlig regi. Källa: SCB:s Räkenskapssammandrag." },{ "id": "N07025", "title": "Nettokostnad parker, kr/inv", "description": "Nettokostnad för parker, dividerat med antal invånare totalt 31/12. Med nettokostnad avses bruttokostnad minus bruttointäkt. Avser kommunal parkverksamhet som parker, lekplatser, offentliga toaletter, naturområden etc. Här redovisas även kostnader för naturreservat om det inte har en mycket uttalad naturvårdsprofil, då de redovisas under miljö, hälsa och hållbar utveckling. Avser samtlig regi. Källa: SCB:s Räkenskapssammandrag." },{ "id": "U07417", "title": "U. Anmälda stöld- och tillgreppsbrott, antal/1000 inv", "description": "Uppgifterna har hämtats från Brottsförebyggande rådets officiella kriminalstatistik och belyser brottsligheten utifrån de brott som anmäls till och handläggs av polis, tull, åklagare, domstol och kriminalvård. Brott som inte anmäls kommer därför inte med i kriminalstatistiken. Brott som har ägt rum tidigare, men anmälts under redovisningsåret finns med i statistiken, liksom brott som anmälts i Sverige men begåtts utomlands. I mindre omfattning finns även anmälda brott som i senare utredning inte visar sig vara brott redovisad. I brottskategorin stöld- och tillgreppsbrott ingår stöld, tillgrepp av fordon, stöld ur och frå fordon, inbrottsstöld, stöld och snatteri, stöld av vapen, amunition och sprängämnen, övriga stöldbrott (kap. 8) samtt rån inklusive grovt rån. Antalet anmälda brott har sedan justerats med uppgifter från SCB om befolkningen i respektive kommun. Uppgifterna gäller för perioden år T-2 till år T. Källa Brottsförebyggande rådet" },{ "id": "U28405", "title": "U. Boendeplatser enl. LSS § 9.9 där den boende har inflytande över maten (huvudmålet), andel (%)", "description": "Antal boendeplatser enligt LSS § 9.9 på boendeenhet där den brukare som vill och kan har inflytande över den mat (huvudmålet) som lagas och serveras, dividerat med totalt antal boendeplatser enligt LSS § 9.9 i kommunen. Det kan t.ex. innebära att man tillsammans med övriga på boendet planerar veckomatsedel. Avser alla boendeenheter oavsett regi (kommunal eller privat). Källa: Egen undersökning i kommunen." },{ "id": "U09800", "title": "U. Deltagartillfällen i idrottsföreningar, antal/inv 7-20 år", "description": "Antal deltagartillfällen i åldern 7-20 år i LOK-stödsberättigade idrottsföreningar under året, dividerat med antal invånare 7-20 år den 31/12. Deltagartillfällen är summan av antalet närvarande deltagare i av RF godkända sammankomster för vilken föreningen sökt LOK-stöd (Statligt lokalt aktivitetsstöd). LOK-stödet ges till aktiviteter för pojkar och flickor 7-20 år. Stöd ges även till handikappidrottare som är äldre än 20 år, men detta är exkluderat i denna sammanräkning. En sammankomst är en ledarledd gruppaktivitet inriktad mot föreningens idrottsliga verksamhet. Källa Riksidrottsförbundet" },{ "id": "U07409", "title": "U. Ekologiska livsmedel i kommunens verksamhet, andel (%)", "description": "Kostnad i kronor för inköpta ekologiska livsmedel dividerat med kostnad i kronor för total mängd inköpta livsmedel i kommunen. Avser ekologiska livsmedel enligt KRAV-märkning, EU:s miljösymbol för ekologiska livsmedel eller andra likvärdiga symboler där det finns en erkänd certifiering som garanterar produktens ekologiskt producerade innehåll. Mätningen avser årets första 6 månader. Källa: Egen undersökning i kommunen." },{ "id": "U60900", "title": "U. Elever i åk. 9 behöriga till gymnasieskolan, andel (%)", "description": "Andelen (%) elever i årskurs 9 som är behöriga till gymnasieskolans nationella program vårterminen år T. För att en elev ska vara behörig till det nationella programmet krävs minst betyget Godkänt i ämnena svenska eller svenska som andraspråk, engelska och matematik. Andelen beräknas av dem som fått eller skulle ha fått betyg enligt det mål- och kunskapsrelaterade betygssystemet (elever som lämnat årskurs 9 utan slutbetyg ingår således inte). Källa Statistiska centralbyrån" },{ "id": "U07414", "title": "U. Hushållsavfall som återvinns genom materialåtervinning, inkl. biologisk behandling, andel (%)", "description": "Andel hushållsavfall som återvinns genom materialåtervinning, inklusive biologisk behandling (%). Källa: Avfall Sverige" },{ "id": "U07431", "title": "U. Informationsindex för kommunens webbplats - Bygga och bo", "description": "Informationsindex omfattar den information som finns på kommunens hemsida. Syftet med informationsindex är att kunna visa en samlad bild av kommunens informationsgivning till medborgarna och synliggöra starka och svaga sidor. Undersökningen går till så att en extern granskare går igenom kommunens hemsida för att få svar på ett antal givna frågor. Svaret på varje fråga måste hittas inom tidsbegränsningen 2 minuter. Om ett omfattande och lättöverskådligt svar på frågan hittas inom denna tidsram så ges 3 poäng och ett kortfattat och övergripande svar ger 1 poäng. Om svaret ej finns eller inte kan hittas inom 2 minuter ges 0 poäng. Poängen för varje fråga summeras och redovisas här som procent (%) av maxpoäng. Källa: SKL (Information till alla)" },{ "id": "U07432", "title": "U. Informationsindex för kommunens webbplats - Gator, vägar och miljö", "description": "Informationsindex omfattar den information som finns på kommunens hemsida. Syftet med informationsindex är att kunna visa en samlad bild av kommunens informationsgivning till medborgarna och synliggöra starka och svaga sidor. Undersökningen går till så att en extern granskare går igenom kommunens hemsida för att få svar på ett antal givna frågor. Svaret på varje fråga måste hittas inom tidsbegränsningen 2 minuter. Om ett omfattande och lättöverskådligt svar på frågan hittas inom denna tidsram så ges 3 poäng och ett kortfattat och övergripande svar ger 1 poäng. Om svaret ej finns eller inte kan hittas inom 2 minuter ges 0 poäng. Poängen för varje fråga summeras och redovisas här som procent (%) av maxpoäng. Källa: SKL (Information till alla)" },{ "id": "U07801", "title": "U. Insamlat hushållsavfall kommun, kg/inv", "description": "Antal kg hushållsavfall per invånare och år i kommunen. I hushållsavfall ingår kärl- och säckavfall, grovavfall inklusive trädgårdsavfall, farligt avfall, jämförligt avfall från bland annat affärer, kontor, industrier och restauranger, samt den del av hushållsavfallet som omfattas av producentansvar (förpackningar, tidningar, elavfall, batterier etc.), även om det inte faller under kommunalt renhållningsansvar. Invånarantalet justeras med hänsyn till fritidshus, gästnätter och in-/utpendling. I utpräglade fritidshuskommuner eller kommuner med omfattande turistverksamhet genereras betydligt mer hushållsavfall än vad de permanentboende ger upphov till. Även i kommuner med stort inpendlingsöverskott genereras mycket hushållsavfall via arbetsplatserna. Genom att använda ett justerat invånarantal speglas mängden avfall per person på ett mer korrekt sätt för den egna kommunen, vilket underlättar jämförelser med andra kommuner. Källa: Avfall Sverige." },{ "id": "U07453", "title": "U. Invånare som upplevt oro för bostadsinbrott, andel (%)", "description": "Andel personer som svarat 'Ja' på frågan 'Har det hänt under det senaste året att du oroat dig för att du ska drabbas av inbrott i din bostad?' Data från åren T-3 och T. Källa Nationella trygghetsundersökning, NTU" },{ "id": "U21420", "title": "U. Nöjd Kund-Index, hemtjänst (äldreomsorg) - helhet", "description": "Brukarnas omdöme om hjälpen och omvårdnaden i sin helhet från hemtjänsten enligt Nöjd Kund Index. Källa: Nationell brukarundersökning inom vården och omsorgen om äldre, Socialstyrelsen." },{ "id": "U23413", "title": "U. Nöjd Kund-Index, äldreboende - helhet", "description": "Brukarnas omdöme om hjälpen och omvårdnaden i sin helhet inom särskilt boende enligt Nöjd Kund Index. Källa: Nationell brukarundersökning inom vården och omsorgen om äldre, Socialstyrelsen." },{ "id": "U09407", "title": "U. Nöjd Medborgar-Index - Bibliotek", "description": "Medborgarnas bedömning av biblioteksverksamheten i kommunen, skala 1-100. Källa SCB:s medborgarundersökningar." },{ "id": "U09408", "title": "U. Nöjd Region-Index - Fritidsaktiviteter", "description": "Medborgarnas bedömning av hur möjligheten till fritidsaktivteter är i kommunen, skala 1-100. Källa SCB:s medborgarundersökningar." },{ "id": "U28409", "title": "U. Personer som deltar i daglig verksamhet enl. LSS där brukarna kan byta sysselsättning inom dagliga verksamheten, andel (%)", "description": "Antal personer som deltar i daglig verksamhet enligt LSS där brukaren har möjlighet att byta sysselsättning inom ramen för dagliga verksamheten, dividerat med totalt antal personer som deltar i daglig verksamhet enligt LSS i kommunen. Kan gälla såväl ny geografisk arbetsplats såväl som samma arbetsplats men med ny sysselsättning. Avser all daglig verksamhet oavsett regi (kommunal eller privat). Källa: Egen undersökning i kommunen." },{ "id": "U28435", "title": "U. Personer som deltar i daglig verksamhet enl. LSS där enhetens verksamhet är öppen under sommaren, andel (%)", "description": "Baseras på enhetsenkätsfrågan Är enhetens dagliga verksamhet öppen under sommaren?. Med öppet avses att brukare kan delta i enhetens dagliga verksamhet, antingen i ordinarie lokaler eller genom andra sommaraktiviteter som enheten organiserar. Procentandelen beräknas som totalt antal personer som deltar i DV-enhet som svarat ja, hela sommaren, på frågan dividerat med totalt antal personer som deltar i daglig verksamhet enligt LSS i kommunen, multiplicerat med 100. Avser all daglig verksamhet oavsett regi (kommunal eller privat) inom kommunens geografiska område. Felkällor kan vara placeringar över kommungränserna samt att samma brukare kan delta på flera enheter. Svarsalternativen på frågan har ändrats något år 2012. Källa: Av RKA specialbeställt nyckeltal baserat på svar från Socialstyrelsens enhetsenkät." },{ "id": "U28434", "title": "U. Personer som deltar i daglig verksamhet enl. LSS där regelbundna möten genomförs där brukarna är med och bestämmer i gemensamma frågor, andel (%)", "description": "Baseras på enhetsenkätsfrågan Har ni regelbundna möten, arbetsplatsträffar, där personer som deltar i enhetens dagliga verksamhet är med och bestämmer i gemensamma frågor?. Procentandelen beräknas som totalt antal personer som deltar i DV-enhet som svarat minst en gång i månaden eller mer på frågan dividerat med totalt antal personer som deltar i daglig verksamhet enligt LSS i kommunen, multiplicerat med 100. Avser all daglig verksamhet oavsett regi (kommunal eller privat) inom kommunens geografiska område. Felkällor kan vara placeringar över kommungränserna samt att samma brukare kan delta på flera enheter. Källa: Av RKA specialbeställt nyckeltal baserat på svar från Socialstyrelsens enhetsenkät." },{ "id": "U11401", "title": "U. Plats på förskola på önskat placeringsdatum, andel barn (%)", "description": "Andel (%) barn som erbjudits plats före eller på önskat placeringsdatum. Om önskat placeringsdatum infaller på lördag, söndag eller helgdag räknas första kommande vardag som önskat placeringsdatum. Mätperiod årets 6 första månader. Källa: Egen undersökning i kommunen." },{ "id": "U28418", "title": "U. Verkställighetstid i antal dagar från beslut till insats avseende boende enl. LSS § 9.9, medelvärde", "description": "Genomsnittligt antal dagar som gått mellan beslut och påbörjad insats (inflyttning) i boende enligt LSS. Avser alla beslut om LSS-insats avseende boende under årets 6 första månader (minimum 4 beslut), exklusive omprövningar. Källa: Egen undersökning i kommunen." },{ "id": "U23401", "title": "U. Väntetid i antal dagar från ansökningsdatum till erbjudet inflyttningsdatum till särskilt boende, medelvärde", "description": "Medelvärde, antal dagar från ansökningsdatum till erbjudet inflyttningsdatum avseende särskilt boende inom äldreomsorg. Med ansökningsdatum avses det datum då ansökan om plats på särskilt boende kommer in till kommunen, oavsett om ansökan görs skriftligt eller muntligt. Med erbjudet inflyttningsdatum avses det datum då den enskilde enligt kommunens erbjudande har möjlighet att flytta in på ett särskilt boende, oavsett om den enskilde sedan väljer att flytta in eller inte. Avser samtliga utredningar avseende plats på särskilt boende som avslutades i kommunen under första halvåret, och som avsåg personer som vid tidpunkten för ansökan var 65 år eller äldre. Källa Egen undersökning i kommunen." },{ "id": "U31402", "title": "U. Väntetid i antal dagar från första kontakttillfället för ansökan vid nybesök till beslut inom försörjningsstöd, medelvärde", "description": "Genomsnittligt antal dagar från första kontakten för ansökan vid nybesök, med socialtjänsten till dess att beslut om försörjningsstöd har fattats. Med första kontakt avses muntlig eller skriftlig kontakt angående ansökan om försörjningsstöd. Allmänna förfrågningar exkluderas. Mätperiod är första halvåret. Källa: Egen undersökning i kommunen." },{ "id": "N05401", "title": "Valdeltagande i senaste kommunvalet, (%)", "description": "Antal avgivna röster i senaste kommunalvalet (giltiga och ogiltiga) dividerat med antal röstberättigade, multiplicerat med 100. Källa: Valmyndigheten och SCB." },{ "id": "N09808", "title": "Öppethållande huvudbiblioteket, timmar/vecka", "description": "Öppethållande i antal timmar/vecka vid kommunens huvudbibliotek. Avser en genomsnittsvecka vintertid. Källa: Kungliga biblioteket och SCB." }
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

        return (municipalityToString.toString().length > 0) ? (' för områdena ' + municipalityToString + ((yearToString.toString().length > 0) ? ' och åren ' + yearToString : '')) : '';
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
                sknv.title = 'Skåne nordväst';
                sknv.type = 'L';
                var like = new koladaAPI.municipality('');
                like.id = 'LIKE';
                like.title = 'Ängelholm och liknande kommuner';
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
                    $('#chart_div_' + self.selectedMetric().id + '').after('<div class=\"alert-info\">Kan inte ladda diagram för valda alternativ</div>');
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
            eng.title = 'Ängelholm';
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
