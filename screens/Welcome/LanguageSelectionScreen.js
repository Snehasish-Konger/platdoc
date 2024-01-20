import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView,Image, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../constants";
// Define the languages, scripts, and translations for the title, subtitle, and accept button
const languageData = {
  en: {
    label: 'English',
    title: 'Welcome!',
    subtitle: 'Select your PlantDoc language',
    script: 'Learn farming in your language',
    termsText: 'By tapping Accept, you agree to the Terms of Service and Privacy Policy',
    accept: 'Accept',
  },
  hi: {
    label: 'हिन्दी',
    title: 'स्वागत है!',
    subtitle: 'अपनी प्लांटडॉक भाषा चुनें',
    script: 'अपनी भाषा में खेती सीखें',
    termsText: 'स्वीकार करके, आप सेवा की शर्तों और गोपनीयता नीति से सहमत होते हैं',
    accept: 'स्वीकार करें',
  },
  bn: {
    label: 'বাংলা',
    title: 'নমস্কার!',
    subtitle: 'আপনার প্লান্টডক ভাষা নির্বাচন করুন',
    script: 'আপনার ভাষায় কৃষি শিক্ষা',
    termsText: 'গ্রহণ করে, আপনি সেবা পরিষেবার শর্তাদি এবং গোপনীয়তা নীতি সম্পর্কে সম্মত হন',
    accept: 'গ্রহণ করুন',
  },
  te: {
    label: 'తెలుగు',
    title: 'స్వాగతం!',
    subtitle: 'మీ ప్లాంట్‌డాక్ భాషను ఎంచుకోండి',
    script: 'మీ భాషలో వ్యవసాయం నేర్చుకోండి',
    termsText: 'అంగీకరించినప్పుడు, మీరు సేవా నిబంధనలు మరియు గోప్యతా నియమాలను అంగీకరిస్తారు',
    accept: 'అంగీకరించు',
  },
  mr: {
    label: 'मराठी',
    title: 'स्वागत आहे!',
    subtitle: 'आपली प्लांटडॉक भाषा निवडा',
    script: 'आपल्या भाषेतून शेती शिका',
    termsText: 'स्वीकार करून, आपण सेवा शर्ती आणि गोपनीयता धोरणांच्या सहमत आहात',
    accept: 'स्वीकारा',
  },
  ta: {
    label: 'தமிழ்',
    title: 'வரவேற்கிறேன்!',
    subtitle: 'உங்கள் பிளாண்ட்டாக் மொழியை தேர்ந்தெடுக்கவும்',
    script: 'உங்கள் மொழியில் விவசாயம் கற்றுக்கொள்ளுங்கள்',
    termsText: 'ஏற்கனவே ஏற்கனவே, நீங்கள் சேவை விதிமுறைகளையும் தனியுரிமை கொள்கையையும் ஏற�� ஒப்புக்கொள்கிறீர்கள்',
    accept: 'ஏற்றுக்கொள்',
  },
  gu: {
    label: 'ગુજરાતી',
    title: 'સ્વાગત છે!',
    subtitle: 'તમારી પ્લાંટડોક ભાષા પસંદ કરો',
    script: 'તમારી ભાષામાં ખેતી શીખો',
    termsText: 'સ્વીકારો પર ક્લિક કરીને, તમે સેવાની શરતો અને ગોપનીયતા નીતિને સ્વીકારો છો',
    accept: 'સ્વીકારો',
  },
  kn: {
    label: 'ಕನ್ನಡ',
    title: 'ಸ್ವಾಗತ',
    subtitle: 'ನಿಮ್ಮ ಪ್ಲಾಂಟ್‌ಡಾಕ್ ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
    script: 'ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಕೃಷಿ ಕಲಿಯಿರಿ',
    termsText: 'ಸ್ವೀಕರಿಸುವುದರ ಮೂಲಕ, ನೀವು ಸೇವೆಯ ನಿಬಂಧನೆಗಳನ್ನು ಮತ್ತು ಗೌಪ್ಯತಾ ನೀತಿಯನ್ನು ಒಪ್ಪುತ್ತೀರಿ',
    accept: 'ಒಪ್ಪಿಗೆ',
  },
  ml: {
    label: 'മലയാളം',
    title: 'സ്വാഗതം!',
    subtitle: 'നിങ്ങളുടെ പ്ലാന്റ്‌ഡോക് ഭാഷ തിരഞ്ഞെടുക്കുക',
    script: 'നിങ്ങളുടെ ഭാഷയിൽ കൃഷി പഠിക്കുക',
    termsText: 'സ്വീകരിക്കുന്നതിന്, നിങ്ങൾ സേവന നിബന്ധനകൾ മറ്റും സ്വകാര്യത നയങ്ങൾ അംഗീകരിക്കുന്നു',
    accept: 'സ്വീകരിക്കുക',
  },
  pa: {
    label: 'ਪੰਜਾਬੀ',
    title: 'ਜੀ ਆਇਆਂ ਨੂੰ!',
    subtitle: 'ਆਪਣੀ ਪ੍ਲਾਂਟਡੋਕ ਭਾਸ਼ਾ ਚੁਣੋ',
    script: 'ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਖੇਤੀ ਸਿੱਖੋ',
    termsText: 'ਸਵੀਕਾਰ ਕਰਨ ਨਾਲ, ਤੁਸੀਂ ਸੇਵਾ ਦੀ ਸ਼ਰਤਾਂ ਅਤੇ ਗੋਪਨੀਯਤਾ ਨੀਤੀ ਨਾਲ ਸਹਿਮਤ ਹੁੰਦੇ ਹੋ',
    accept: 'ਮਨਜ਼ੂਰ ਹੈ',
  },
  or: {
    label: 'ଓଡ଼ିଆ',
    title: 'ସ୍ୱାଗତ!',
    subtitle: 'ଆପଣଙ୍କ ପ୍ଲାଂଟଡକ୍ ଭାଷା ଚୟନ କରନ୍ତୁ',
    script: 'ଆପଣଙ୍କ ଭାଷାରେ ଚାଷ ଶିଖନ୍ତୁ',
    termsText: 'ଗ୍ରହଣ କରିବାରେ, ଆପଣ ସେବା ଶର୍ତାବଳୀ ଏବଂ ଗୋପନୀୟତା ନୀତିର ସହମତ ହେଉଛନ୍ତି',
    accept: 'ଗ୍ରହଣ କରନ୍ତୁ',
  },
  as: {
    label: 'অসমীয়া',
    title: 'স্বাগতম!',
    subtitle: 'আপোনাৰ প্লান্টডক ভাষা নিৰ্বাচন কৰক',
    script: 'আপোনাৰ ভাষাত কৃষি শিকা',
    termsText: 'গ্ৰহণ কৰিবলৈ, আপুনি সেৱাৰ শৰ্তাবলী আৰু গোপনীয়তা নীতি সম্পৰ্কে সম্মত হৈ থাকিবলৈ আগ্ৰহী হৈ থাকিব',
    accept: 'গ্রহণ কৰা',
  },
  ma: {
    label: 'मैथिली',
    title: 'स्वागत अछि!',
    subtitle: 'अपन प्लांटडॉक भाषा चुनु',
    script: 'अपन भाषा में कृषि सीखु',
    termsText: 'स्वीकार करब बाटे, तरफ से आप सेवा की शर्तें और गोपनीयता नीति से सहमत होखे',
    accept: 'स्वीकार करू',
  },
  ks: {
    label: 'कॉशुर / कश्मीरी',
    title: 'खूश आमदीद!',
    subtitle: 'आपुज प्लांटडॉक भाषा तय करुन छु',
    script: 'अपनै भाषाये पैथी कृषि सिख',
    termsText: 'स्वीकार करण्याबाबत, तुम्ही सेवा शर्ती आणि गोपनीयता धोरणांच्या सहमत आहात',
    accept: 'मंज़ूर करुन',
  },
  ne: {
    label: 'नेपाली',
    title: 'स्वागत छ!',
    subtitle: 'तपाईंको प्लान्टडक भाषा छान्नुहोस्',
    script: 'तपाईंको भाषामा कृषि सिक्नुहोस्',
    termsText: 'स्वीकार गर्नुहोस्, तपाईं सेवा शर्तहरू र गोपनीयता नीतिबाट सहमत छन्',
    accept: 'स्वीकार गर्नुहोस्',
  },
  sd: {
    label: 'सिंधी',
    title: 'سواگت آهيان!',
    subtitle: 'तव्हां जो प्लान्टडॉक भाषा چوंदڙ',
    script: 'तव्हां जी भाषा ۾ پيو پٿائڻ جو سيڪو',
    termsText: 'قبول ڪرڻ جي واسطي، توهان پيو پٿائڻ جي شرائط ۽ پرائيويسي پاليسي سان موافقت ڪريو',
    accept: 'ڀلي ڪريو',
  },
  sa: {
    label: 'संस्कृतम्',
    title: 'स्वागतम्!',
    subtitle: 'तव प्लांटडॉक भाषा चिन्तयतु',
    script: 'तव भाषया कृषिः सीखतु',
    termsText: 'स्वीकुर्वन्तु, त्वं सेवायाः शर्तान् गोपनीयतायाश्च सम्मतः भविष्यति',
    accept: 'गृहणामि',
  },
  ur: {
    label: 'اردو',
    title: 'خوش آمدید!',
    subtitle: 'آپ کی پلانٹڈاک زبان منتخب کریں',
    script: 'آپ کی زبان میں زراعت سیکھیں',
    termsText: 'قبول کرنے سے، آپ سروس کی شرائط اور پرائیویسی پالیسی سے متفق ہوتے ہیں',
    accept: 'قبول کریں',
  },
  // ... Add other Indian languages here
};

