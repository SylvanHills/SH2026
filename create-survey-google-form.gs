/**
 * Sylvan Hills — Market Demand Validation Survey
 * Google Apps Script to auto-generate the full survey as a Google Form.
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com
 * 2. Click "New project"
 * 3. Delete any existing code in the editor
 * 4. Paste this entire file into the editor
 * 5. Click the "Run" button (or Run > Run function > createSylvanHillsSurvey)
 * 6. Authorize the script when prompted (it needs permission to create forms)
 * 7. Check the Logs (View > Logs) for the link to your new form
 */

function createSylvanHillsSurvey() {
  var form = FormApp.create('Sylvan Hills — Market Demand Validation Survey');
  form.setDescription(
    'Thanks for taking a few minutes to share your perspective on men\'s clothing. ' +
    'Your answers will directly shape a new brand being built from the ground up.\n\n' +
    'This survey is anonymous and should take about 6–8 minutes.'
  );
  form.setIsQuiz(false);
  form.setAllowResponseEdits(false);
  form.setCollectEmail(false);
  form.setProgressBar(true);

  // ===========================
  // SECTION 1: About You
  // ===========================
  form.addSectionHeaderItem()
    .setTitle('About You')
    .setHelpText('A few quick questions to understand who you are.');

  // Q1
  form.addMultipleChoiceItem()
    .setTitle('What is your age range?')
    .setChoiceValues(['18–24', '25–30', '31–37', '38–45', '46–55', '56+'])
    .setRequired(true);

  // Q2
  form.addMultipleChoiceItem()
    .setTitle('Which best describes your professional world?')
    .setChoices([
      form.addMultipleChoiceItem().createChoice('Creative / Design / Arts'),
      form.addMultipleChoiceItem().createChoice('Tech / Startup / Founder'),
      form.addMultipleChoiceItem().createChoice('Finance / Consulting / Corporate'),
      form.addMultipleChoiceItem().createChoice('Skilled Trade / Hands-On Work'),
      form.addMultipleChoiceItem().createChoice('Education / Nonprofit'),
      form.addMultipleChoiceItem().createChoice('Self-employed / Freelance'),
    ].concat([form.addMultipleChoiceItem().createChoice('Other')]))
    .setRequired(true);

  // Hmm, the above approach with createChoice on new items won't work properly.
  // Let me restructure the entire script properly.

  Logger.log('Script started — building form...');

  // Actually, let me delete the form and start fresh with correct API usage.
  DriveApp.getFileById(form.getId()).setTrashed(true);

  buildForm();
}

