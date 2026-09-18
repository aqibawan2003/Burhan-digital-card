const buildMapsLink = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

export const weddingData = {
  meta: {
    title: 'Burhan Ud Din Wedding Invitation',
    description:
      'A royal digital wedding invitation for Burhan Ud Din and family celebrations in Lahore.',
    shareTitle: 'Burhan Ud Din Wedding Invitation',
    shareText:
      'You are warmly invited to celebrate the wedding festivities of Burhan Ud Din in Lahore.',
  },
  invitation: {
    eyebrow: 'Bismillah ir-Rahman ir-Rahim',
    badge: "You're Invited",
    weekendLabel: 'A Royal Wedding Weekend',
    names: {
      groom: 'Burhan Ud Din',
      // TODO: Replace this placeholder when the bride\'s first name is confirmed.
      bride: 'D/o Saeed Iqbal',
    },
    dateLabel: '16 - 18 October 2026',
    primaryCountdownDate: '2026-10-17T17:00:00+05:00',
    city: 'Lahore, Pakistan',
    invitationLine:
      'Join us for three elegant days of prayer, joy, music, and family as we celebrate a cherished new beginning.',
    hostLine: 'Hosted with love by Mr & Mrs Muhammad Nadeem Anwar',
    ctaLabel: 'Open Invitation',
  },
  couple: {
    groom: {
      name: 'Burhan Ud Din',
      role: 'Groom',
      image: '/images/groom-placeholder.svg',
      intro:
        'Beloved son of Mr & Mrs Muhammad Nadeem Anwar, celebrated with warmth, prayer, and family blessings.',
    },
    bride: {
      // TODO: Replace this placeholder when the bride\'s first name is confirmed.
      name: 'D/o Saeed Iqbal',
      role: 'Bride',
      image: '/images/bride-placeholder.svg',
      intro:
        'Daughter of Saeed Iqbal. Replace this line later if you want to add her full name or a personal introduction.',
    },
  },
  countdown: {
    title: 'Counting Down to the Barat',
    subtitle:
      'The live timer below is set to Sehrah Bandi on Saturday, 17 October 2026 at 5:00 PM Pakistan time.',
  },
  events: [
    {
      id: 'mehndi',
      name: 'Mehndi Ceremony',
      date: 'Friday, 16 October 2026',
      timeLabel: '6:30 PM to 9:30 PM',
      venue: 'Dua Events',
      address: '888-N Poonch Road, Samanabad, Lahore',
      mapsUrl: buildMapsLink('Dua Events 888-N Poonch Road Samanabad Lahore'),
      description:
        'An evening of color, music, and celebration to begin the wedding festivities.',
      highlights: ['Awaiting eyes', 'Family gathering', 'Traditional Mehndi'],
      footer:
        'Awaiting Eyes: Zainab, Abrish, Hadia, Afifa, Ashifa, Javeria, Nazifa, Aqsa, Aimen, Ayesha, Wajeeha, Tehreem',
    },
    {
      id: 'barat',
      name: 'Barat Ceremony',
      date: 'Saturday, 17 October 2026',
      timeLabel: 'Sehra Bandi 5:00 PM • Departure of Barat 6:00 PM',
      venue: 'H No-7 St-62',
      address: 'Sharif Park Multan Road, Lahore',
      mapsUrl: buildMapsLink('H No-7 St-62 Sharif Park Multan Road Lahore'),
      description:
        'The main wedding procession and ceremony, hosted with honor by the groom\'s family.',
      highlights: ['Sehra Bandi at 5:00 PM', 'Departure at 6:00 PM', 'Hosted by the Anwar family'],
      footer:
        'Looking Forward: Mr & Mrs Naseem Anwar, Mr & Mrs Azeem Anwar (0310-4767141), Mr & Mrs Naeem Sadiq (0321-4287470), Mr & Mrs Nadeem Sadiq',
    },
    {
      id: 'walima',
      name: 'Walima Ceremony',
      date: 'Sunday, 18 October 2026',
      timeLabel: 'Reception 6:30 PM • Dinner 8:00 PM',
      venue: 'Qasr-e-Saeed Marquee',
      address: '7 Wahdat Rd, Nizam Block Allama Iqbal Town, Lahore',
      mapsUrl: buildMapsLink(
        'Qasr-e-Saeed Marquee 7 Wahdat Road Nizam Block Allama Iqbal Town Lahore',
      ),
      description:
        'A graceful reception dinner to conclude the celebrations with loved ones.',
      highlights: ['Reception at 6:30 PM', 'Dinner at 8:00 PM', 'Elegant evening gathering'],
      footer:
        'Looking Forward: Mr & Mrs Naseem Anwar, Mr & Mrs Azeem Anwar (0310-4767141), Mr & Mrs Naeem Sadiq (0321-4287470), Mr & Mrs Nadeem Sadiq',
    },
  ],
  gallery: [
    {
      title: 'Couple Portrait',
      subtitle: 'Replace with your favorite formal portrait',
      image: '/images/gallery-1.svg',
    },
    {
      title: 'Pre-Wedding Moment',
      subtitle: 'Add a candid memory or engagement photo',
      image: '/images/gallery-2.svg',
    },
    {
      title: 'Family Celebration',
      subtitle: 'Use a joyful family image before the wedding',
      image: '/images/gallery-3.svg',
    },
    {
      title: 'Wedding Monogram',
      subtitle: 'A decorative slot for invitation artwork or initials',
      image: '/images/gallery-4.svg',
    },
    {
      title: 'Mehndi Colors',
      subtitle: 'Add a bright event photograph or floral close-up',
      image: '/images/gallery-5.svg',
    },
    {
      title: 'Reception Elegance',
      subtitle: 'Use a venue or reception portrait here',
      image: '/images/gallery-6.svg',
    },
  ],
  story: {
    heading: 'A Celebration of Faith, Family, and New Beginnings',
    message:
      'With gratitude and joy, the families invite you to witness a weekend shaped by prayer, tradition, and heartfelt togetherness.',
    paragraphs: [
      // TODO: Replace these placeholders with the couple\'s story, how they met, or a family-written note.
      'This section is ready for the couple\'s own story. You can describe how the families came together, what this celebration means, or a special memory you want guests to read before the wedding day.',
      'You can also use this space for a warm personal note from the bride and groom, a short dua, or a message thanking guests for sharing in the celebration.',
    ],
    invitedBy: 'Mr & Mrs Muhammad Nadeem Anwar request the honour of your presence.',
    familyContacts: [
      'Mr & Mrs Naseem Anwar',
      'Mr & Mrs Azeem Anwar • 0310-4767141',
      'Mr & Mrs Naeem Sadiq • 0321-4287470',
      'Mr & Mrs Nadeem Sadiq',
    ],
  },
  venue: {
    title: 'Venue & Directions',
    name: 'Qasr-e-Saeed Marquee',
    address: '7 Wahdat Rd, Nizam Block Allama Iqbal Town, Lahore',
    mapsUrl: buildMapsLink(
      'Qasr-e-Saeed Marquee 7 Wahdat Road Nizam Block Allama Iqbal Town Lahore',
    ),
    note:
      'This section highlights the Walima venue. Direction buttons are also included in each event card for Mehndi and Barat.',
  },
  rsvp: {
    title: 'RSVP',
    subtitle:
      'This form currently saves in local UI state only. Connect Formspree, Firebase, or Supabase later if you want real guest submissions.',
  },
  guestWishes: {
    title: 'Guest Wishes',
    subtitle:
      'Guests can leave warm wishes here during the session. Persistent storage can be added later.',
    initialWishes: [],
  },
  music: {
    // TODO: Add a local file in /public/audio and update this path to enable background music.
    audioSrc: '/audio/wadding.mp3',
    placeholderNote: 'Add /public/audio/wadding.mp3 later to enable music playback.',
  },
}
