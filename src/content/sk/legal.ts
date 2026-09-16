import type { LegalContent } from '../types';

/**
 * Právny obsah — predbežný preklad.
 * Musí byť preverený slovenským právnikom pred launchom.
 * SK právne stránky majú vlastný lastUpdated (nezávislý od EN).
 */

const lastUpdated = '2026-07-06';

const privacyPolicy: LegalContent = {
  title: 'Ochrana osobných údajov',
  lastUpdated,
  body: [
    'Build with EUHub („my", „nás") prevádzkuje build.euhub.co. Tento dokument vysvetľuje, ako zaobchádzame s osobnými údajmi, keď používate tento web alebo odošlete požiadavku cez kontaktný formulár.',
    'Dáta, ktoré zbierame: Keď odošlete formulár „Vyžiadať web audit", zbierame informácie, ktoré poskytnete — meno, e-mail, firma, detaily projektu a voliteľné polia, ktoré vyplníte. Nezbierame viac dát, než je potrebné na odpoveď na vašu požiadavku.',
    'Analytika: Používame Umami Analytics, analytickú platformu bez cookies hostovanú v EÚ (región Frankfurt). Umami nenastavuje cookies a nesleduje jednotlivcov naprieč webmi. Zbierame agregované metriky — zobrazenia stránok, zdroje návštevnosti a počty udalostí — aby sme pochopili, ako sa web používa. Banner na udelenie súhlasu nie je potrebný, pretože sa nenastavujú cookies, ktoré nie sú nevyhnutné.',
    'Sprostredkovatelia z tretích strán: Keď odošlete formulár, vaše dáta sa prenášajú do Google Cloud Platform (náš poskytovateľ hostingu) a do cieľového webhooku, ktorý smeruje odoslané údaje do našich interných systémov. Analytické dáta spracováva Umami Cloud (EÚ/Frankfurt). Každý sprostredkovateľ pôsobí za podmienok zlučiteľných s GDPR.',
    'Právny základ: Údaje odoslané formulárom spracovávame podľa článku 6(1)(b) GDPR (nevyhnutné na kroky pred zmluvou na vašu žiadosť). Analytické dáta spracovávame podľa článku 6(1)(f) GDPR (oprávnený záujem na pochopení používania webu).',
    'Uchovávanie: Údaje odoslané formulárom sa uchovávajú až 12 mesiacov, ak nevznikne projekt, a počas trvania klientskeho vzťahu plus 3 roky, ak projekt vznikne. Analytické dáta sa uchovávajú v agregovanej forme bez individuálnej identifikácie.',
    'Vaše práva: Máte právo na prístup, opravu, vymazanie, obmedzenie alebo namietanie spracovania vašich osobných údajov. Máte tiež právo na prenosnosť dát a právo podať sťažnosť dohliadaciemu orgánu. Na uplatnenie práva nám napíšte na hello@euhub-ai.com.',
    'Kontakt: Pre otázky ohľadom ochrany osobných údajov napíšte na hello@euhub-ai.com. Sídlime na Slovensku, v Európskej únii.',
  ],
};

const cookiePolicy: LegalContent = {
  title: 'Zásady používania cookies',
  lastUpdated,
  body: [
    'Tento web nenastavuje cookies, ktoré nie sú nevyhnutné. Banner na udelenie súhlasu sa nezobrazuje, pretože sa nepoužívajú sledovacie cookies.',
    'Analytika: Používame Umami Analytics, analytickú platformu bez cookies. Umami meria súhrnnú návštevnosť bez nastavovania cookies a bez identifikácie jednotlivých návštevníkov. Pri analytike bez cookies sa podľa smernice ePrivacy / PECR nevyžaduje súhlas.',
    'Nevyhnutné cookies: Tento web môže nastaviť výlučne nevyhnutné cookies pre bezpečnosť alebo funkcionalitu, ak sa v budúcnosti pridajú interaktívne funkcie. Všetky takéto cookies budú zdokumentované tu.',
    'Tretie strany: Cloudflare Turnstile sa používa na ochranu pred spamom kontaktného formulára. Turnstile môže nastaviť technické cookie (cf_clearance) ako súčasť procesu rozpoznávania botov. Toto je bezpečnostné opatrenie, nie sledovanie.',
    'Zmeny: Ak sa to zmení — napríklad ak pridáme nástroj, ktorý nastavuje cookies, ktoré nie sú nevyhnutné — aktualizujeme tento dokument a pridáme mechanizmus súhlasu pred nasadením toho nástroja.',
  ],
};

const terms: LegalContent = {
  title: 'Podmienky použitia',
  lastUpdated,
  body: [
    'Tieto podmienky upravujú vaše používanie build.euhub.co, ktorý prevádzkuje Build with EUHub („my", „nás").',
    'Právny subjekt: build.euhub.co prevádzkuje Engineers Incubator s. r. o., Horná 67, 974 01 Banská Bystrica, Slovenská republika (IČO: 53741200, DIČ: 2121479470, IČ DPH: SK2121479470), súčasť skupiny EUHUB.',
    'Účel webu: Tento web je marketingová stránka na získavanie obchodných dopytov. Odoslanie kontaktného formulára predstavuje požiadavku na informácie o našich službách. Nepredstavuje zmluvu, ponuku ani záväzok dodať službu.',
    'Údaje odoslané formulárom: Keď odošlete formulár „Vyžiadať web audit", súhlasíte, že vás môžeme kontaktovať ohľadom vašej požiadavky. Zodpovedáte za presnosť informácií, ktoré poskytnete. Neodosielajte dôverné alebo citlivé informácie cez formulár.',
    'Duševné vlastníctvo: Obsah, dizajn a kód tohto webu sú naším vlastníctvom. Nemôžete kopírovať, reprodukovať alebo ďalej šíriť web bez povolenia.',
    'Bez záruky: Tento web je poskytovaný „tak ako je" bez akejkoľvek záruky. Negarantujeme, že web bude bez chýb, bez prerušenia alebo vhodný na konkrétny účel.',
    'Zodpovednosť: V rozsahu povolenom zákonom je naša zodpovednosť za akúkoľvek stratu z používania tohto webu obmedzená na sumu, ktorú ste nám zaplatili za používanie, čo je nula.',
    'Rozhodné právo: Tieto podmienky sa riadia zákonmi Slovenskej republiky. Spory budú riešené na slovenských súdoch, ak nie ste spotrebiteľ oprávnený začať konanie v krajine vášho bydliska.',
    'Kontakt: Pre otázky ohľadom týchto podmienok napíšte na hello@euhub-ai.com.',
  ],
};

export const legalBundle = { privacyPolicy, cookiePolicy, terms };
