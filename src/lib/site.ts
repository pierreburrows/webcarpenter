// Single source of truth for business facts and copy.
// Components read from this file; most wording changes happen here.
// Anything marked TODO must be confirmed with Antony before launch.

export const site = {
  name: "Antony Williams Carpentry & Joinery",
  shortName: "Antony Williams",
  owner: "Antony Williams",
  ownerShort: "Tony",
  // TODO: replace with the live domain before launch (used for canonical/OG URLs).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.antonywilliamscarpentry.co.uk",
  phone: "07710 124265",
  phoneHref: "tel:+447710124265",
  email: "thejoinertony@gmail.com",
  // TODO: confirm the Facebook page URL.
  facebook: "https://www.facebook.com/",
  facebookName: "Antony Williams Carpentry & Joinery",
  // TODO: confirm the town Antony works from and the area he covers.
  area: "[AREA TO CONFIRM]",
  areaLong: "[AREA TO CONFIRM] and the surrounding area",
} as const;

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "How it works" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Get a quote" },
] as const;

/* ------------------------------------------------------------------ */
/* Positioning                                                         */
/* ------------------------------------------------------------------ */

export const positioning = {
  // The one line the site has to land. Shown in the hero and the OG image.
  headline: "Bespoke carpentry for the spaces off-the-shelf can't reach.",
  // Supporting line under the headline.
  sub: "Media walls, fitted wardrobes, under-stairs storage, windows, doors and timber builds. Designed around your house, measured on site, made properly.",
  // Short version for the nav bar and footer.
  strap: "Made to measure. Built to last.",
  cta: "Get a quote",
  ctaSecondary: "See the work",
} as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  heading: "A joiner who builds for the room you've actually got.",
  paragraphs: [
    "I'm Antony Williams, a carpenter and joiner based in " +
      site.area +
      ". Most of what I build is fitted work: media walls, wardrobes, alcove units and under-stairs storage, made to fit the exact space, sloping ceilings and wonky walls included.",
    "Every job starts with a site visit and a drawing. I measure the room, sketch the unit with real dimensions, and agree it with you before anything is cut. Then I build it, usually on site, so it fits the house rather than a workshop ideal of it.",
    "Alongside fitted furniture I take on the joinery jobs other trades turn away: a replacement sash made to match a listed porch, portico pillars renewed in marine ply, a green oak deck, a timber-framed pool house. If it's made of wood and needs doing well, get in touch.",
  ],
  // TODO: confirm years trading and any qualifications or insurance worth stating.
  facts: [
    { label: "Based in", value: site.area },
    { label: "Works", value: "Domestic, fitted and bespoke" },
    { label: "Quotes", value: "Free, after a site visit" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string;
  name: string;
  short: string;
  detail: string;
  projects: string[]; // project slugs that show this service
};

export const services: Service[] = [
  {
    id: "media-walls",
    name: "Media walls and living room storage",
    short: "TV walls with hidden cabling, slat panels, inset fires and lit shelving.",
    detail:
      "A media wall is a built-in piece, not a unit pushed against the wall. Cable voids behind the panel, a fuse box hidden behind a matching door, shelves on adjustable pins, doors that line up. Shaker, flat handleless or oak slat, painted or left ready for your decorator.",
    projects: ["slat-media-wall", "shaker-media-wall", "living-room-storage"],
  },
  {
    id: "wardrobes",
    name: "Fitted wardrobes and bedroom storage",
    short: "Full-height runs scribed to sloping ceilings and eaves.",
    detail:
      "Attic rooms and eaves are where fitted furniture earns its keep. Doors cut to the roof line, hanging rails, drawers and shelving inside, and matching doors on existing cupboards so the whole wall reads as one piece.",
    projects: ["attic-wardrobes"],
  },
  {
    id: "under-stairs",
    name: "Under-stairs storage",
    short: "Pull-out drawers, bench seats and cupboards in the space you walk past every day.",
    detail:
      "Deep pull-outs on runners, a seat with a drawer beneath, shaker doors that follow the stair line. Each one is designed around what you need to put in it.",
    projects: ["understairs-pullouts", "understairs-bench-seat"],
  },
  {
    id: "staircases",
    name: "Staircases and balustrades",
    short: "Oak and glass upgrades to an existing staircase.",
    detail:
      "Replace a boxed-in stair with oak newel posts, handrails and frameless glass, and use the space underneath properly. No need to rebuild the whole flight.",
    projects: ["staircase-glass-balustrade"],
  },
  {
    id: "shelving",
    name: "Alcove units, shelving and bookcases",
    short: "Floating shelves, chimney-breast alcoves, floor-to-ceiling library walls.",
    detail:
      "Scribed to the walls so there are no gaps to fill, with cupboards below and shelves above. Solid timber or painted, depending on the house.",
    projects: ["cottage-shelving-oak-steps", "living-room-storage"],
  },
  {
    id: "windows-doors",
    name: "Windows, doors and external joinery",
    short: "Sashes made to match, front doors hung, porticos and pillars renewed.",
    detail:
      "Period work where a stock part won't do. A hardwood sash made on site to match the rest of the porch, a new wooden front door and frame, fluted portico pillars remade in marine ply to match the street.",
    projects: ["oast-house-sash", "portico-pillars"],
  },
  {
    id: "outdoor",
    name: "Decking, garden buildings and outdoor structures",
    short: "Green oak decks, timber-framed pool houses, gates and enclosures.",
    detail:
      "Structural timber work from the footings up. Oak posts and beams, treated frames, cedar shingles and cladding, finished to match the house.",
    projects: ["pool-house", "oak-decking", "cat-enclosure"],
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const steps = [
  {
    n: "01",
    title: "Tell me about the space",
    body: "Call, email or message with a photo of the room and a rough idea of what you want. A phone picture is plenty to start.",
  },
  {
    n: "02",
    title: "Site visit, drawing, fixed price",
    body: "I come and measure, talk through options, and send a dimensioned sketch with a quote. Nothing is cut until you've agreed the drawing.",
  },
  {
    n: "03",
    title: "Built in, tidied up",
    body: "Most fitted work is built on site over a few days. It leaves ready for your decorator, or finished, as agreed. I clean up after myself.",
    // TODO: confirm whether Antony offers painting/finishing or hands over for decoration.
  },
] as const;

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Phase = "before" | "sketch" | "during" | "after" | "detail";

export type ProjectImage = {
  src: string; // relative to /img/projects/<slug>/
  alt: string;
  caption: string;
  phase: Phase;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  /** One line for cards and the grid. */
  summary: string;
  /** One paragraph for the project page. */
  body: string;
  /** Antony's original caption, verbatim, if there was one. */
  original?: string;
  images: ProjectImage[];
  featured?: boolean;
  /** Photographed before decoration. Used to add a small note so raw MDF reads as intentional. */
  prePaint?: boolean;
  /** Still needs a caption or confirmation from Antony. */
  todo?: string;
};

const img = (slug: string, file: string) => `/img/projects/${slug}/${file}`;

export const projects: Project[] = [
  {
    slug: "pool-house",
    title: "Timber-framed pool house",
    category: "Garden buildings",
    summary: "From footings to fit-out: timber frame, brick plinth, cedar shingle roof, black cladding, kitchenette inside.",
    body: "A complete build at the end of a garden, next to the pool. Timber frame on a brick plinth and concrete footing, wrapped and insulated, with a cedar shingle roof and black weatherboard cladding. Sage green bifolds open onto the limestone terrace. Inside it's plastered and painted with downlights, a limestone floor and a kitchenette with a wine fridge. Finished in a summer.",
    original: "Pool house build done this summer",
    featured: true,
    images: [
      { src: img("pool-house", "01-finished-pool-house-black-cladding-bifolds.jpg"), alt: "Finished pool house with black cladding and green bifold doors beside a covered swimming pool", caption: "Finished. Black cladding, brick piers, green bifolds, limestone paving.", phase: "after" },
      { src: img("pool-house", "05-interior-kitchenette-wine-fridge.jpg"), alt: "Inside the pool house: kitchenette with dark units, wine fridge and limestone floor", caption: "Inside: kitchenette, wine fridge, fluted glass wall unit.", phase: "after" },
      { src: img("pool-house", "02-cedar-shingle-roof.jpg"), alt: "Cedar shingle roof seen from above with wooded hills behind", caption: "Cedar shingle roof.", phase: "detail" },
      { src: img("pool-house", "04-build-timber-frame-breather-membrane-brick-plinth.jpg"), alt: "Timber frame wrapped in breather membrane on a brick plinth during construction", caption: "Frame up, wrapped, on its brick plinth.", phase: "during" },
      { src: img("pool-house", "03-rear-brick-elevation-shingle-roof.jpg"), alt: "Rear brick elevation of the pool house with shingle roof on", caption: "Rear elevation, roof on.", phase: "during" },
    ],
  },
  {
    slug: "slat-media-wall",
    title: "Oak slat media wall, from sketch to build",
    category: "Media walls",
    summary: "A hand-drawn design turned into a full-height slat wall with hidden cabling and a fuse box behind a matching door.",
    body: "The customer wanted the most storage the room could take without it feeling heavy. The drawing came first: a full-height oak slat panel with a cable void behind it, five handleless cupboards below on adjustable shelves, and a side tower of open shelving. The fuse box on that wall was in the way, so it got its own matching door in the tower. Built to the drawing, 2.1 metres wide and high, 290 deep.",
    original: "From design to completion of this media wall to make the most of the available space.",
    featured: true,
    prePaint: true,
    images: [
      { src: img("slat-media-wall", "02-after-closed-slat-wall.jpg"), alt: "Full-height oak slat media wall with flush handleless cupboards and side shelving tower", caption: "Finished, before paint.", phase: "after" },
      { src: img("slat-media-wall", "04-design-sketch-dimensions.jpg"), alt: "Hand-drawn dimensioned design sketch of the media wall", caption: "The drawing the customer signed off.", phase: "sketch" },
      { src: img("slat-media-wall", "03-before-bare-wall-cables.jpg"), alt: "Bare wall with cables chased in and fuse box exposed before the build", caption: "Before: bare wall, cables in, fuse box in the way.", phase: "before" },
      { src: img("slat-media-wall", "01-after-doors-open-slat-wall.jpg"), alt: "Media wall with cupboard doors open showing adjustable shelves and the concealed fuse box", caption: "Doors open: adjustable shelves, fuse box behind its own door.", phase: "detail" },
    ],
  },
  {
    slug: "attic-wardrobes",
    title: "Attic bedroom wardrobes with en-suite door",
    category: "Fitted wardrobes",
    summary: "A full wall of shaker doors under a sloping ceiling, with the en-suite door built into the run.",
    body: "An attic bedroom with a sloping ceiling on both sides and an en-suite behind the end wall. The whole wall is now one run of shaker doors, top boxes cut to the roof line, with the centre pair opening into the bathroom. Hanging rails, shelves and drawers inside, angled shelving in the eaves. The existing eaves cupboards and landing door got matching doors so everything on that floor reads as one piece.",
    original: "A nice wardrobe build finished this week. Access to the en-suite bathroom incorporated into the run of doors. Matching doors made and fitted to the existing eaves storage.",
    featured: true,
    prePaint: true,
    images: [
      { src: img("attic-wardrobes", "01-full-run-closed.jpg"), alt: "Full wall of shaker wardrobe doors fitted under a sloping attic ceiling", caption: "The full run, closed.", phase: "after" },
      { src: img("attic-wardrobes", "02-ensuite-door-open.jpg"), alt: "Centre pair of wardrobe doors open to reveal the en-suite bathroom", caption: "The centre pair opens into the en-suite.", phase: "after" },
      { src: img("attic-wardrobes", "04-interior-rail-drawers.jpg"), alt: "Inside a wardrobe: hanging rail, shelf, drawers and angled eaves shelving", caption: "Inside: rail, shelf, drawers, eaves shelving.", phase: "detail" },
      { src: img("attic-wardrobes", "06-eaves-storage-open.jpg"), alt: "Bifold doors open on eaves storage with rail and shelves", caption: "Eaves storage behind matching bifolds.", phase: "detail" },
      { src: img("attic-wardrobes", "08-bifold-eaves-doors.jpg"), alt: "Matching bifold shaker doors fitted to an existing eaves cupboard", caption: "Matching doors on the existing eaves cupboard.", phase: "after" },
      { src: img("attic-wardrobes", "07-single-door-landing.jpg"), alt: "Matching single shaker door fitted to an existing opening on the landing", caption: "And on the landing.", phase: "after" },
      { src: img("attic-wardrobes", "03-door-detail-closeup.jpg"), alt: "Close-up of shaker door frame and panel joinery", caption: "Door detail.", phase: "detail" },
      { src: img("attic-wardrobes", "05-interior-drawer-open.jpg"), alt: "Wardrobe drawer pulled open on its runner", caption: "Drawers on full-extension runners.", phase: "detail" },
    ],
  },
  {
    slug: "oak-decking",
    title: "Green oak decking by the river",
    category: "Decking",
    summary: "A raised deck on green oak posts and beams, wrapping two sides of a black weatherboarded house.",
    body: "The old stone patio came out and a raised deck went in on heavy green oak posts and beams, wrapping round two sides of the house with a flight of oak steps down to the drive. Posts set on steel shoes, treated joists between the oak, textured boards on top. The whole thing was finished black to match the weatherboarding, so from the river it looks like it was always there.",
    original: "Decking job completed this year",
    featured: true,
    images: [
      { src: img("oak-decking", "07-finished-deck-surface-river-view.jpg"), alt: "Finished black textured deck with oak posts and a view over the river and fields", caption: "Finished, looking out over the river.", phase: "after" },
      { src: img("oak-decking", "06-finished-black-oak-steps-and-posts.jpg"), alt: "Oak steps and posts finished black to match the house cladding", caption: "Steps and posts, finished black to match the house.", phase: "after" },
      { src: img("oak-decking", "01-before-breaking-out-old-patio.jpg"), alt: "Old stone patio being broken out with a breaker before the deck", caption: "Before: breaking out the old patio.", phase: "before" },
      { src: img("oak-decking", "02-green-oak-beams-on-site-by-bridge.jpg"), alt: "Stack of green oak beams on a pallet beside a stone bridge", caption: "Green oak arriving.", phase: "during" },
      { src: img("oak-decking", "03-oak-posts-going-up.jpg"), alt: "First oak posts set on post shoes and braced plumb", caption: "Posts up.", phase: "during" },
      { src: img("oak-decking", "04-joists-and-stair-stringers-framed.jpg"), alt: "Oak posts and beams with softwood joists and oak stair stringers cut", caption: "Joists in, stringers cut.", phase: "during" },
      { src: img("oak-decking", "05-full-frame-wrapping-around-building.jpg"), alt: "Deck frame wrapping round two sides of the house with steps in progress", caption: "The frame wrapping round the house.", phase: "during" },
    ],
  },
  {
    slug: "shaker-media-wall",
    title: "Shaker media wall with pine top",
    category: "Media walls",
    summary: "Six shaker doors, a solid pine worktop and two tall towers with rounded corners scribed to the cornice.",
    body: "A traditional take on a media wall: shaker base cupboards with a solid pine top, the TV centred on the wall between two tall towers with open shelves above and drawers below. The towers have rounded front corners and run up to the cornice. Photographed before decoration.",
    original: "One of our media walls we built recently",
    prePaint: true,
    images: [
      { src: img("shaker-media-wall", "01-front-full-unit.jpg"), alt: "Shaker media wall with six base doors, pine top and two tall shelving towers", caption: "The full unit.", phase: "after" },
      { src: img("shaker-media-wall", "04-angled-full-run.jpg"), alt: "Angled view along the shaker base cupboards and pine top", caption: "Along the run.", phase: "after" },
      { src: img("shaker-media-wall", "03-tower-curved-corner-cornice.jpg"), alt: "Top of a shelving tower with rounded corner scribed to the cornice", caption: "Rounded corner, scribed to the cornice.", phase: "detail" },
      { src: img("shaker-media-wall", "02-door-detail-pine-top.jpg"), alt: "Close-up of a shaker door panel and the pine worktop edge", caption: "Door and top detail.", phase: "detail" },
    ],
  },
  {
    slug: "staircase-glass-balustrade",
    title: "Staircase upgrade with glass balustrade",
    category: "Staircases",
    summary: "A boxed-in staircase opened up with oak newel posts, oak handrails and frameless glass, plus an under-stairs cupboard.",
    body: "The old staircase was boxed in with a plain painted stringer. The boxing came off, the under-stairs was opened up, and the whole thing was rebuilt in oak: newel post, handrails both sides, base rail and frameless glass panels. The space underneath became an oak-faced cupboard. Same flight of stairs, different hallway.",
    original: "Little upgrade to a staircase with glass balustrade completed recently.",
    images: [
      { src: img("staircase-glass-balustrade", "03-after-oak-glass-balustrade-understairs-cupboard.jpg"), alt: "Oak newel post and handrail with frameless glass panels and an oak under-stairs cupboard", caption: "After: oak and glass, cupboard underneath.", phase: "after" },
      { src: img("staircase-glass-balustrade", "01-before-stripped-understairs.jpg"), alt: "Old boxed-in staircase stripped back with the under-stairs opened up", caption: "Before: boxed in, stripped back.", phase: "before" },
      { src: img("staircase-glass-balustrade", "04-after-from-hall.jpg"), alt: "View from the hall up the stairs with oak handrails and glass balustrade", caption: "After: from the hall.", phase: "after" },
      { src: img("staircase-glass-balustrade", "02-before-looking-up.jpg"), alt: "Looking up the old staircase with its plain painted stringer", caption: "Before: looking up.", phase: "before" },
    ],
  },
  {
    slug: "understairs-pullouts",
    title: "Under-stairs pull-outs and meter cupboard",
    category: "Under-stairs storage",
    summary: "Three deep pull-out drawers behind flush panels, and shaker doors on the meter cupboard by the front door.",
    body: "Flush, handleless panels stepped to the stair line, and behind them three deep pull-outs on runners that take the full depth of the void. The meter cupboard by the front door got a pair of shaker doors to match the rest of the hall.",
    original: "Nice under stair storage and meter cupboard finished this week.",
    prePaint: true,
    images: [
      { src: img("understairs-pullouts", "02-understairs-pullout-drawers-open.jpg"), alt: "Three deep pull-out drawers extended from under the stairs", caption: "Pull-outs extended.", phase: "after" },
      { src: img("understairs-pullouts", "01-understairs-closed-flush-panels.jpg"), alt: "Flush handleless panels closed under the staircase", caption: "Closed: flush panels to the stair line.", phase: "after" },
      { src: img("understairs-pullouts", "03-meter-cupboard-shaker-doors.jpg"), alt: "Twin shaker doors on a meter cupboard beside the front door", caption: "Meter cupboard doors.", phase: "after" },
      { src: img("understairs-pullouts", "04-shaker-door-corner-detail.jpg"), alt: "Close-up of a shaker door frame and panel corner joint", caption: "Corner detail.", phase: "detail" },
    ],
  },
  {
    slug: "understairs-bench-seat",
    title: "Under-stairs bench seat and drawer",
    category: "Under-stairs storage",
    summary: "A panelled seat nook with a deep drawer beneath and shaker doors following the stair line.",
    body: "The customer wanted somewhere to sit and put shoes on, and somewhere to put the shoes. The answer was a seat nook with shaker panelling on the back and side, a deep drawer under the seat, and two angled shaker doors on the cupboards beyond. Everything follows the line of the stair.",
    original: "Bespoke under stair storage solution to fit the customer's requirements.",
    prePaint: true,
    images: [
      { src: img("understairs-bench-seat", "02-closed-full-run.jpg"), alt: "Under-stairs seat nook with shaker panels and angled shaker cupboard doors", caption: "The full run.", phase: "after" },
      { src: img("understairs-bench-seat", "01-drawer-pulled-out.jpg"), alt: "Deep shaker-fronted drawer pulled out beside the seat nook", caption: "Drawer under the seat.", phase: "detail" },
      { src: img("understairs-bench-seat", "03-bench-seat-nook-detail.jpg"), alt: "Inside the seat nook showing shaker panelling on the back and side", caption: "Inside the nook.", phase: "detail" },
    ],
  },
  {
    slug: "living-room-storage",
    title: "Media walls and alcove units",
    category: "Media walls",
    summary: "A selection of living room storage: slat walls, lit shelving, a log store, alcove cupboards and a library wall.",
    body: "Six living rooms, six different answers. A dark green run with a built-in log store against a plaster feature wall. An oak slat media wall with lit shelving, an inset electric fire and sage shaker doors. A floating oak unit under a slat wall. A blue media unit with a slat panel. A floor-to-ceiling grey library wall around a TV recess. Twin alcoves with floating pine shelves and white handleless cupboards.",
    todo: "No caption supplied. Confirm whether these are separate jobs and whether any should be their own project.",
    images: [
      { src: img("living-room-storage", "02-oak-slat-media-wall-fire-lit-shelves.jpg"), alt: "Oak slat media wall with LED-lit shelving, inset electric fire and sage shaker doors", caption: "Oak slat wall, lit shelving, inset fire.", phase: "after" },
      { src: img("living-room-storage", "01-dark-green-unit-log-store.jpg"), alt: "Long dark green low unit with open shelving and a built-in log store", caption: "Dark green run with a log store.", phase: "after" },
      { src: img("living-room-storage", "04-blue-media-unit-slat-panel.jpg"), alt: "Blue painted media unit with side shelving and an oak slat panel behind the TV", caption: "Blue media unit, slat panel.", phase: "after" },
      { src: img("living-room-storage", "05-grey-full-wall-library-unit.jpg"), alt: "Floor-to-ceiling grey shelving unit with a central TV recess", caption: "Floor-to-ceiling library wall.", phase: "after" },
      { src: img("living-room-storage", "06-alcove-shelves-white-cupboards.jpg"), alt: "Twin chimney-breast alcoves with floating pine shelves and white cupboards", caption: "Alcoves: floating shelves, white cupboards.", phase: "after" },
      { src: img("living-room-storage", "03-slat-wall-low-unit-bookcase-unfinished.jpg"), alt: "Oak slat wall with a long floating low unit and open bookcase before painting", caption: "Slat wall and floating unit, before paint.", phase: "after" },
    ],
  },
  {
    slug: "oast-house-sash",
    title: "Replacement sash for an oast house porch",
    category: "Windows and doors",
    summary: "A six-pane hardwood sash made on site to match the existing windows.",
    body: "One sash on the porch of an oast house had gone. Rather than replace the lot, a new hardwood sash was made on site to match the existing six-pane windows exactly: same bars, same sections, double-glazed units beaded in. Glued up in clamps on the drive, fitted the same day, left for the decorator to paint white with the rest.",
    original: "Replacement sash made on site to match the existing windows on the porch of an oast house.",
    images: [
      { src: img("oast-house-sash", "01-new-sash-fitted-exterior.jpg"), alt: "New six-pane hardwood sash fitted in a white painted frame under a tiled porch roof", caption: "Fitted, ready for paint.", phase: "after" },
      { src: img("oast-house-sash", "03-porch-context-new-vs-existing.jpg"), alt: "Porch front showing the new unpainted sash beside the existing white windows and stable door", caption: "New sash on the left, matching the rest.", phase: "after" },
      { src: img("oast-house-sash", "04-sash-in-clamps-on-site.jpg"), alt: "The sash glued up in clamps on a site bench", caption: "Glued up on site.", phase: "during" },
      { src: img("oast-house-sash", "02-new-sash-from-inside.jpg"), alt: "View through the new sash to the garden", caption: "From inside.", phase: "detail" },
    ],
  },
  {
    slug: "cottage-shelving-oak-steps",
    title: "Cottage shelving and oak steps",
    category: "Shelving",
    summary: "Solid pine shelving scribed to old brick walls, and three new oak steps off a quarry-tiled hall.",
    body: "Old houses don't have straight walls. A tall solid pine unit and a high-level run of shelving, each scribed to painted brick and an uneven ceiling so there are no gaps. In the hall, three new solid oak steps with oak side cappings drop down from the quarry tiles.",
    todo: "No caption supplied. Confirm this is one job and get a line from Antony.",
    images: [
      { src: img("cottage-shelving-oak-steps", "02-pine-shelving-full-wall-high-level.jpg"), alt: "Solid pine tall unit and high-level shelving scribed to painted brick walls above a radiator", caption: "Pine shelving scribed to the brick.", phase: "after" },
      { src: img("cottage-shelving-oak-steps", "01-pine-shelving-tall-unit-scribed-to-wall.jpg"), alt: "Tall pine shelving unit scribed to an uneven brick wall beside a doorway", caption: "Scribed to the wall.", phase: "detail" },
      { src: img("cottage-shelving-oak-steps", "03-oak-cellar-steps.jpg"), alt: "Three new solid oak steps with oak side cappings off a quarry-tiled hall", caption: "Oak steps off the hall.", phase: "after" },
    ],
  },
  {
    slug: "portico-pillars",
    title: "Portico pillars renewed in marine ply",
    category: "Windows and doors",
    summary: "Fluted pilasters either side of a front door, remade to match the street.",
    body: "The original pillars had rotted. New fluted pilasters were made in marine ply to match the existing pediment and the neighbouring houses, fitted and left ready for paint.",
    original: "Replacement portico pillars renewed in marine ply to match the existing and surrounding properties.",
    images: [
      { src: img("portico-pillars", "01-portico-pillars-fitted-unpainted.jpg"), alt: "New fluted portico pillars either side of a front door, unpainted", caption: "Fitted, ready for paint.", phase: "after" },
    ],
  },
  {
    slug: "cat-enclosure",
    title: "Cat enclosure",
    category: "Outdoor",
    summary: "A treated timber and mesh enclosure with a full-height gate and clear roof, built against the back of the house.",
    body: "A safe outdoor space for the cats over the patio doors. Treated timber frame, braced panels, galvanised mesh, a full-height gate on tee hinges and a clear roof so it stays dry.",
    original: "Cat enclosure",
    images: [
      { src: img("cat-enclosure", "01-catio-rear-of-house.jpg"), alt: "Timber-framed cat enclosure with mesh panels and a gate built against the rear of a brick house", caption: "Built over the patio doors.", phase: "after" },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

export type Review = {
  name: string; // first name and initial unless Antony confirms full names
  date: string;
  text: string;
  source: "Facebook";
};

export const reviews: Review[] = [
  {
    name: "Rhianna R.",
    date: "June 2025",
    text: "Tony has finished building a custom gate for me, and a beautiful wardrobe for my daughter. His craftsmanship is excellent, and I am very happy with everything he has done. I would highly recommend him for any carpentry projects.",
    source: "Facebook",
  },
  {
    name: "Beth J.",
    date: "October 2024",
    text: "Antony fitted our new wooden front door and frame this week and we'd thoroughly recommend. He was very knowledgeable and a great craftsman; we'll be booking him for all our future projects.",
    source: "Facebook",
  },
  {
    name: "Emma C.",
    date: "February 2025",
    text: "I found Antony on Facebook and had amazing work done on hanging new doors. I found him honest, polite and trustworthy to be left alone. I would recommend.",
    source: "Facebook",
  },
];

/* ------------------------------------------------------------------ */
/* Contact / enquiry form                                              */
/* ------------------------------------------------------------------ */

export const contact = {
  heading: "Tell me about the space.",
  sub: "A photo and a sentence is enough to start. I'll come back with a time to visit.",
  fields: {
    name: "Your name",
    phone: "Phone",
    email: "Email",
    postcode: "Postcode",
    type: "What's it for?",
    message: "What do you have in mind?",
    photo: "Add a photo of the space (optional)",
  },
  types: [
    "Media wall",
    "Wardrobes",
    "Under-stairs storage",
    "Shelving or alcoves",
    "Windows or doors",
    "Decking or garden building",
    "Something else",
  ],
  submit: "Send enquiry",
  success: "Thanks. I'll be in touch, usually the same day.",
  fallback: "Something went wrong sending that. Please call or email instead.",
} as const;

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  line: `${site.name}. Carpentry and joinery in ${site.areaLong}.`,
  legal: `© ${new Date().getFullYear()} ${site.name}`,
} as const;
