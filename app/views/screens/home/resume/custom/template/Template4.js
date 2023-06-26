import React from 'react';
import {useSelector} from 'react-redux';
import {template3IconEmail} from './images/template-3-icon-email';
import {template3IconLinkedin} from './images/template-3-icon-linkedin';
import {template3IconMap} from './images/template-3-icon-map';
import {template3IconPhone} from './images/template-3-icon-phone';
import {template3IconWebsite} from './images/template-3-icon-website';
import {resumeStyle} from './resumeStyle';
import TemplateItem from './TemplateItem';
import { high5logo } from './images/high5logo';

const Template4 = props => {
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

  console.log('[Template4.js] Flags : ', viewFlags);

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

  const profileImage = personalInfo.imageURL;
  const userName =
    personalInfo.firstName !== ''
      ? `${personalInfo.firstName} ${personalInfo.lastName}`
      : '';
  const jobTitle =
    personalInfo.designation !== '' ? personalInfo.designation : '';
  const myStory = profileStory !== '' ? profileStory : '';

  const address = personalInfo.address;
  const addressView =
    address !== null
      ? `
            <div class="template3_IconText displayFlex alignItemsCenter paragraphStyle">
                <img src=${template3IconMap} class="marginRight10p" alt="address">
                <span class="color--textLightGrey2">
                    ${
                      personalInfo.addressLine1 !== undefined
                        ? personalInfo.addressLine1 + ','
                        : ''
                    } ${address.addressLine2}<br>
                    ${address.city}, ${address.state}, ${address.country}, ${
          address.postalCode
        }
                </span>
            </div>
        `
      : '';

  const phoneNumberView =
    personalInfo.primaryPhone !== ''
      ? `
        <div class="template3_IconText displayFlex alignItemsCenter paragraphStyle mb10">
            <img src=${template3IconPhone} class="marginRight10p" alt="phone">
            <span class="color--textLightGrey2">
                ${personalInfo.primaryCountryCode.dial_code}${personalInfo.primaryPhone}
            </span>
        </div>`
      : '';

  const emailView =
    personalInfo.email !== ''
      ? `
            <div class="template3_IconText displayFlex alignItemsCenter paragraphStyle mb10">
                <img src=${template3IconEmail} class="marginRight10p" alt="email">
                <span class="color--textLightGrey2">
                    ${personalInfo.email}
                </span>
            </div> `
      : '';

  const websiteView =
    profileSocialMedia !== null && profileSocialMedia.website !== ''
      ? `
        <div class="template3_IconText displayFlex alignItemsCenter paragraphStyle mb10">
            <img src=${template3IconWebsite} class="marginRight10p" alt="website">
            <span class="color--textLightGrey2">
                ${profileSocialMedia.website}
            </span>
        </div>
    `
      : '';

  const linkedInView =
    profileSocialMedia !== null && profileSocialMedia.linkedIn !== ''
      ? `
            <div class="template3_IconText displayFlex alignItemsCenter paragraphStyle mb10">
                <img src=${template3IconLinkedin} class="marginRight10p" alt="linkedin">
                <span class="color--textLightGrey2">
                    ${profileSocialMedia.linkedIn}
                </span>
            </div>
        `
      : '';

  // const instagramView = personalInfo.email !== '' ? `
  //     <div class="contactInfo__inner__item displayFlex alignItemsCenter justifyContentCente">
  //         <div class="circularIcon bg--brandBlue borderRadius100">
  //             <img src=${mail} alt="email">
  //         </div>
  //         <div class="titleAndText paragraphStyle">
  //             <span class="color--brandBlue displayBlock">Email</span>
  //             <span class="color--textLightGrey displayBlock">${personalInfo.email}</span>
  //         </div>
  //     </div>
  // ` : ''

  //Set Resume Experience
  let experienceString = '';
  experiences.forEach(it => {
    experienceString =
      experienceString +
      `
                <div class="workExpItemTemplate4 paragraphStyle">
                    <div class="font--bold color--brandBlue">${
                      it.employerName
                    }</div>
                    <div class="color--brandBlue mt5"> ${it.jobTitle}<br>${
        it.startDate
      } - ${it.isSelect ? 'Present' : it.endDate}</div>
                    <p class="color--textLightGrey mt10">
                        ${it.description}
                    </p>
                </div>    
            `;
  });
  const experienceView =
    experiences.length > 0
      ? `
        <div class="workExpTempalte4 flexWidth50 flexWidth100-sm">
        <h2 class="heading3 color--brandBlue font--bold mb10">Work Experience</h2>
            ${experienceString}
        </div>
    `
      : '';

  //set up education
  let educationString = '';
  education.forEach(it => {
    educationString =
      educationString +
      `
            <div class="workExpItemTemplate4 eduExpTemplate4 paragraphStyle">
                <div class="font--bold color--brandBlue">${it.educationProgram} - ${it.graduatedYear}</div>
                <div class="color--brandBlue mt5">${it.educationType} | ${it.school}</div>
            </div>
            <br>
        `;
  });
  const educationView =
    education.length > 0
      ? `
        <div class="educationTemplate4 flexWidth50 flexWidth100-sm">
            <h2 class="heading3 color--brandBlue font--bold mb10">Education</h2>
            ${educationString}
        </div>
    `
      : '';

  // set up skills
  const primarySkills = skills!== null ? skills.primarySkills : [];
  let resumeSkillsString = '';
  primarySkills.forEach(it => {
    resumeSkillsString = resumeSkillsString + `${it} `;
  });
  const skillsView =
    primarySkills.length > 0
      ? `
        <div class="flexWidth25 flexWidth50-md" style="margin-top:20px;">
            <h2 class="heading3 font--bold mb10">Top 10 Skills</h2>
            <p class="paragraphStyle">
                ${resumeSkillsString}
            </p>
        </div>
        `
      : '';

  //set resume certificate view
  let certificateString = '';
  certificates.forEach((it,index) => {
    certificateString = (index!==certificates.length?certificateString + `${it.certificationName}, `:certificateString + `${it.certificationName}`);
  });
  const certificateView =
    certificates.length > 0
      ? `
            <div class=" flexWidth25 flexWidth50-md"  style="margin-top:20px;">
                <h2 class="heading3 font--bold mb10">Certifications</h2>
                <p class="paragraphStyle" style="margin-top:-10px;">
                ${certificateString}
                </p>
            </div>
    `
      : '';

  //set up license
  let licenseString = '';
  licenses.forEach(it => {
    licenseString = licenseString + `${it.licenseName}</li>, `;
  });

  const licenseView =
    licenses.length > 0
      ? `
    <div class=" flexWidth25 flexWidth50-md" style="margin-top:20px;">
        <h2 class="heading3 font--bold mb10">License</h2>
        <p class="paragraphStyle" style="margin-top:-10px;">
            ${licenseString}
        </p>
    </div>
    `
      : '';

  //set up languages
  let languageString = '';
  languages.forEach(it => {
    languageString = languageString + `${it.languagename}, `;
  });

  const languagesView =
    languages.length > 0
      ? `
        <div class=" flexWidth25 flexWidth50-md" style="margin-top:20px;">
            <h2 class="heading3 font--bold mb10">Languages</h2>
            <p class="paragraphStyle" style="margin-top:-10px;">
            ${languageString}
            </p>
        </div>
    `
      : '';

  //set resume certificate view
  let awardString = '';
  profileAwardsAndHonorsList.forEach(it => {
    awardString = awardString + `${it.awardname}, `;
  });
  const awardsView =
    profileAwardsAndHonorsList.length > 0
      ? `
             <div class=" flexWidth25 flexWidth50-md" style="margin-top:20px;">
                 <h2 class="heading3 font--bold mb10">Awards And Honors</h2>
                 <p class="paragraphStyle" style="margin-top:-10px;">
                 ${awardString}
                 </p>
             </div>
     `
      : '';

  //set up interests
  // let interestString = ''
  // interests.forEach(it => {
  //     interestString = interestString + `${it.interest}, `
  // })

  // const interestView = interests.length > 0 ? `
  //     <div class="template4_skillIntrestSection__item flexWidth25 flexWidth50-md">
  //         <h2 class="heading3 font--bold mb10">Interests</h2>
  //         <p class="paragraphStyle">
  //             ${interestString}
  //         </p>
  //     </div>` : ''

  // let projectsString = ''
  // projects.forEach((it,index) => {
  //     projectsString = projectsString + `
  //         <div class="workExpItemTemplate4 projectsItemTemplate4 paragraphStyle">
  //             <div class="font--bold color--brandBlue">${it.project_name}</div>
  //             <div class="color--brandBlue mt5">${it.your_role} | ${it.company_name} | ${it.start_date} - ${it.end_date}</div>
  //             <p class="color--textLightGrey mt10">
  //                 ${it.description}
  //             </p>
  //         </div>
  //     `
  // })
  // const projectView = projects.length > 0 ? `
  //     <div class="projectsTemplate4">
  //         <div class="projectsTemplate4__inner">
  //             <h2 class="heading3 color--brandBlue font--bold mb10">Projects</h2>
  //             ${projectsString}
  //         </div>
  //     </div>
  // ` : ''

  //  //set references

  //  let referencesString = ''
  //  references.forEach(it => {
  //      if(it.should_available_on_request){
  //          referencesString = referencesString + `
  //             <div class="workExpItemTemplate4 projectsItemTemplate4 paragraphStyle">
  //                 <div class="font--bold color--brandBlue">${it.contact_person}</div>
  //                 <div class="color--brandBlue mt5">${it.relation}</div>
  //                 <p class="color--textLightGrey mt10">
  //                     ${it.phone_number} | ${it.email}
  //                 </p>
  //             </div>
  //          `
  //      }
  //  })

  // //  console.log('[Template2.js] references :',resumePreferences,referencesString)

  //  const referencesView = references.length > 0 ? `
  //     <br><br>
  //     <div class="projectsTemplate4">
  //         <div class="projectsTemplate4__inner">
  //             <h2 class="heading3 color--brandBlue font--bold mb10">References</h2>
  //             ${referencesString}
  //         </div>
  //     </div>
  //  ` : ''

  //  const activityView = activity !== null ? `
  //  <br><br><br><br>
  //  <div class="workExpItemTemplate4 projectsItemTemplate4 paragraphStyle">
  //     <div class="font-size:2em font--bold color--brandBlue">Activity</div>
  //     <p class="color--textLightGrey mt10">
  //         ${activity}
  //     </p>
  // </div>
  //     ` : '';

  //set up custom sections
  let customSectionString = '';
  console.log("Template 4 custom")
  console.log(customSections)
  customSections.forEach(it => {
    customSectionString =
      customSectionString +
      `
        <div class="workExpItemTemplate4 customSecItemTemplate4 paragraphStyle">
        <div class="year paragraphStyle color--coral font--bold">${it.title}</div>
        <p class="mt10 color--textLightGrey paragraphStyle">
            ${it.subheading}<br>
            ${it.sampledesc}
        </p>
        </div>
        `;
  });

  const customSectionsView =
    customSections.length > 0
      ? `
        <div class="customSectionTemplate4">
            <div class="projectsTemplate4__inner">
                <h2 class="heading3 color--brandBlue font--bold mb10">Custom Sections</h2>
                ${customSectionString}
            </div>
        </div>
    `
      : '';

  const htmlCode = `
    <!DOCTYPE html>
    <html lang="en">

    ${resumeStyle}

      <body class="resumeTemplateBody">
        <main>
            <!-- header -->
            
            <div class=" paddingTopZero centerContainer-xxxl">
               <div style=" padding:20px;">
                    <div class="template4AvatarInfo--Left bg--brandBlue" style='width:100%'>
                        ${
                          profileImage
                            ? `<img src=${profileImage} alt="userName Avatar" class="template4Avatar">`
                            : ''
                        }
                        <div class="template4AvatarInfo--Left__InnerRight flexWidth100-xs">
                            <h1 class="heading3 font--bold color--coral">${userName}</h1>
                            <h2 class="font--regular color--white paragraphStyle mb20">${jobTitle}</h2>
                            <div class="template4ContactInfo">

                                ${phoneNumberView}
                                ${emailView}
                                ${addressView}

                                
                                <div class="teplate4ContactInfoBorder"></div>
                                ${hasSocialMedia ? websiteView : ''}
                                ${hasSocialMedia ? linkedInView : ''}
                            </div>
                        </div>
                    </div>
                    ${
                      hasStoryInfo
                        ? `<div class="template4AvatarInfo--Right bg--Grey">
                            <p class="paragraphStyle color--textLightGrey">
                                <span class="color--coral displayBlock mb10">Introduction</span>
                                ${myStory}
                            </p>
                        </div>`
                        : ''
                    }
               </div>
            </div>
            <!-- header -->
            
            <div class="resumeDocumentBody paddingTopZero centerContainer-xxxl"  style="padding:20px;">
            
            <!-- work experience and education -->
            <div class="workExpAndEduTemplate4 displayFlex flexwrap-sm">
                ${hasWorkExperience ? experienceView : ''}
                ${hasEducation ? educationView : ''}
            </div>
            <!-- work experience and education -->
    
            <!-- skills certificate lang intrest section -->
     
                ${hasSkillsData ? skillsView : ''}    
                ${hasCertificates ? certificateView : ''}
                ${hasLicenses ? licenseView : ''}
                ${hasLanguages ? languagesView : ''}  
                ${hasAwardsAndHonors ? awardsView : ''}              
                
       
            <!-- skills certificate lang intrest section -->
    
           
            <!-- custom section -->
            ${hasCustomSections ? customSectionsView : ''}
            <!-- custom section -->
              <div class="thankyouDiv textAlignCenter" style="padding:10px;marginTop:10px;">
                <h2 class="color--brandBlue heading2">Thank You</h2>
              <div class="bottomBorderStyle bg--coral marginHorizontalAuto"></div>
            </div>
          </div>
        </main>
        <div class="watermark" style="justify-content:center;display:flex;">
        <div style="justify-content:center;display:flex;align-items:center">
         Powered By
        </div>
        <div>
         <img src="${high5logo}">
       </div>

     </div>
      </body>
    </html>
    `;

  return (
    <TemplateItem
      html={htmlCode}
      name="Template 2"
      type={'Free'}
      onSelect={() => props.onSelectPress(htmlCode)}
      onPreview={() => props.onPreviewPress(htmlCode)}
      {...props}
    />
  );
};

export default Template4;
