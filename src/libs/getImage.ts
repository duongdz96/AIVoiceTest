const images = {
  imageBackgroundApp: require('~/resources/images/imageBackgroundApp.png'),
  imageIconHome: require('~/resources/images/Home/ImageIconHome.png'),
  imageHeader: require('~/resources/images/Home/ImageHeader.png'),
  imageBg: require('~/resources/images/Home/ImageBg.png'),
  slideHome1: require('~/resources/images/Home/slide/ImageSlide1.png'),
  slideHome2: require('~/resources/images/Home/slide/ImageSlide2.png'),
  slideHome3: require('~/resources/images/Home/slide/ImageSlide3.png'),
  slideHome4: require('~/resources/images/Home/slide/ImageSlide4.png'),
  ImageTicketLeft: require('~/resources/images/Home/ImageTicketLeft.png'),
  ImageTicketRight: require('~/resources/images/Home/ImageTicketRight.png'),
  SlidePremium1: require('~/resources/images/Premium/SlidePremium1.png'),
  SlidePremium2: require('~/resources/images/Premium/SlidePremium2.png'),
  SlidePremium3: require('~/resources/images/Premium/SlidePremium3.png'),
  SlidePremium4: require('~/resources/images/Premium/SlidePremium4.png'),
  SlidePremium5: require('~/resources/images/Premium/SlidePremium5.png'),
  SlidePremium6: require('~/resources/images/Premium/SlidePremium6.png'),
  SlidePremium7: require('~/resources/images/Premium/SlidePremium7.png'),
  SlidePremium8: require('~/resources/images/Premium/SlidePremium8.png'),
  SlidePremium9: require('~/resources/images/Premium/SlidePremium9.png'),
  SlidePremium10: require('~/resources/images/Premium/SlidePremium10.png'),
  SlidePremium11: require('~/resources/images/Premium/SlidePremium11.png'),
  SlidePremium12: require('~/resources/images/Premium/SlidePremium12.png'),
  BgPremium: require('~/resources/images/Premium/BgPremium.png'),
  loadingBackground: require('~/resources/images/Home/loadingBackground.png'),
  //animation
  homeAnimate: require('~/resources/json/homeAnimation.json'),
  moon: require('~/resources/json/moon.json'),
  profile: require('~/resources/json/profile.json'),
  moon2: require('~/resources/json/music.json'),
  voidTab: require('~/resources/images/BottomTabImage/voidTab.png'),
  history: require('~/resources/json/history.json'),
  voiceRecord: require('~/resources/animation/voiceRecord.json'),

  //createnewvoice
  backgroundCreateNewVoice: require('~/resources/images/CreateVoice/backgroundCreateVoice.png'),

  thumbImage: require('~/resources/images/ThumbImage.png'),

  //Logo
  Logo: require('~/resources/images/Logo.png'),
  AiVoice: require('~/resources/images/Aivoice.png'),
  VoiceFirst: require('~/resources/images/VoiceFirst.png'),
  Voice: require('~/resources/images/FirstOnboarding/Voice.png'),
  IconVoice: require('~/resources/images/FirstOnboarding/IconVoice.png'),
  VoiceIcon1: require('~/resources/images/FirstOnboarding/VoiceIcon1.png'),
  VoiceIcon2: require('~/resources/images/FirstOnboarding/VoiceIcon2.png'),
  VoiceIcon3: require('~/resources/images/FirstOnboarding/VoiceIcon3.png'),
  TitleVoice: require('~/resources/images/Onborading/titleVoice.png'),
  TitleLast: require('~/resources/images/LastOnBoarding/title.png'),
  LogoBackground: require('~/resources/images/LastOnBoarding/ImageLogo.png'),
  time: require('~/resources/images/LastOnBoarding/time.png'),
  song: require('~/resources/images/LastOnBoarding/song.png'),

  //TexToVoice
  USAFlag: require('~/resources/images/TextToVoice/USA.png'),

  // select language voice
  cantonese: require('~/resources/images/SelectLanguageVoice/cantonese.png'),
  china: require('~/resources/images/SelectLanguageVoice/china.png'),
  germany: require('~/resources/images/SelectLanguageVoice/germany.png'),
  hindi: require('~/resources/images/SelectLanguageVoice/hindi.png'),
  japan: require('~/resources/images/SelectLanguageVoice/japan.png'),
  singapore: require('~/resources/images/SelectLanguageVoice/singapore.png'),
  taiwan: require('~/resources/images/SelectLanguageVoice/taiwan.png'),
  uk: require('~/resources/images/SelectLanguageVoice/uk.png'),
  England: require('~/resources/images/TextToVoice/ENGLAND.png'),
  China: require('~/resources/images/TextToVoice/CHINA.png'),
  Germany: require('~/resources/images/TextToVoice/GERMANY.png'),
  Hongkong: require('~/resources/images/TextToVoice/HONGKONG.png'),
  India: require('~/resources/images/TextToVoice/INDIA.png'),
  Japan: require('~/resources/images/TextToVoice/JAPAN.png'),
  Singapore: require('~/resources/images/TextToVoice/SINGAPORE.png'),
  Taiwan: require('~/resources/images/TextToVoice/TAIWAN.png'),

  //SearchVoice
  Taylor: require('~/resources/images/SearchVoice/Taylor.png'),
  Trump: require('~/resources/images/SearchVoice/DonaldTrump.png'),
  Adele: require('~/resources/images/SearchVoice/adele.png'),
  Simpson: require('~/resources/images/SearchVoice/simpson.png'),
  TheRock: require('~/resources/images/SearchVoice/therock.png'),
  TonyStark: require('~/resources/images/SearchVoice/TonyStark.png'),
  Ariel: require('~/resources/images/SearchVoice/ariel.png'),
  Eilish: require('~/resources/images/SearchVoice/ellish.png'),
  Ariana: require('~/resources/images/SearchVoice/Ariana.png')
};

export default (imageName: keyof typeof images) => {
  return images[imageName];
};
