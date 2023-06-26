import React from 'react';
import {useSelector} from 'react-redux';
import {mail} from './images/mail';
import {phone} from './images/phone';
import {web} from './images/web';
import {resumeStyle} from './resumeStyle';
// import TemplateHeader from './TemplateHeader'
import TemplateItem from './TemplateItem';

const Template1 = props => {
  const viewFlags = useSelector(state => state.profile.viewFlags);

  const {
    hasPersonalInfo,
    hasStoryInfo,
    hasSocialMedia,
    hasSkillsData,
    hasEducation,
    hasWorkExperience,
    hasCertificates,
    hasAwardsAndHonors,
    hasLanguages,
    hasLicenses,
    hasCustomSections,
  } = viewFlags;

  console.log('[Template1.js] Flags : ', viewFlags);

  const personalInfo = useSelector(state => state.profile.profilePersonalInfo);
  const profileSocialMedia = useSelector(
    state => state.profile.profileSocialMedia,
  );
  const profileStory = useSelector(state => state.profile.profileStory);
  const education = useSelector(state => state.profile.profileEducation);
  const skills = useSelector(state => state.profile.profileSkills);
  const certificates = useSelector(state => state.profile.profileCertificates);
  const languages = useSelector(state => state.profile.profileLanguages);
  const licenses = useSelector(state => state.profile.profileLicenses);
  const customSections = useSelector(
    state => state.profile.profileCustomSections,
  );
  const experiences = useSelector(state => state.profile.profileExperiences);
  const profileAwardsAndHonorsList = useSelector(
    state => state.profile.profileAwardsAndHonorsList,
  );

  let userImage = '';
  let userName = '';
  let jobTitle = '';
  let introduction = '';

  let addressView = '';
  let websiteView = '';
  let phoneNumberView = '';
  let emailView = '';
  let linkedInView = '';

  if (personalInfo !== null) {
    userImage = personalInfo.imageURL;
    userName = `${personalInfo.firstName} ${personalInfo.lastName}`;
    jobTitle = personalInfo.designation;

    const address = personalInfo.address;
    addressView =
      address !== null
        ? `
                <div class="addressDiv resumeColumn30 resumeColumn20-md resumeColumn100-sm paddingZero-xs">
                    <h2 class="paragraphStyle color--brandBlue">Address</h2>
                    <div class="bottomBorderStyle bg--coral"></div>
                    <p class="paragraphStyle color--textLightGrey mt10">
                        ${address.addressLine1 + ',<br>'} ${
            address.addressLine2
          }<br>
                        ${address.city}, ${address.state}, ${
            address.country
          }, ${address.postalCode}
                    </p>
                </div>
                `
        : '';

    phoneNumberView =
      personalInfo.primaryPhone !== ''
        ? `
            <div class="contactInfo__inner__item displayFlex alignItemsCenter justifyContentCenter">
                <div class="circularIcon bg--brandBlue borderRadius100">
                    <img src=${phone} alt="Phone">
                </div>
                <div class="titleAndText paragraphStyle">
                    <span class="color--brandBlue displayBlock">Phone</span>
                    <span class="color--textLightGrey displayBlock">${personalInfo.primaryCountryCode.dial_code} ${personalInfo.primaryPhone}</span>
                </div>
            </div>
        `
        : '';

    emailView =
      personalInfo.email !== ''
        ? `
            <div class="contactInfo__inner__item displayFlex alignItemsCenter justifyContentCente">
                <div class="circularIcon bg--brandBlue borderRadius100">
                    <img src=${mail} alt="email">
                </div>
                <div class="titleAndText paragraphStyle">
                    <span class="color--brandBlue displayBlock">Email</span>
                    <span class="color--textLightGrey displayBlock">${personalInfo.email}</span>
                </div>
            </div>
        `
        : '';
  }

  if (profileStory !== '') {
    introduction = `
            <div class="userAvatarAndIntro__intro">
                <h2 class="paragraphStyle color--coral">Introduction</h2>
                <p class="paragraphStyle color--textLightGrey mt10">
                    ${profileStory}
                </p>
            </div>
        `;
  }

  if (profileSocialMedia !== null) {
    websiteView =
      profileSocialMedia.website !== ''
        ? `
            <div class="contactInfo__inner__item displayFlex alignItemsCenter justifyContentCente">
                <div class="circularIcon bg--brandBlue borderRadius100">
                    <img src=${web} alt="email">
                </div>
                <div class="titleAndText paragraphStyle">
                    <span class="color--brandBlue displayBlock">Website</span>
                    <span class="color--textLightGrey displayBlock">${profileSocialMedia.website}</span>
                </div>
            </div>
        `
        : '';

    linkedInView =
      profileSocialMedia.linkedIn !== ''
        ? `
            <div class="contactInfo__inner__item displayFlex alignItemsCenter justifyContentCente">
                <div class="circularIcon bg--brandBlue borderRadius100">
                    <img src=${mail} alt="email">
                </div>
                <div class="titleAndText paragraphStyle">
                    <span class="color--brandBlue displayBlock">LinkedIn</span>
                    <span class="color--textLightGrey displayBlock">${profileSocialMedia.linkedIn}</span>
                </div>
            </div>
        `
        : '';
  }

  // experience setup
  let experienceString = '';
  experiences.forEach(it => {
    experienceString =
      experienceString +
      `
            <div class="displayFlex userAvatarAndIntro innerRow">
                <div class="yearsAndCompany">
                    <div class="year paragraphStyle color--brandBlue font--bold">${
                      it.startDate
                    }    -    ${it.isSelect ? 'Present' : it.endDate}</div>
                </div>
                <div class="userAvatarAndIntro__intro yearsAndCompanySummary">
                    <h2 class="paragraphStyle color--coral">${
                      it.employerName
                    }</h2>
                    <p class="paragraphStyle color--textLightGrey mt10">
                        ${it.jobTitle} <br>
                        ${it.description}
                    </p><br><br>
                </div>
            </div>
            `;
  });
  const experienceView =
    experiences.length > 0
      ? `
        <div class="resumeRow mt80 wrap-md resumeRow--2">
            <div class="resumeColumn30 resumeColumn100-md">
                <h2 class="heading2 color--brandBlue">Work <span class="blockSpan-lg">Experience</span></h2>
                <div class="bottomBorderStyle bg--coral"></div>
            </div>
            <div class="resumeColumn70 resumeColumn100-md border-top-Column">
                ${experienceString}
            </div>
        </div>
    `
      : '';

  let educationString = '';
  education.forEach(it => {
    educationString =
      educationString +
      `
            <div class="displayFlex userAvatarAndIntro innerRow">
                <div class="yearsAndCompany">
                    <div class="year paragraphStyle color--brandBlue font--bold">Complete On: ${it.graduatedYear}</div>
                   
                </div>
                <div class="userAvatarAndIntro__intro yearsAndCompanySummary">
                    <h2 class="paragraphStyle color--coral">${it.educationProgram}</h2>
                    <p class="paragraphStyle color--textLightGrey mt10">
                         ${it.educationType} <br> ${it.school}
                    </p>
                </div>
            </div>
        `;
  });
  const educationView =
    education.length > 0
      ? `
        <div class="resumeRow mt80 wrap-md resumeRow--2">
            <div class="resumeColumn30 resumeColumn100-md">
                <h2 class="heading2 color--brandBlue"><span class="blockSpan-lg">Education</span></h2>
                <div class="bottomBorderStyle bg--coral"></div>
            </div>
            <div class="resumeColumn70 resumeColumn100-md border-top-Column">
                ${educationString}
            </div>
        </div>
    `
      : '';

  const skillsHeading =
    skills!== null && skills.length > 0
      ? `  <div class="resumeColumn30 resumeColumn100-md">
            <h2 class="heading2 color--brandBlue">Skills & <span class="blockSpan-lg">Activities</span></h2>
            <div class="bottomBorderStyle bg--coral"></div>
        </div>`
      : '';

  // set up skills
  let resumeSkillsString = '';
  const primarySkills = skills!== null ? skills.primarySkills : [];
  primarySkills.forEach(it => {
    resumeSkillsString =
      resumeSkillsString +
      `
                    <span class="skillTags">
                        ${it}
                    </span>
        `;
  });
  const skillsView =
    primarySkills.length > 0
      ? `
            <div class="resumeColumn70__inneContainer100">
                <h3 class="heading3 color--brandBlue">Skills</h3>
                <div class="bottomBorderStyle bg--coral"></div>
                <div class="tagsHolder displayFlex flexWrap mt30">
                    ${resumeSkillsString}
                </div>
            </div>
        `
      : '';

  //set resume certificate view
  let certificateString = '';
  certificates.forEach(it => {
    certificateString =
      certificateString +
      `
                <span class="skillTags">
                    ${it.certificationName},  ${it.certificate} -  Expiry: ${it.expiryDate}
                </span>
        `;
  });
  const certificateView =
    certificates.length > 0
      ? `
        <div class="resumeColumn70__inneContainer100">
            <h3 class="heading3 color--brandBlue">Certifications</h3>
            <div class="bottomBorderStyle bg--coral"></div>
            <div class="tagsHolder displayFlex flexWrap mt30">
                ${certificateString}                      
            </div>
        </div>
    `
      : '';

  //set up languages
  let languageString = '';
  languages.forEach(it => {
    languageString =
      languageString +
      `
            <span class="skillTags">
                ${it.languagename}
            </span>
        `;
  });

  const languagesView =
    languages.length > 0
      ? `
        <div class="resumeColumn70__inneContainer100">
            <h3 class="heading3 color--brandBlue">Languages</h3>
            <div class="bottomBorderStyle bg--coral"></div>
            <div class="tagsHolder displayFlex flexWrap mt30">
                ${languageString}                      
            </div>
        </div>
    `
      : '';

  //set up license
  let licenseString = '';
  licenses.forEach(it => {
    licenseString =
      licenseString +
      `
             <span class="skillTags">
             ${it.licenseName}, #${it.license} -  Expiry: ${it.expiryDate}
             </span>
         `;
  });

  const licenseView =
    licenses.length > 0
      ? `
             <div class="resumeColumn70__inneContainer100">
                 <h3 class="heading3 color--brandBlue">Licenses</h3>
                 <div class="bottomBorderStyle bg--coral"></div>
                 <div class="tagsHolder displayFlex flexWrap mt30">
                     ${licenseString}                      
                 </div>
             </div>
     `
      : '';

  //project string
  let awardString = '';
  profileAwardsAndHonorsList.forEach((it, index) => {
    awardString =
      awardString +
      `
        <span class="skillTags">
            ${it.awardname}, #${it.IssuedBy} -  Expiry: ${it.issueddate}
        </span>
        `;
  });
  const awardsView =
    profileAwardsAndHonorsList.length > 0
      ? `
    <div class="resumeColumn70__inneContainer100">
        <h3 class="heading3 color--brandBlue">Awards And Honors</h3>
        <div class="bottomBorderStyle bg--coral"></div>
        <div class="tagsHolder displayFlex flexWrap mt30">
            ${awardString}                      
        </div>
    </div>
    `
      : '';

  //set references
  //     let referencesString = ''
  //     references.forEach(it => {
  //         if(it.should_available_on_request){
  //             referencesString = referencesString + `
  //                <div class="userAvatarAndIntro__intro yearsAndCompanySummary">
  //                    <h2 class="paragraphStyle color--coral">${it.relation}</h2>
  //                </div>
  //                <div class="yearsAndCompany">
  //                    <div class="year paragraphStyle color--brandBlue font--bold">${it.contact_person}</div>
  //                    <p class="color--textLightGrey paragraphStyle">
  //                        ${it.phone_number} - ${it.email}
  //                    </p>
  //                </div>
  //             `
  //         }
  //     })

  //    //  console.log('[Template2.js] references :',resumePreferences,referencesString)

  //     const referencesView = references.length > 0 ? `
  //        <div class="resumeRow mt80 wrap-md resumeRow--3">
  //            <div class="resumeColumn30 resumeColumn100-md">
  //                <h2 class="heading2 color--brandBlue">References</h2>
  //                <div class="bottomBorderStyle bg--coral"></div>
  //            </div>
  //            <div class="resumeColumn70 resumeColumn100-md border-top-Column">
  //                ${referencesString}
  //            </div>
  //        </div>
  //     ` : ''

  //set up custom sections
  let customSectionString = '';
  customSections.forEach(it => {
    customSectionString =
      customSectionString +
      `
             <div class="displayFlex userAvatarAndIntro innerRow">
                 <div class="userAvatarAndIntro__intro yearsAndCompanySummary">
                     <h2 class="paragraphStyle color--coral">${it.title}</h2>
                     <p class="paragraphStyle color--textLightGrey mt10">
                     ${it.subHeading} <br>
                     ${it.sampledesc}
                     </p>
                 </div>
             </div>
         `;
  });

  const customSectionsView =
    customSections.length > 0
      ? `
         <div class="resumeRow mt80 wrap-md resumeRow--3">
             <div class="resumeColumn30 resumeColumn100-md">
                 <h2 class="heading2 color--brandBlue">Custom <span class="blockSpan-lg">Section</span></h2>
                 <div class="bottomBorderStyle bg--coral"></div>
             </div>
             <div class="resumeColumn70 resumeColumn100-md border-top-Column">
                 ${customSectionString}
             </div>
         </div>
     `
      : '';

  const htmlCode = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${resumeStyle}
      </head>
      <body class="resumeTemplateBody">
        <main>
          <div class="resumeTemplateBody__inner resumeDocumentBody centerContainer-xxxl">
    
            <!-- header -->
            <div class="resumeDocumentBody__header position--relative beforeClass" style='margin:10px;padding:10px;width:100%'>
                <div class="resumeDocumentBody__header__inner">
                        ${
                          userImage !== ''
                            ? `<img src=${userImage} class="displayBlock-sm" alt="avatar">`
                            : ''
                        }
                        <div class="mobileAvatar">
                            <h1 class="heading1 font--bold color--brandBlue relativeElement">${userName}</h1>
                            <div class="displayFlex alignItemsCenter userRole">
                                <h2 class="font--regular color--brandBlue heading3 relativeElement">${jobTitle}</h2>
                                <div class="borderLineDiv position--relative beforeClass displayNone-sm"></div>
                            </div>
                        </div>
                </div>
                
               
            </div>
            <!-- header -->
    
            <div class="displayFlex introSwap">
                <!-- contact info -->
                <div class="userContactInfo">
                    <div class="mt10 resumeDocumentBody__header__contactInfo floatRight">
                        <div class="contactInfo__inner displayFlex flexWrap alignItemsCenter">
                            ${phoneNumberView}
                            ${emailView}
                            ${hasSocialMedia ? websiteView : ''}
                            ${hasSocialMedia ? linkedInView : ''}
                        </div>
                    </div>
                <div class="clearFix"></div>
                </div>
                <!-- contact info -->
                <!-- row -->
                <div class="resumeRow mt80 wrap-sm resumeRow--1">
                    ${addressView}
                 
                </div>
                <!-- row -->
            </div>
    
            <!-- work experience row -->
                ${hasWorkExperience ? experienceView : ''}
            <!-- work experience row -->
    
            <!-- Education row -->    
            ${hasEducation ? educationView : ''}
            <!-- Education row -->
    
            <!-- skills row -->
            <div class="resumeRow mt80 wrap-md resumeRow--4">
               ${hasSkillsData ? skillsHeading : ''}
                <div class="resumeColumn70 resumeColumn100-md border-top-Column">
                    <div class="skillsInnerContainer displayFlex flexWrap">
                        <!-- skills & Activites-->

                        ${hasSkillsData ? skillsView : ''}

                        ${hasCertificates ? certificateView : ''}

                        ${hasLicenses ? licenseView : ''}
                        
                        ${hasLanguages ? languagesView : ''}

                        ${hasAwardsAndHonors ? awardsView : ''}
                        

                        <!-- skills & Activites-->
                    </div>
                   
                </div>
            </div>
            <!-- skills row -->
    
            <!-- projects row  projectView projects row -->

            <!-- References row referencesView References row -->
    
            <!-- custom section row -->
                ${hasCustomSections ? customSectionsView : ''}
            <!-- custom section row -->
    
    
            <div class="thankyouDiv textAlignCenter">
                <h2 class="color--brandBlue heading2">Thank You</h2>
                <div class="bottomBorderStyle bg--coral marginHorizontalAuto"></div>
            </div>
    
          </div>
        </main>
        <div class="watermark">
            Powered By <img src="https://1l3fr3479ozgfkufl3txrpq1-wpengine.netdna-ssl.com/wp-content/uploads/2020/11/high5-std.svg">
        </div>
      </body>
    </html>
    
    `;

  const css = `<div>`

  return (
    <TemplateItem
      html={htmlCode}
      name="Template 1"
      type={'Free'}
      onSelect={() => props.onSelectPress(htmlCode)}
      onPreview={() => props.onPreviewPress(htmlCode)}
      {...props}
    />
  );
};

export default Template1;