// The rest of the code remains the same.



const LanguageSelectionScreen = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    // Here you would also update the i18n language setting
    // i18n.changeLanguage(langCode);
  };

  const currentLanguageData = languageData[selectedLanguage];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <Image source={require("../../assets/logo.png")} style={{width:100,height:100}}/>
        <Text style={styles.title}>{currentLanguageData.title}</Text>
      </View>
        <Text style={styles.subtitle}>{currentLanguageData.subtitle}</Text>
      <ScrollView style={styles.container}>
        {Object.entries(languageData).map(([code, { label, script }]) => (
          <TouchableOpacity
            key={code}
            style={[styles.languageItem, selectedLanguage === code && styles.selectedLanguageItem]}
            onPress={() => handleLanguageSelect(code)}
          >
            <View style={styles.languageTextContainer}>
              <Text style={styles.languageLabel}>{label}</Text>
              <Text style={styles.languageScript}>{script}</Text>
            </View>
            {selectedLanguage === code && <View style={styles.selectedIndicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate("PermissionScreen")}>
          <Text style={styles.acceptButtonText}>{currentLanguageData.accept}</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          {currentLanguageData.termsText}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Or any other background color you want for the safe area
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#ccc',
  },
  selectedLanguageItem: {
    backgroundColor: '#e4fcdb' , // Color for the selected language item
  },
  languageTextContainer: {
    flex: 1,
  },
  languageLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  languageScript: {
    fontSize: 16,
    color: '#666',
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'limegreen', // Color for the selected indicator
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2fdef', // Light grey background for the footer
    padding: 16,
  },
  acceptButton: {
    backgroundColor: 'green', // Color for the accept button
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  // ... (other styles remain unchanged)
});

export default LanguageSelectionScreen;
