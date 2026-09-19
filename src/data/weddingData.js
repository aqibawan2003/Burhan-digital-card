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
      bride: 'D/o Saeed Iqbal',
    },
    dateLabel: '16 - 18 October 2026',
    primaryCountdownDate: '2026-10-17T17:00:00+05:00',
    city: 'Lahore, Pakistan',
    invitationLine:
      'Join us for three elegant days of prayer, joy, and celebration as we unite two families in blessed matrimony.',
    hostLine: 'Mr & Mrs Muhammad Nadeem Anwar',
    ctaLabel: 'Open Invitation',
  },
  couple: {
    groom: {
      name: 'Burhan Ud Din',
      title: 'The Groom',
      parents: 'Son of Mr & Mrs Muhammad Nadeem Anwar',
    },
    bride: {
      name: 'D/o Saeed Iqbal',
      title: 'The Bride',
      parents: 'Daughter of Saeed Iqbal',
    },
  },
  countdown: {
    title: 'Counting Down to the Barat',
    subtitle:
      'The celebration begins on Saturday, 17 October 2026 at 5:00 PM Pakistan time.',
  },
  events: [
    {
      id: 'mehndi',
      name: 'Mehndi Ceremony',
      date: 'Friday, 16 October 2026',
      timeLabel: '6:30 PM - 9:30 PM',
      venue: 'Dua Events',
      address: '888-N Poonch Road, Samanabad, Lahore',
      mapsUrl: buildMapsLink('Dua Events 888-N Poonch Road Samanabad Lahore'),
      description:
        'An evening of color, music, and celebration to begin the wedding festivities.',
      highlights: ['Traditional Mehndi', 'Family gathering', 'Musical celebration'],
      hostInfo:
        'Awaiting Eyes: Zainab, Abrish, Hadia, Afifa, Ashifa, Javeria, Nazifa, Aqsa, Aimen, Ayesha, Wajeeha, Tehreem',
    },
    {
      id: 'barat',
      name: 'Barat Ceremony',
      date: 'Saturday, 17 October 2026',
      timeLabel: 'Sehra Bandi 5:00 PM • Barat Departure 6:00 PM',
      venue: 'H No-7 St-62',
      address: 'Sharif Park Multan Road, Lahore',
      mapsUrl: buildMapsLink('H No-7 St-62 Sharif Park Multan Road Lahore'),
      description:
        'The main wedding procession and ceremony, hosted with honor by the groom\'s family.',
      highlights: ['Sehra Bandi at 5 PM', 'Barat Departure at 6 PM', 'Wedding Ceremony'],
      hostInfo:
        'Hosted by: Mr & Mrs Naseem Anwar, Mr & Mrs Azeem Anwar (0310-4767141), Mr & Mrs Naeem Sadiq (0321-4287470), Mr & Mrs Nadeem Sadiq',
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
      highlights: ['Reception at 6:30 PM', 'Dinner at 8:00 PM', 'Evening celebration'],
      hostInfo:
        'Hosted by: Mr & Mrs Naseem Anwar, Mr & Mrs Azeem Anwar (0310-4767141), Mr & Mrs Naeem Sadiq (0321-4287470), Mr & Mrs Nadeem Sadiq',
    },
  ],
  venue: {
    title: 'Main Venue',
    name: 'Qasr-e-Saeed Marquee',
    address: '7 Wahdat Rd, Nizam Block Allama Iqbal Town, Lahore',
    mapsUrl: buildMapsLink(
      'Qasr-e-Saeed Marquee 7 Wahdat Road Nizam Block Allama Iqbal Town Lahore',
    ),
    note:
      'The Walima reception will be held at Qasr-e-Saeed Marquee. Please see event details for other venues.',
  },
  story: {
    heading: 'A Celebration of Faith, Family, and New Beginnings',
    message:
      'With gratitude and joy, we invite you to witness a weekend filled with prayer, tradition, and heartfelt togetherness.',
    familyMessage:
      'Mr & Mrs Muhammad Nadeem Anwar request the honor of your presence as we celebrate the marriage of their beloved son Burhan Ud Din.',
    familyContacts: [
      { name: 'Mr & Mrs Naseem Anwar', phone: '' },
      { name: 'Mr & Mrs Azeem Anwar', phone: '0310-4767141' },
      { name: 'Mr & Mrs Naeem Sadiq', phone: '0321-4287470' },
      { name: 'Mr & Mrs Nadeem Sadiq', phone: '' },
    ],
  },
  rsvp: {
    title: 'RSVP',
    subtitle:
      'Please let us know if you can join us for this special celebration.',
  },
  guestWishes: {
    title: 'Guest Wishes',
    subtitle:
      'Share your blessings and good wishes for the happy couple.',
    initialWishes: [
      {
        name: 'Family & Friends',
        message: 'Wishing you a lifetime of love, happiness, and blessed togetherness. May Allah bless your union!',
      },
    ],
  },
  music: {
    audioSrc: '/audio/wadding.mp3',
    placeholderNote: 'Music will play when the audio file is added to the project.',
  },
}
