import React from "react";
import "./CV.css";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import personalPic from "./ahmedPic.jpg";

function CV() {
    return (
        <div className="cv">
            <div className="cdInner">
                <div className="cvHeader">
                    <div className="cvHeader__first">
                        <h1 className="cvHeader__name">Ahmed Samir Teaima</h1>
                        <p className="cvHeader__position">Retail Pharmacy Manager</p>
                    </div>
                    <div className="cvHeader__second">
                        <div className="cvHeader__secondDetail">
                            <div className="cvHeader__secondDetailIcon">
                                <EmailIcon htmlColor="#07aba0" />
                            </div>
                            <span className="cvHeader__secondDetailText">phahmedsamir2055@gmail.com</span>
                        </div>
                        <div className="cvHeader__secondDetail">
                            <div className="cvHeader__secondDetailIcon">
                                <CallIcon htmlColor="#07aba0" />
                            </div>
                            <span className="cvHeader__secondDetailText">(056)26-29-205</span>
                        </div>
                        <div className="cvHeader__secondDetail">
                            <div className="cvHeader__secondDetailIcon">
                                <LocationOnIcon htmlColor="#07aba0" />
                            </div>
                            <span className="cvHeader__secondDetailText">Riyadh</span>
                        </div>
                    </div>
                    <div className="cvHeader__picDiv">
                        <img src={personalPic} className="cvHeader__pic" />
                    </div>
                </div>

                <div className="cvDepartment">
                    <h3 className="cvDepartment__title">Career Objective</h3>
                    <div className="cvDepartment__body">
                        I am Ahmed Samir, A Current Pharmacy Manager and it would be my pleasure to leverage my skills as an experienced Pharmacist who has been working in the field since my Primary school until now, and also as a Full-Stack Web Developer who is willing to apply my technical skills to develop management solutions that would optimize Pharmacists' performance
                        resulting in higher sales and higher profitability as a result.{" "}
                    </div>
                </div>
                <div className="cvDepartment">
                    <h3 className="cvDepartment__title">Experience</h3>
                    <div className="cvDepartment__body">
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle">Pharmacy Assistant then a Second Pharmacist At ElMonagah Pharmacy:</p>
                            <span className="cvDepartment__experienceText">From 2003 to 2014, I have worked in family business starting as a delivery guy at 10-year-old, then within years as a Pharmacy Assistant, until handling the responsibilities of A Pharmacist after my graduation. </span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle">Hospital Pharmacist at Mostafa Kamel Military Hospital</p>
                            <span className="cvDepartment__experienceText">From 10/2014 to 5/2015 I worked in two departemnts, Emergency Department then main Hospital's Pharmacy .</span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle">Oxford Pharmacies</p>
                            <span className="cvDepartment__experienceText">From 5/2015 to 10/2015, I worked as a Retail Pharmacist in one of the biggest Pharmacy Chains in Alexandria, Egypt .</span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle">Tadawi Pharmacies in Jeddah, Saudi Arabia</p>
                            <span className="cvDepartment__experienceText">
                                From 10/2015 to 10/2016, I worked as a Retail Pharmacist in the third biggest Pharmacy Chains in Saudi Arabia , but decided to resign seeing that the financial circumstances there were not encouraging. Worthnoting that I managed to raise the sales of the first Pharmacy I worked at about 100% in a 6-month-period, then promoted to a higher Pharmacy
                                that I also raised its sales from about 150K monthly to 200K.
                            </span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle">Zahrat AlRawda Pharmacies then Greens Pharmacies in Riyadh, Saudi Arabia</p>
                            <span className="cvDepartment__experienceText">From 12/2016 Until Now, I worked as a Retail Pharmacist in one of the largest Pharmacy Chains in Saudi Arabia , managing to raise the sales of the Pharmacy from 120K monthly until over 200K . </span>
                        </div>
                    </div>
                </div>
                <div className="cvDepartment">
                    <h3 className="cvDepartment__title">Education</h3>
                    <div className="cvDepartment__body">
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle">Alexandria University, faculty of Pharmacy 2009-2014 </p>
                            <span className="cvDepartment__experienceText"> </span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle">Studying American && Canadian Diploma of Pharmacy in 2018 </p>
                            <span className="cvDepartment__experienceText"> Having a fresh medical background enables me to lecture others colleagues in case of medical lectures needed especially for new Pharmacists.</span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> </p>
                            <span className="cvDepartment__experienceText"> </span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> Ielts English Language Score 8 </p>
                            <span className="cvDepartment__experienceText"> having a high proficiency at English language enables me to effectively communicate with all partners to achieve goals </span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> Self-taught Web Developer </p>
                            <span className="cvDepartment__experienceText"> Having a professional technical background enables me to apply my technical skills with the aim of developing solutions to optimize the company's performance through adopting technical initiatives as will be listed in the following parts in my Resume. </span>
                        </div>
                    </div>
                </div>
                <div className="cvDepartment">
                    <h3 className="cvDepartment__title">Skills</h3>
                    <div className="cvDepartment__body">
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> Quick Learner </p>
                            <span className="cvDepartment__experienceText"> As I am used to studying and take courses at nearly every field like economic, technical or medical, I would be the go-to person in case of new skills or new Knowledge needed within Office . </span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> Effective communication Soft Skills & Team-working </p>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> Excellent Organizational/ Management/ Technical skills </p>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> Creativity and Problem-solving </p>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> Respectful to the field and to my colleagues </p>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> Magento software technical Background </p>
                            <span className="cvDepartment__experienceText"> It may enable me to Use my Knowledge to not only manage Magento Systems , but modify its front-end interfaces in case needed like (in case of Offers or Eids as examples). </span>
                        </div>
                    </div>
                </div>

                <div className="cvDepartment">
                    <h3 className="cvDepartment__title">Initiaves to adopt if Enabled :</h3>
                    <div className="cvDepartment__body">
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> Local Bottom-up Home Delivery Systems </p>
                            <span className="cvDepartment__experienceText"> For near Zero costs and with the aim of increasing pharmacy sales 10 to 25% . </span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> For-A-Customer Emergency Order System </p>
                            <span className="cvDepartment__experienceText"> With an expected outcome of neaerly 5% immediate increase in Pharmacies Sales. </span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> Points-based KPIs evaluation system </p>
                            <span className="cvDepartment__experienceText"> The ability to judge/reward employess has to be based on objective standrds . </span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> Points-based Visits Follow up system </p>
                            <span className="cvDepartment__experienceText"> As a part of the aforementioned evaluation system to follow up on specific pre-set Standards and tasks. </span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> Achievement monitoring System </p>
                            <span className="cvDepartment__experienceText"> With the aim of motivating Pharmacists to increase sales, targets and daily/Monthly achievement data should be easily available for them to optimize their Performance .  </span>
                        </div>
                        <div className="cvDepartment__experience">
                            <p className="cvDepartment__experienceTitle"> Trending-Shortages monitoring System </p>
                            <span className="cvDepartment__experienceText"> Crucially Important to connect the needs of Pharmacists and their Customers on a daily basis with Purchasing managers of the company .  </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CV;
