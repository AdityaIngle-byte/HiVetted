import React from 'react';
import {useSelector} from 'react-redux';
import {template2IconBook} from './images/template-2-icon-book';
import {template2IconBriefcase} from './images/template-2-icon-briefcase';
import {template2IconCertifications} from './images/template-2-icon-certifications';
import {template2IconCustomSection} from './images/template-2-icon-custom-section';
import {template2IconEmail} from './images/template-2-icon-email';
import {template2IconLanguages} from './images/template-2-icon-languages';
import {template2IconLinkedIn} from './images/template-2-icon-linkedIn';
import {template2IconPhone} from './images/template-2-icon-phone';
import {template2IconTop10} from './images/template-2-icon-top10';
import {template2IconWebsite} from './images/template-2-icon-website';
import { high5logo } from './images/high5logo';
import {resumeStyle} from './resumeStyle';
import TemplateItem from './TemplateItem';

const Template2 = props => {
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

  console.log('[Template2.js] Flags : ', viewFlags);

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
  const introduction = profileStory !== '' ? profileStory : '';

  const address = personalInfo.address;
  const addressView =
    address !== null
      ? `
            <div class="template2HeaderContact__item paragraphStyle">
                <div class="iconAndLabel displayFlex alignItemsCenter"> 
                    <i class="fa fa-address-book" aria-hidden="true" ></i>
                    <span class="color--brandBlue" style="margin-left:10px;">Address</span>
                </div>
                <div class="color--textLightGrey mt5">${
                  personalInfo.addressLine1 !== undefined
                    ? personalInfo.addressLine1 + ',<br>'
                    : ''
                } ${address.addressLine2}<br>
                ${address.city}, ${address.state}, ${address.country}, ${
          address.postalCode
        }</div>
            </div>  
        `
      : '';

  const phoneNumberView =
    personalInfo.primaryPhone !== ''
      ? `
            <div class="template2HeaderContact__item paragraphStyle">
                <div class="iconAndLabel displayFlex alignItemsCenter"> 
                    <img src=${template2IconPhone} class="marginRight10p" alt="phone icon">
                    <span class="color--brandBlue">Phone</span>
                </div>
                <div class="color--textLightGrey mt5">${personalInfo.primaryCountryCode.dial_code} ${personalInfo.primaryPhone}</div>
            </div>   
        `
      : '';

  const emailView =
    personalInfo.email !== ''
      ? `
            <div class="template2HeaderContact__item paragraphStyle">
                <div class="iconAndLabel displayFlex alignItemsCenter"> 
                    <img src=${template2IconEmail} class="marginRight10p" alt="phone icon">
                    <span class="color--brandBlue">Email</span>
                </div>
                <div class="color--textLightGrey mt5">${personalInfo.email}</div>
            </div>
        `
      : '';

  const websiteView =
    profileSocialMedia !== null
      ? `
        <div class="template2HeaderContact__item paragraphStyle">
            <div class="iconAndLabel displayFlex alignItemsCenter"> 
                <img src=${template2IconWebsite} class="marginRight10p" alt="phone icon">
                <span class="color--white">Website</span>
            </div>
            <div class="color--textLightGrey2 mt5">${profileSocialMedia.website}</div>
        </div>
    `
      : '';

  const linkedInView =
    profileSocialMedia !== null
      ? `
            <div class="template2HeaderContact__item paragraphStyle">
                <div class="iconAndLabel displayFlex alignItemsCenter"> 
                    <img src=${template2IconLinkedIn} class="marginRight10p" alt="phone icon">
                    <span class="color--white">Linked in</span>
                </div>
                <div class="color--textLightGrey2 mt5">${profileSocialMedia.linkedIn}</div>
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
                <!-- info section -->
                <div class="template2InfoDiv afterClass">
                    <div class="template2InfoDiv__absoluteShape"></div>
                    <div class="year paragraphStyle color--brandBlue font--bold">${
                      it.startDate
                    } - ${it.isSelect ? 'Present' : it.endDate}</div>
                    <div class="year paragraphStyle color--brandBlue"><span class="font--bold  color--coral ">${
                      it.employerName
                    }</span></div>
                    <p class="mt10 color--textLightGrey paragraphStyle">
                        ${it.jobTitle} <br>
                        ${it.description}
                    </p>
                </div>
            `;
  });
  const experienceView =
    experiences.length > 0
      ? `
            <div class="workExpAndEducation__item flexWidth50 flexWidth100-md paddingLeftZero">
                <div class="iconTitleBorderDiv afterClass position--relative mb20">
                    <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                        <img src=${template2IconBriefcase} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                        <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Work Experience</h2>
                    </div>
                </div>
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
            <div class="template2InfoDiv afterClass">
                <div class="template2InfoDiv__absoluteShape"></div>
                <div class="year paragraphStyle color--brandBlue font--bold">${it.educationType} | ${it.school}</div>
                <div class="year paragraphStyle color--coral font--bold">${it.educationProgram} - ${it.graduatedYear}</div>
               
            </div>
        `;
  });
  const educationView =
    education.length > 0
      ? `
        <div class="workExpAndEducation__item flexWidth50 flexWidth100-md mt40-md paddingRightZero">
            <div class="iconTitleBorderDiv afterClass position--relative mb20">
                <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                    <img src=${template2IconBook} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                    <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Education</h2>
                </div>
            </div>   
            ${educationString}         
        </div>
    `
      : '';

  // set up skills
  let resumeSkillsString = '';
  const primarySkills = skills!== null ? skills.primarySkills : [];
  primarySkills.forEach(it => {
    resumeSkillsString = resumeSkillsString + `<li>${it}</li>`;
  });
  const skillsView =
    primarySkills.length > 0
      ? `
            <div class="skillCertLangIntrst__item flexWidth25 flexWidth50-md">
                <div class="iconTitleBorderDiv afterClass position--relative mb20">
                    <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                        <img src=${template2IconTop10} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                        <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Top 10 Skills</h2>
                    </div>
                </div>
                <!-- info -->
                <ul class="customUnOrderdList customUnOrderdList--coral" style="margin-left:40px;">
                    ${resumeSkillsString}
                </ul>
                <!-- info -->
            </div>
        `
      : '';

  //set resume certificate view
  let certificateString = '';
  certificates.forEach(it => {
    certificateString =
      certificateString +
      `
                <li>${it.certificationName},  ${it.certificate}</li>
        `;
  });
  const certificateView =
    certificates.length > 0
      ? `
            <div class="skillCertLangIntrst__item flexWidth25 flexWidth50-md">
                <div class="iconTitleBorderDiv afterClass position--relative mb20">
                    <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                        <img src=${template2IconCertifications} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                        <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Certifications</h2>
                    </div>
                </div>
                <!-- info -->
                <ul class="customUnOrderdList customUnOrderdList--coral" style="margin-left:40px;">
                   ${certificateString}
                </ul>
                <!-- info -->
            </div>
    `
      : '';

  //set up license
  let licenseString = '';
  licenses.forEach(it => {
    licenseString =
      licenseString + `<li>${it.licenseName}, #${it.license}</li>`;
  });

  const licenseView =
    licenses.length > 0
      ? `
        <div class="skillCertLangIntrst__item flexWidth25 flexWidth50-md">
            <div class="iconTitleBorderDiv afterClass position--relative mb20">
                <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                    <img src=${template2IconCertifications} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                    <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Licenses</h2>
                </div>
            </div>
            <!-- info -->
            <ul class="customUnOrderdList customUnOrderdList--coral" style="margin-left:40px;">
                ${licenseString}
            </ul>
            <!-- info -->
        </div>
    `
      : '';

  //set up languages
  let languageString = '';
  languages.forEach(it => {
    languageString = languageString + `<li>${it.languagename}</li>`;
  });

  const languagesView =
    languages.length > 0
      ? `
        <div class="skillCertLangIntrst__item flexWidth25 flexWidth50-md">
            <div class="iconTitleBorderDiv afterClass position--relative mb20">
                <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                    <img src=${template2IconLanguages}  class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                    <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Languages</h2>
                </div>
            </div>
            <!-- info -->
            <ul class="customUnOrderdList customUnOrderdList--coral" style="margin-left:40px;">
                ${languageString}
            </ul>
            <!-- info -->
        </div>
    `
      : '';

  //set up awards and honors
  let awardString = '';
  profileAwardsAndHonorsList.forEach(it => {
    awardString = awardString + `<li>${it.awardname}</li>`;
  });

  const awardsView =
    profileAwardsAndHonorsList.length > 0
      ? `
        <div class="skillCertLangIntrst__item flexWidth50 flexWidth100-md">
            <div class="iconTitleBorderDiv afterClass position--relative mb20">
                <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
                    <img src=${template2IconLanguages}  class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                    <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Awards And Honors</h2>
                </div>
            </div>
            <!-- info -->
            <ul class="customUnOrderdList customUnOrderdList--coral" style="margin-left:40px;">
                ${awardString}
            </ul>
            <!-- info -->
        </div>
    `
      : '';

  //set up interests
  // let interestString = ''
  // interests.forEach(it => {
  //     interestString = interestString + `<li>${it.interest}</li>`
  // })

  // const interestView = interests.length > 0 ? `
  //     <div class="skillCertLangIntrst__item flexWidth25 flexWidth50-md">
  //         <div class="iconTitleBorderDiv afterClass position--relative mb20">
  //             <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement">
  //                 <img src=${template2IconIntrests} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
  //                 <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Interests</h2>
  //             </div>
  //         </div>
  //         <!-- info -->
  //         <ul class="customUnOrderdList customUnOrderdList--coral">
  //             ${interestString}
  //         </ul>
  //         <!-- info -->
  //     </div>` : ''

  // let projectsString = ''
  // projects.forEach((it,index) => {
  //     projectsString = projectsString + `

  //         <div class="template2InfoDiv">
  //             <div class="template2InfoDiv__absoluteShape"></div>
  //             <div class="displayFlex justifyContentBetween template2InfoDiv__ProjectHeader">
  //                 <div class="templat2projectSection__nameTitle">
  //                     <div class="year paragraphStyle color--coral font--bold">${it.project_name}</div>
  //                     <div class="year paragraphStyle color--brandBlue font--bold">${it.your_role}</div>
  //                 </div>
  //                 <div class="templat2projectSection__compNameDate">
  //                     <div class="paragraphStyle color--brandBlue">
  //                         ${it.company_name}
  //                     </div>
  //                     <div class="paragraphStyle color--brandBlue">
  //                         ${it.start_date} - ${it.end_date}
  //                     </div>
  //                 </div>
  //             </div>
  //             <p class="mt10 color--textLightGrey paragraphStyle">${it.description}</p>
  //         </div>
  //     `
  // })
  // const projectView = projects.length > 0 ? `
  //     <div class="templat2projectSection mb60">
  //         <div class="iconTitleBorderDiv afterClass position--relative mb20">
  //             <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement mb20">
  //                 <img src=${template2IconProjects} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
  //                 <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Projects</h2>
  //             </div>
  //         </div>
  //         ${projectsString}
  //     </div>
  // ` : ''

  //  //set references

  //  let referencesString = ''
  //  references.forEach(it => {
  //      if(it.should_available_on_request){
  //          referencesString = referencesString + `

  //         <div class="template2InfoDiv">
  //             <div class="template2InfoDiv__absoluteShape"></div>
  //             <div class="displayFlex justifyContentBetween template2InfoDiv__ProjectHeader">
  //                 <div class="templat2projectSection__nameTitle">
  //                     <div class="year paragraphStyle color--coral font--bold">${it.contact_person}</div>
  //                 </div>
  //                 <div class="templat2projectSection__compNameDate">
  //                     <div class="paragraphStyle color--brandBlue">
  //                         ${it.relation}
  //                     </div>
  //                 </div>
  //             </div>
  //             <p class="mt10 color--textLightGrey paragraphStyle">${it.phone_number} - ${it.email}</p>
  //         </div>
  //          `
  //      }
  //  })

  //  const referencesView = references.length > 0 ? `

  //     <div class="templat2projectSection mb60">
  //         <div class="iconTitleBorderDiv afterClass position--relative mb20">
  //             <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement mb20">
  //                 <img src=${template2IconProjects} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
  //                 <h2 class="displayInlineBlock verticalMiddle paragraphStyle">References</h2>
  //             </div>
  //         </div>
  //         ${referencesString}
  //     </div>
  //  ` : ''

  //  const activityView = activity !== null ? `
  //     <div class="templat2CustomSection">
  //         <div class="iconTitleBorderDiv afterClass position--relative mb20">
  //             <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement mb20">
  //                 <img src=${template2IconCustomSection} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
  //                 <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Activity</h2>
  //             </div>
  //             <p class="mt10 color--textLightGrey paragraphStyle">
  //                 ${activity}
  //             </p>
  //         </div>
  //     </div> <br>
  //     ` : '';

  //set up custom sections
  let customSectionString = '';
  customSections.forEach(it => {
    customSectionString =
      customSectionString +
      `
            <div class="template2InfoDiv">
                <div class="template2InfoDiv__absoluteShape"></div>
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
        <div class="templat2CustomSection">
            <div class="iconTitleBorderDiv afterClass position--relative mb20">
                <div class="iconTitleBorderDiv__inner displayInlineBlock bg--white relativeElement mb20">
                    <img src=${template2IconCustomSection} class="marginRight10p displayInlineBlock verticalMiddle" alt="icon">
                    <h2 class="displayInlineBlock verticalMiddle paragraphStyle">Custom Section Title</h2>
                </div>
                <!-- info section -->
                ${customSectionString}
                <!-- info section -->
            </div>
        </div>
    `
      : '';

  const htmlCode = `
        <!DOCTYPE html>
        <html lang="en">
         ${resumeStyle}
         <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
        <body class="resumeTemplateBody">
            <main>
            <div class="resumeDocumentBody centerContainer-xxxl"> <!--resumeTemplateBody__inner-->
                <!-- header --> 
            <div class="template2Header displayFlex flexWrap-md mb50">
                <div class="template2Header__inner  displayFlex flexColumn"  style='margin:10px;padding:10px;width:100%'>
                    <div class="template2AvatarName displayFlex alignItemsCenter">
                       
                        <h3 class="template2NameAndInfo heading3">
                            I’m <span class="color--coral font--bold">${userName}</span> & <br>
                            I’m a <span class="color--coral font--bold">${jobTitle}</span>
                        </h3>
                    </div>
                    <!-- Intro -->
                    <div class="template2IntroMobile">
                        <p class="paragraphStyle mb30">
                            ${hasStoryInfo ? introduction : ''}
                        </p>
                    </div>
                    <!-- Intro -->
                    <div class="template2HeaderContact displayFlex flexColumn">
                        ${phoneNumberView}
                        ${emailView}
                        ${addressView}
                    </div>
                    ${
                      hasSocialMedia
                        ? `<!-- social Links -->
                            <div class="template2Header__inner  bg--brandBlue color--white  flexWidth100-md" style='margin-top:20px;'>
                            <div class="template2HeaderContact displayFlex flexWrap flexColumn" style='padding:10px;'>
                                ${websiteView}
                                ${linkedInView}
                            </div>
                            </div>
                        <!-- social Links -->`
                        : ''
                    }
                </div>
               
            </div>
                <!-- header -->

                <div class="" style="margin:10px;padding:10px;">
                    <!-- experience and education section -->
                    ${
                      hasWorkExperience
                        ? `<div class="workExpAndEducation displayFlex flexWrap-md mb60">                        
                            ${hasWorkExperience ? experienceView : ''}
                        </div>`
                        : ''
                    }
                    ${
                      hasEducation
                        ? `<div class="workExpAndEducation displayFlex flexWrap-md mb60">
                            ${educationView}
                        </div>`
                        : ''
                    }
                    <!-- experience and education section -->
            
                    <!-- skills certifications language and intrest section -->
                    <div class="skillCertLangIntrst displayFlex flexWrap-md mb40">
                        ${hasSkillsData ? skillsView : ''}      
                    </div>
                    <div class="skillCertLangIntrst displayFlex flexWrap-md mb40">
                        ${hasCertificates ? certificateView : ''}
                    </div>
                    <div class="skillCertLangIntrst displayFlex flexWrap-md mb40">
                        ${hasLicenses ? licenseView : ''}
                    </div>
                    <div class="skillCertLangIntrst displayFlex flexWrap-md mb40">

                    ${hasLanguages ? languagesView : ''}
                  
                    </div>
                    <div class="skillCertLangIntrst displayFlex flexWrap-md mb40">

                    ${hasAwardsAndHonors ? awardsView : ''}
                  
                    </div>
                    <!-- skills certifications language and intrest section -->
                  
                    <!-- Custom section -->
                    ${hasCustomSections ? customSectionsView : ''}
                    <!-- Custom section -->
            
            
                    <div class="thankyouDiv textAlignCenter">
                        <h2 class="color--brandBlue heading2">Thank You</h2>
                        <div class="bottomBorderStyle bg--coral marginHorizontalAuto"></div>
                    </div>
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
      name="Template 1"
      type={'Free'}
      onSelect={() => props.onSelectPress(htmlCode)}
      onPreview={() => props.onPreviewPress(htmlCode)}
      {...props}
    />
  );
};

export default Template2;