function buildForm() {
  var form = FormApp.create('Sylvan Hills — Market Demand Validation Survey');
  form.setDescription(
    'Thanks for taking a few minutes to share your perspective on men\'s clothing. ' +
    'Your answers will directly shape a new brand being built from the ground up.\n\n' +
    'This survey is anonymous and should take about 6–8 minutes.'
  );
  form.setIsQuiz(false);
  form.setAllowResponseEdits(false);
  form.setCollectEmail(false);
  form.setProgressBar(true);

  // ===========================
  // SECTION 1: About You
  // ===========================
  form.addSectionHeaderItem()
    .setTitle('Section 1: About You');

  // Q1 — Age range
  form.addMultipleChoiceItem()
    .setTitle('What is your age range?')
    .setChoiceValues(['18–24', '25–30', '31–37', '38–45', '46–55', '56+'])
    .setRequired(true);

  // Q2 — Professional world
  var q2 = form.addMultipleChoiceItem()
    .setTitle('Which best describes your professional world?')
    .setRequired(true);
  q2.setChoices([
    q2.createChoice('Creative / Design / Arts'),
    q2.createChoice('Tech / Startup / Founder'),
    q2.createChoice('Finance / Consulting / Corporate'),
    q2.createChoice('Skilled Trade / Hands-On Work'),
    q2.createChoice('Education / Nonprofit'),
    q2.createChoice('Self-employed / Freelance'),
    q2.createChoice('Other')
  ]);
  form.addParagraphTextItem()
    .setTitle('If you selected "Other" above, please specify:')
    .setRequired(false);

  // Q3 — Approach to dressing
  form.addMultipleChoiceItem()
    .setTitle('How would you describe your approach to getting dressed?')
    .setChoiceValues([
      'I put real thought into what I wear — it\'s part of how I express myself',
      'I want to look good but keep it simple — I don\'t overthink it',
      'I stick to what works and rarely change things up',
      'I\'m still figuring out my personal style'
    ])
    .setRequired(true);

  // ===========================
  // SECTION 2: How You Shop Today
  // ===========================
  form.addPageBreakItem()
    .setTitle('Section 2: How You Shop Today');

  // Q4 — Where do you buy clothing
  var q4 = form.addCheckboxItem()
    .setTitle('Where do you currently buy most of your clothing? (Select up to 3)')
    .setRequired(true);
  q4.setChoices([
    q4.createChoice('Fast fashion (Zara, H&M, Uniqlo, etc.)'),
    q4.createChoice('Mall brands (J.Crew, Banana Republic, Club Monaco, etc.)'),
    q4.createChoice('Premium / contemporary brands (Reiss, COS, Todd Snyder, etc.)'),
    q4.createChoice('Designer / luxury (Loro Piana, Brunello Cucinelli, Aimé Léon Dore, etc.)'),
    q4.createChoice('Thrift / vintage / secondhand'),
    q4.createChoice('Direct-to-consumer online brands'),
    q4.createChoice('Other')
  ]);
  // Validation: limit to 3 selections
  q4.setValidation(FormApp.createCheckboxValidation()
    .requireSelectAtMost(3)
    .build());

  // Q5 — Spend on jacket
  form.addMultipleChoiceItem()
    .setTitle('How much do you typically spend on a single jacket or outerwear piece?')
    .setChoiceValues([
      'Under $75',
      '$75–$150',
      '$150–$250',
      '$250–$400',
      '$400+'
    ])
    .setRequired(true);

  // Q6 — Purchase frequency
  form.addMultipleChoiceItem()
    .setTitle('How often do you buy new clothing?')
    .setChoiceValues([
      'Weekly',
      'A few times a month',
      'Once a month',
      'A few times a year',
      'Rarely — only when I need to replace something'
    ])
    .setRequired(true);

  // Q7 — What matters most (ranking)
  form.addSectionHeaderItem()
    .setTitle('')
    .setHelpText('For the next question, rank your top 3 priorities when shopping for clothing (1 = most important).');

  form.addMultipleChoiceItem()
    .setTitle('Most important (#1) when shopping for clothing:')
    .setChoiceValues([
      'Fit and comfort',
      'Quality of materials and construction',
      'Price / value for money',
      'Style and aesthetic',
      'Versatility (works across multiple settings)',
      'Brand reputation or story',
      'Sustainability and ethical production',
      'Uniqueness — I don\'t want to look like everyone else'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Second most important (#2) when shopping for clothing:')
    .setChoiceValues([
      'Fit and comfort',
      'Quality of materials and construction',
      'Price / value for money',
      'Style and aesthetic',
      'Versatility (works across multiple settings)',
      'Brand reputation or story',
      'Sustainability and ethical production',
      'Uniqueness — I don\'t want to look like everyone else'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Third most important (#3) when shopping for clothing:')
    .setChoiceValues([
      'Fit and comfort',
      'Quality of materials and construction',
      'Price / value for money',
      'Style and aesthetic',
      'Versatility (works across multiple settings)',
      'Brand reputation or story',
      'Sustainability and ethical production',
      'Uniqueness — I don\'t want to look like everyone else'
    ])
    .setRequired(true);

  // ===========================
  // SECTION 3: Pain Points
  // ===========================
  form.addPageBreakItem()
    .setTitle('Section 3: Pain Points');

  // Q8 — Frustrations
  var q8 = form.addCheckboxItem()
    .setTitle('What frustrates you most about shopping for men\'s clothing today? (Select all that apply)')
    .setRequired(true);
  q8.setChoices([
    q8.createChoice('Most clothes feel generic — nothing stands out'),
    q8.createChoice('Quality doesn\'t match the price'),
    q8.createChoice('Hard to find pieces that work across casual, social, and professional settings'),
    q8.createChoice('Sizing and fit are inconsistent across brands'),
    q8.createChoice('Everything feels trend-driven — I want something that lasts'),
    q8.createChoice('Brands don\'t feel authentic — marketing feels hollow'),
    q8.createChoice('Limited options for men who care about style but aren\'t into "fashion"'),
    q8.createChoice('I don\'t know where to find brands that match my taste'),
    q8.createChoice('Other')
  ]);

  // Q9 — Last disappointing purchase
  form.addParagraphTextItem()
    .setTitle('Think about the last time you were disappointed by a clothing purchase. What happened?')
    .setRequired(false);

  // Q10 — Missing garment
  form.addParagraphTextItem()
    .setTitle('Is there a type of garment or piece you\'ve been looking for but haven\'t been able to find?')
    .setRequired(false);

  // ===========================
  // SECTION 4: Style & Values
  // ===========================
  form.addPageBreakItem()
    .setTitle('Section 4: Style & Values');

  // Q11 — Style gravitation
  form.addMultipleChoiceItem()
    .setTitle('Which phrase best describes the style you gravitate toward?')
    .setChoiceValues([
      'Clean, minimal, and understated',
      'Bold, expressive, and fashion-forward',
      'Rugged, functional, and utilitarian',
      'Classic, tailored, and refined',
      'Relaxed, effortless, and comfortable',
      'A mix that\'s hard to define — I take from different worlds'
    ])
    .setRequired(true);

  // Q12 — Brand identity importance
  form.addMultipleChoiceItem()
    .setTitle('How important is it that a brand has a clear identity and story behind it?')
    .setChoiceValues([
      'Very important — I want to connect with what a brand stands for',
      'Somewhat important — it\'s a nice bonus but not a dealbreaker',
      'Not important — I just care about the product itself'
    ])
    .setRequired(true);

  // Q13 — Sustainability
  form.addMultipleChoiceItem()
    .setTitle('How much does sustainability or ethical production factor into your purchasing decisions?')
    .setChoiceValues([
      'It\'s a top priority — I actively seek out responsible brands',
      'I prefer it when possible, but it\'s not the deciding factor',
      'I don\'t think about it much',
      'It doesn\'t factor into my decisions'
    ])
    .setRequired(true);

  // Q14 — Wardrobe philosophy
  form.addMultipleChoiceItem()
    .setTitle('Which of these statements resonates with you most?')
    .setChoiceValues([
      'I\'d rather own fewer, higher-quality pieces than a full closet of average ones',
      'I like having a lot of options and variety in my wardrobe',
      'I want a reliable uniform — a few go-to pieces I can always count on',
      'I\'m still building my wardrobe and open to experimenting'
    ])
    .setRequired(true);

  // ===========================
  // SECTION 5: Concept Reaction
  // ===========================
  form.addPageBreakItem()
    .setTitle('Section 5: Brand Concept')
    .setHelpText(
      'Please read the following brand description before answering:\n\n' +
      '"Sylvan Hills is a menswear brand creating timeless, refined garments for men who are ' +
      'done chasing trends and ready to dress from their own quiet confidence. We sit at the ' +
      'intersection of American ease and Italian restraint — relaxed silhouettes with disciplined ' +
      'tailoring, made from natural fabrics that get better with time. We make fewer things, better."'
    );

  // Q15 — Interest level
  form.addMultipleChoiceItem()
    .setTitle('After reading that description, how interested are you in learning more about this brand?')
    .setChoiceValues([
      'Very interested — this speaks directly to me',
      'Somewhat interested — I\'d want to see the product first',
      'Neutral — interesting but I\'m not sure it\'s for me',
      'Not very interested',
      'Not interested at all'
    ])
    .setRequired(true);

  // Q16 — What stood out
  form.addParagraphTextItem()
    .setTitle('What specifically stood out to you about that description — positively or negatively?')
    .setRequired(false);

  // Q17 — Market gap
  form.addMultipleChoiceItem()
    .setTitle('Does this brand feel like it fills a gap in the market that isn\'t currently being served?')
    .setChoiceValues([
      'Yes — I\'ve been looking for something like this',
      'Somewhat — there are similar brands but this feels different',
      'Not really — this sounds like brands that already exist',
      'No — I don\'t see a gap here'
    ])
    .setRequired(true);

  // Q18 — Brand comparisons
  form.addParagraphTextItem()
    .setTitle('Which existing brands, if any, does this remind you of?')
    .setRequired(false);

  // ===========================
  // SECTION 6: Product Interest
  // ===========================
  form.addPageBreakItem()
    .setTitle('Section 6: Product Interest')
    .setHelpText(
      'Our debut piece is a hybrid jacket that merges the refined, architectural silhouette of a Nehru ' +
      'jacket with the relaxed, functional feel of a chore coat. Designed to move seamlessly from day to ' +
      'night — structured enough to feel intentional, comfortable enough to reach for every day. Made from ' +
      'natural fabrics that age beautifully.'
    );

  // Q19 — Jacket appeal
  form.addMultipleChoiceItem()
    .setTitle('How appealing is this jacket concept to you?')
    .setChoiceValues([
      'Very appealing — I would want to own this',
      'Somewhat appealing — I\'d need to see and feel it first',
      'Neutral',
      'Not very appealing',
      'Not appealing at all'
    ])
    .setRequired(true);

  // Q20 — Purchase likelihood at price
  form.addMultipleChoiceItem()
    .setTitle('At a retail price of $195–$325, how likely would you be to purchase this jacket?')
    .setChoiceValues([
      'Very likely — that feels right for what\'s described',
      'Likely — if the quality and fit deliver',
      'Unsure — I\'d need to see it in person or learn more',
      'Unlikely — that\'s more than I\'d spend on a jacket',
      'Very unlikely'
    ])
    .setRequired(true);

  // Q21 — Purchase confidence drivers
  var q21 = form.addCheckboxItem()
    .setTitle('What would make you confident enough to buy from a new brand at this price point? (Select all that apply)')
    .setRequired(true);
  q21.setChoices([
    q21.createChoice('Seeing detailed photos and fabric close-ups'),
    q21.createChoice('Customer reviews and testimonials'),
    q21.createChoice('A clear return / exchange policy'),
    q21.createChoice('Seeing the garment on different body types'),
    q21.createChoice('Understanding how and where it\'s made'),
    q21.createChoice('A recommendation from someone I trust'),
    q21.createChoice('Trying it in person (pop-up, showroom, etc.)'),
    q21.createChoice('A limited introductory offer or early-access price'),
    q21.createChoice('Other')
  ]);

  // ===========================
  // SECTION 7: Staying Connected
  // ===========================
  form.addPageBreakItem()
    .setTitle('Section 7: Staying Connected');

  // Q22 — Early access interest
  var q22 = form.addMultipleChoiceItem()
    .setTitle('Would you be interested in joining an early access list to see the first collection before it launches?')
    .setRequired(true);

  // We'll create a page break for the conditional follow-up
  var contactPage = form.addPageBreakItem()
    .setTitle('Stay in Touch');

  var skipPage = form.addPageBreakItem()
    .setTitle('Final Thoughts');

  // Set up navigation: Yes -> contactPage, Maybe/No -> skipPage
  q22.setChoices([
    q22.createChoice('Yes — sign me up', contactPage),
    q22.createChoice('Maybe — I\'d like to follow along first', contactPage),
    q22.createChoice('No thanks', skipPage)
  ]);

  // Q23 — Preferred contact method (on contactPage)
  form.addMultipleChoiceItem()
    .setTitle('What\'s the best way to reach you?')
    .setChoiceValues(['Email', 'Instagram', 'Text / SMS', 'TikTok'])
    .setRequired(false);

  // Q24 — Earning trust (on finalPage, but we need to navigate there)
  // Add the final page break to collect last questions
  // skipPage already exists — both paths converge here via navigation

  // Q24 — Earning trust
  form.addParagraphTextItem()
    .setTitle('What\'s one thing a new menswear brand could do to earn your trust and your first purchase?')
    .setRequired(false);

  // Q25 — Open feedback
  form.addParagraphTextItem()
    .setTitle('Is there anything else you\'d like to share about what you look for in clothing or what\'s missing from the market today?')
    .setRequired(false);

  // Set confirmation message
  form.setConfirmationMessage(
    'Thank you for sharing your perspective. Your input is shaping something meaningful.\n\n' +
    '— Sylvan Hills'
  );

  // Log the URLs
  Logger.log('============================================');
  Logger.log('FORM CREATED SUCCESSFULLY');
  Logger.log('============================================');
  Logger.log('Edit URL:    ' + form.getEditUrl());
  Logger.log('Share URL:   ' + form.getPublishedUrl());
  Logger.log('============================================');

  return form;
}
