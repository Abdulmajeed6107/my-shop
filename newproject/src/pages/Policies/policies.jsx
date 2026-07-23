import React, { useState } from 'react';
import MyNavbar from '../../components/Navbarcustom';
import TopHeader from '../../components/TopHeader';

const Policies = () => {

    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div className="container-fluid bg-white p-4">
            <TopHeader />
            <MyNavbar />
            <button onClick={() => window.history.back()} className="btn btn-outline-dark mb-3 ms-3">
                ← Back
            </button>
            <h1 className="Display-6 m-2 text-center bg-light">Policies</h1>

            <div>
                <div className="d-flex justify-content-between align-items-center m-3 bg-light text-center" onClick={() => toggleSection('shipping')} style={{ cursor: 'pointer' }}>
                    <h2 className="h4 m-2">Shipping & Handling</h2>
                    <div className="d-flex align-items-center bg-dark text-white pt-3 pb-3 px-3 rounded">
                        <i className={`bi ${expandedSection === "shipping" ? "bi-dash-lg" : "bi-plus-lg"}`}></i>
                    </div>
                </div>
                {expandedSection === "shipping" && (
                    <div className="mb-4 mx-3">
                        <div className='px-3'>
                            <p>Delivery within Pakistan</p>
                            <p>All orders within Pakistan are routed through TCS, Leopords, Call Courier and many others courier services. All our domestic clients will be provided with a tracking ID when the order is dispatched.
                                <br />
                                Upon placing an order, you will receive a verification call or SMS from our Customer Service to confirm the order. If you fail to verify, your order will be automatically cancelled after 3 days (only applicable to purchases made through Cash on Delivery method). Once the order is verified, it will be dispatched within 1-2 working days and will be delivered to you within 4-5 working days.
                            </p>
                            <p>We offer free delivery on orders above Rs.4999 within Pakistan.</p>
                        </div>
                    </div>
                )}
                <div className="d-flex justify-content-between align-items-center m-3 bg-light text-center" onClick={() => toggleSection('exchange')} style={{ cursor: 'pointer' }}>
                    <h2 className="h4 m-2">Exchange Policy</h2>
                    <div className="d-flex align-items-center bg-dark text-white pt-3 pb-3 px-3 rounded">
                        <i className={`bi ${expandedSection === "exchange" ? "bi-dash-lg" : "bi-plus-lg"}`}></i>
                    </div>
                </div>
                {expandedSection === "exchange" && (
                    <div className="mb-4 px-3">

                        <div className='px-3'>
                            <p> Items purchased from our online store can be sent back for exchange at our outlet or you can contact our customer service if you wish to send the items through courier.
                                <br />
                                Bhatti Cloth allows its customers to exchange the purchased items subject to conditions. The exchange of item will be allowed if:</p>

                            <ul>
                                <li>The customer has submitted a request for exchange (via email, phone call, SMS or WhatsApp) within 7 working days of receipt of the purchased item;</li>
                                <li>The customer in his/her request for exchange has stated the reason(s) why he/she wishes to exchange the item;</li>
                                <li>The item is in its original packing and the price tag is intact;</li>
                                <li>The original invoice of the item he/she wishes to exchange is sent along with the item;</li>
                                <li>It has no emits, odours, perfume scents, stains or anything which suggests the item was used or washed.</li>
                            </ul>
                            Items bought on sale cannot be exchanged. If an item bought on regular price goes on sale, it will be exchanged at sale price.
                            <br />
                            Bhatti Cloth has the right, at its the sole discretion, to accept or deny the request for exchange.
                            <br />
                            Upon the acceptance of request for exchange, the customer will be notified by our customer service.
                            <br />
                            <span className='fw-bold'>BHATTI CLOTH strictly follows ‘NO refund’ policy.</span> The option of cashback is not available. The Exchange Policy will be applicable once the customer has placed the order and has received the parcel or payment has been processed.

                            <p className='fw-bold'>Damage & Claims</p>

                            The exchange of Damaged item(s) will be allowed if the item(s) received has any kind of manufacturing defect, shipment of wrong size or wrong item.
                            <span className='fw-bold'>The complaint has to be raised within 2 working days along with paper invoice (via call, message or email) after receiving the parcel.</span>
                            Please allow one week for the processing of damage and claims.

                            <p><span className='fw-bold'>Please note, the items purchased from our retail outlet cannot be sent to us for exchange through courier.</span> The items can be exchanged at our retail outlet.</p> </div>
                    </div>
                )}
                <div className="d-flex justify-content-between align-items-center m-3 bg-light text-center" onClick={() => toggleSection('cancellation')} style={{ cursor: 'pointer' }}>
                    <h2 className="h4 m-2">Order Cancellation Policy</h2>
                    <div className="d-flex align-items-center bg-dark text-white pt-3 pb-3 px-3 rounded">
                        <i className={`bi ${expandedSection === "cancellation" ? "bi-dash-lg" : "bi-plus-lg"}`}></i>
                    </div>
                </div>
                {expandedSection === "cancellation" && (
                    <div className="mb-4 ps-3">
                        <div className='px-3'>
                            <p>You can cancel your order at any time before the order has been processed. Once the product has been shipped, You will receive the tracking information, and our "Exchange Policy" will apply. Instead of refunding, we will provide the customer with a credit note or a discount code. </p>
                            BHATTI CLOTH may cancel orders for any reason. Common reasons include: the item is out of stock, the issuing financial institution declines price errors; or the credit card payment.                        </div>
                    </div>
                )}
                <div className="d-flex justify-content-between align-items-center m-3 bg-light text-center" onClick={() => toggleSection('privacy')} style={{ cursor: 'pointer' }}>
                    <h2 className="h4 m-2 bg-light">Privacy Policy</h2>
                    <div className="d-flex align-items-center bg-dark text-white pt-3 pb-3 px-3 rounded">
                        <i className={`bi ${expandedSection === "privacy" ? "bi-dash-lg" : "bi-plus-lg"}`}></i>
                    </div>
                </div>
                {expandedSection === "privacy" && (
                    <div className="mb-4 ps-3">
                        <div className='px-3'>
                            Bhatti Cloth is committed to ensuring that your personal information is used properly and is kept securely. This Privacy Policy explains how we will collect and use your personal information through a website [https://my-shop-tawny-three.vercel.app].
                            Please read our Privacy Policy carefully to get a clear understanding of how we collect,
                            use, protect or otherwise handle your personal information. We will not sell or redistribute your information to anyone.
                            <span className='fw-bold'>What personal information do we collect from the people that visit our website?</span>
                            <p>
                                When ordering or registering on our site, as appropriate,
                                you may be asked to enter your name, email address, contact number,
                                mailing address, credit card information or other details to help you with your experience.
                            </p>
                            <span className='fw-bold'>When do we collect information</span>

                            <p> We collect information from you when you register on our site, place an order, subscribe to updates, leave a message on Customer Service, or enter information on our site.</p>
                            <span className='fw-bold'>Use and storage of your personal information</span>
                            <p>
                                We may use the information we collect from you when you register,
                                make a purchase, sign up for our newsletter,
                                respond to a survey or marketing communication, surf the website,
                                or use certain other site features in the following ways:
                            </p>
                            <ul>
                                <li>To be able to contact you in the event of any problem with the delivery of your items</li>
                                <li>To process orders and to send information and updates pertaining to orders</li>
                                <li>To be able to send text message notifications of delivery status</li>
                                <li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested</li>
                                <li>To allow us to better service you in responding to your customer service requests</li>
                                <li>To quickly process your transactions</li>
                                <li>To ask for ratings and reviews of services or products</li>
                            </ul>

                            We will only keep your information for as long as necessary to carry out our services to you or for as long as we are required by law. After this your personal information will be deleted. Rest assured, your personal information is protected by an additional security layer called SSL which ensures your sensitive information is transmitted securely through an encrypted link.

                            <h5 className="text-center">COOKIES</h5>
                            <p>
                                We also use non-personal data such as third-party cookies to collect statistics to enhance and simplify your visit. A cookie is a piece of information that is held on the hard drive of your computer which records how you have used a website. Cookies make it easier for you to log on and use the Website during future visits.
                                The permanent cookies are stored on your computer or mobile device for no longer than 24 months. You can easily erase cookies from your computer or mobile device using your browser.
                            </p>
                            <h5 className="text-center">YOUR RIGHTS</h5>
                            <p>

                            </p>
                            You have the right to request information about the personal data we hold on you. If your data is incorrect, incomplete or irrelevant, you can ask to have the information corrected or removed.                        </div>
                    </div>
                )}
                <div className="d-flex justify-content-between align-items-center m-3 bg-light text-center" onClick={() => toggleSection('terms')} style={{ cursor: 'pointer' }}>
                    <h2 className="h4 m-2">Terms of Use</h2>
                    <div className="d-flex align-items-center bg-dark text-white pt-3 pb-3 px-3 rounded">
                        <i className={`bi ${expandedSection === "terms" ? "bi-dash-lg" : "bi-plus-lg"}`}></i>
                    </div>
                </div>
                {expandedSection === "terms" && (
                    <div className="mb-4 ps-3">
                        <div className="px-3">
                            <p>
                                This website is operated by Bhatti Cloth. Throughout the site, the terms “we”, “us” and “our” refer to Bhatti Cloth. Bhatti Cloth offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                            </p>
                            <p>
                                By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Use”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Use apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
                            </p>
                            <p>
                                Please read these Terms of Use carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Use. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
                            </p>
                            <p>
                                Any new features or tools which are added to the current store shall also be subject to the Terms of Use. You can review the most current version of the Terms of Use at any time on this page. We reserve the right to update, change or replace any part of these Terms of Use by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
                            </p>

                            <h5 className="fw-bold mt-4 mb-2 text-uppercase">USE OF THIS SITE</h5>
                            <p>
                                All billing and registration information provided must be truthful and accurate. Providing any untruthful or inaccurate information constitutes a breach of these Terms. By confirming your purchase at the end of the checkout process, you agree to accept and pay for the item(s) requested.
                            </p>
                            <p>
                                You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
                            </p>
                            <p>
                                We reserve the right to refuse service to anyone for any reason at any time.
                            </p>
                            <p>
                                You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
                            </p>
                            <p>
                                You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
                            </p>

                            <h5 className="fw-bold mt-4 mb-2 text-uppercase">MODIFICATIONS TO THE SERVICE AND PRICES</h5>
                            <p>
                                Prices for our products are subject to change without notice.
                            </p>
                            <p>
                                We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                            </p>
                            <p>
                                We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
                            </p>

                            <h5 className="fw-bold mt-4 mb-2 text-uppercase">PRODUCTS OR SERVICES</h5>
                            <p>
                                Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to exchange only according to our Exchange Policy.
                            </p>
                            <p>
                                We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
                            </p>
                            <p>
                                We reserve the right, but are not obligated, to limit the sales of our products or services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at any time without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.
                            </p>
                            <p>
                                We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
                            </p>

                            <h5 className="fw-bold mt-4 mb-2 text-uppercase">ACCURACY OF BILLING AND ACCOUNT INFORMATION</h5>
                            <p>
                                We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.
                            </p>
                            <p>
                                You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
                            </p>
                            <p>
                                For more detail, please review our policies.
                            </p>

                            <h5 className="fw-bold mt-4 mb-2 text-uppercase">USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</h5>
                            <p>
                                If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.
                            </p>
                            <p>
                                We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Use.
                            </p>
                            <p>
                                You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.
                            </p>

                            <h5 className="fw-bold mt-4 mb-2 text-uppercase">PERSONAL INFORMATION</h5>
                            <p>
                                Your submission of personal information through the store is governed by our Privacy Policy.
                            </p>

                            <h5 className="fw-bold mt-4 mb-2 text-uppercase">ERRORS, INACCURACIES AND OMISSIONS</h5>
                            <p>
                                Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).
                            </p>

                            <h5 className="fw-bold mt-4 mb-2 text-uppercase">DISCLAIMER</h5>
                            <p>
                                In no case shall Bhatti Cloth, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.
                            </p>

                            <h5 className="fw-bold mt-4 mb-2 text-uppercase">INDEMNIFICATION</h5>
                            <p>
                                You agree to indemnify, defend and hold harmless Bhatti Cloth and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.
                            </p>

                            <h5 className="fw-bold mt-4 mb-2 text-uppercase">GOVERNING LAW</h5>
                            <p>
                                These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Islamic Republic of Pakistan.
                            </p>

                            <h5 className="fw-bold mt-4 mb-2 text-uppercase">CHANGES TO TERMS OF SERVICE</h5>
                            <p>
                                You can review the most current version of the Terms of Use at any time at this page.
                            </p>
                            <p>
                                We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Use by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Use constitutes acceptance of those changes.
                            </p>

                            <h5 className="fw-bold mt-4 mb-2 text-uppercase">CONTACT INFORMATION</h5>
                            <p>
                                Questions about the Terms of Use should be sent to us at <a href="mailto:majeedzr7741@gmail.com">majeedzr7741@gmail.com</a>.
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Policies;