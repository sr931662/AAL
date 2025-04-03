import React, { useState, useEffect, useRef } from 'react';
import styles from './caretips.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faDog, faCat } from '@fortawesome/free-solid-svg-icons';
import pet_care from '../../Assets/pet-care.png';
import gsap from 'gsap';

const Caretips = () => {
    const [selectedPet, setSelectedPet] = useState('Dogs');
    const contentRef = useRef(null);

    const [currentPage, setCurrentPage] = useState(1);
    const tipsPerPage = 5; // Number of tips per page

    const petCareData = {
        Dogs: [
            {t_head : "Regular Vet Check-Ups", t_content : "Routine veterinary visits help detect potential health issues early. Annual check-ups, vaccinations, and preventive care can extend your dog's lifespan and improve their quality of life."},
            {t_head : "Balanced Nutrition", t_content : "A well-balanced diet is crucial for your dog's overall health. Provide high-quality dog food with the right mix of proteins, carbohydrates, fats, vitamins, and minerals. Avoid feeding them harmful human foods like chocolate, onions, and grapes."},
            {t_head : "Hydration Matters", t_content : "Always ensure your dog has access to fresh, clean water. Proper hydration helps with digestion, temperature regulation, and overall bodily functions."},
            {t_head : "Regular Exercise", t_content : "Daily walks, playtime, and mental stimulation are essential for your dog’s physical and mental well-being. Exercise helps prevent obesity and reduces behavioral problems."},
            {t_head : "Grooming and Hygiene", t_content : "Regular brushing keeps your dog's coat healthy and reduces shedding. Bathing, nail trimming, and ear cleaning should be done as needed to prevent infections and discomfort."},
            {t_head : "Dental Care", t_content : "Oral health is often overlooked but is critical for preventing gum disease and infections. Brush your dog's teeth regularly and provide dental treats or chew toys to maintain their oral hygiene."},
            {t_head : "Parasite Prevention", t_content : "Fleas, ticks, and worms can cause severe health issues. Use vet-recommended flea and tick preventives, and ensure regular deworming to keep your dog safe."},
            {t_head : "Safe and Comfortable Living Space", t_content : "Ensure your dog has a clean, safe, and comfortable place to rest. Provide a cozy bed and avoid exposing them to extreme temperatures."},
            {t_head : "Mental Stimulation", t_content : "Engage your dog with interactive toys, training exercises, and new experiences to keep their mind sharp and prevent boredom."},
            {t_head : "Recognizing Signs of Illness", t_content : "Be attentive to changes in behavior, appetite, or energy levels. Symptoms like vomiting, diarrhea, excessive scratching, or difficulty breathing require immediate veterinary attention."},
            {t_head : "Spaying/Neutering", t_content : "Spaying or neutering your dog has health benefits, including reducing the risk of certain cancers and unwanted litters."},
            {t_head : "Socialization and Training", t_content : "Expose your dog to different environments, people, and other animals to develop good behavior. Positive reinforcement training helps instill discipline and strengthens your bond."},
            {t_head : "Travel Safety", t_content : "Use a seatbelt harness or crate when traveling with your dog to ensure their safety in the car."},
            {t_head : "Flea and Tick Prevention", t_content : "Check your dog regularly for fleas and ticks, especially if they spend time outside. Use preventative treatments as recommended by your vet."},
            {t_head : "Avoid Toxic Foods", t_content : "Never feed your dog chocolate, grapes, raisins, onions, garlic, or alcohol, as they are toxic to dogs."},
            {t_head : "Ear Care", t_content : "Clean your dog's ears regularly to prevent infections, especially if they have floppy ears that trap moisture."},
            {t_head : "Weight Management", t_content : "Monitor your dog’s weight and adjust their diet and exercise plan accordingly to maintain a healthy weight and prevent obesity."},
            {t_head : "Joint Care", t_content : "As dogs age, joint health becomes more important. Provide supplements or foods that promote joint health, and avoid excessive jumping or rough play that could cause injury."},
            {t_head : "Seasonal Care", t_content : "In summer, keep your dog cool and hydrated, and in winter, make sure they have a warm, dry place to rest. Adjust their grooming routine to the seasons."},
            {t_head : "Recognizing Stress", t_content : "Watch for signs of stress or anxiety, such as excessive barking, pacing, or destructive behavior. Identify the cause and work to eliminate it."},
            {t_head : "Ear Infection Prevention", t_content : "Clean your dog’s ears regularly to avoid infections caused by moisture or wax build-up, especially for breeds with floppy ears."},
            {t_head : "Regular Nail Trimming", t_content : "Trim your dog’s nails regularly to avoid discomfort and ensure they don't get caught on objects."},
            {t_head : "Monitor Grooming Frequency", t_content : "Some dogs require more frequent grooming than others, depending on their breed. Regular grooming helps prevent matting and promotes skin health."},
            {t_head : "Proper Identification", t_content : "Ensure your dog has proper identification, such as a collar with a tag and a microchip, in case they get lost."},
            {t_head : "Monitor Behavior Changes", t_content : "Any significant changes in behavior or appetite could indicate a health issue. Consult with your vet if you notice anything unusual."},
            {t_head : "Puppy Care", t_content : "Start training and socialization early to ensure your puppy grows into a well-behaved adult dog."}
        ],
        Cats: [
            {t_head : "Regular Vet Check-Ups", t_content : "Routine veterinary visits help detect potential health issues early and ensure vaccinations are up to date."},
            {t_head : "Balanced Diet", t_content : "Cats need a diet rich in animal-based proteins. Avoid feeding them dog food or human food."},
            {t_head : "Hydration", t_content : "Ensure your cat always has access to clean, fresh water. Cats are often reluctant to drink, so wet food can help with hydration."},
            {t_head : "Litter Box Maintenance", t_content : "Keep your cat’s litter box clean to prevent health issues and encourage regular use."},
            {t_head : "Grooming", t_content : "Brush your cat’s coat regularly, especially if they have long hair, to prevent matting and hairballs."},
            {t_head : "Dental Care", t_content : "Oral health is crucial for cats. Brush their teeth regularly and provide dental treats to help reduce plaque."},
            {t_head : "Playtime and Stimulation", t_content : "Cats need regular playtime to stimulate their minds and help prevent boredom-related behavioral issues."},
            {t_head : "Parasite Prevention", t_content : "Use flea and tick preventatives to keep your cat safe from parasites."},
            {t_head : "Mental Health", t_content : "Provide your cat with a variety of toys and opportunities for climbing and scratching to keep them mentally healthy."},
            {t_head : "Spaying/Neutering", t_content : "Spaying or neutering your cat can prevent certain health problems and reduce the risk of unwanted litters."},
            {t_head : "Stress-Free Environment", t_content : "Cats are sensitive to changes in their environment. Try to maintain a calm, consistent atmosphere in your home."},
            {t_head : "Socialization", t_content : "Early socialization helps your cat become comfortable with new people, places, and experiences."},
            {t_head : "Safe Outdoor Access", t_content : "If you allow your cat outside, make sure the area is secure, or consider leash training to keep them safe."},
            {t_head : "Recognizing Illness", t_content : "Watch for signs of illness, such as changes in appetite, behavior, or litter box usage, and consult your vet if needed."},
            {t_head : "Stress Reduction", t_content : "Provide a quiet, safe space for your cat to retreat to when they’re feeling stressed or overwhelmed."},
            {t_head : "Scratching Posts", t_content : "Invest in good scratching posts or pads to keep your cat’s claws healthy and to protect your furniture."},
            {t_head : "Proper Identification", t_content : "Ensure your cat has a collar with identification and a microchip in case they get lost."},
            {t_head : "Regular Nail Trimming", t_content : "Trim your cat's nails regularly to avoid them becoming too long or sharp."},
            {t_head : "Behavioral Training", t_content : "Cats can be trained with positive reinforcement to follow certain commands and modify behavior."},
            {t_head : "Provide Hiding Spaces", t_content : "Cats often like to hide when they’re stressed or tired. Provide cozy spots where they can feel secure."},
            {t_head : "Observe for Fleas", t_content : "Fleas can cause discomfort and health problems. Check your cat regularly and consult your vet for treatments if necessary."},
            {t_head : "Kitten Care", t_content : "Ensure proper nutrition and socialization for kittens to set them up for a healthy life."},
            {t_head : "Exercise", t_content : "Encourage your cat to exercise by using toys like laser pointers and interactive games."}
        ],
        Others: [
            {t_head : "Regular Vet Check-Ups", t_content : "Routine veterinary visits help detect potential health issues early and keep vaccinations up to date."},
            {t_head : "Balanced Diet", t_content : "Ensure that your pet gets a balanced diet suited to their specific species and breed. Research their dietary needs to keep them healthy."},
            {t_head : "Hydration", t_content : "Provide your pet with clean and fresh water at all times, especially if they’re more active or live in warmer climates."},
            {t_head : "Grooming", t_content : "Groom your pet according to their breed’s needs, whether it’s brushing fur, trimming nails, or cleaning ears."},
            {t_head : "Parasite Prevention", t_content : "Use flea, tick, and worm preventatives to keep your pet healthy and free of parasites."},
            {t_head : "Exercise and Playtime", t_content : "Pets need regular exercise and play to stay healthy, active, and mentally stimulated."},
            {t_head : "Stress-Free Environment", t_content : "Create a calm and safe environment for your pet to reduce stress, especially during changes in surroundings or routine."},
            {t_head : "Spaying/Neutering", t_content : "Spaying or neutering your pet can prevent health problems and reduce overpopulation."},
            {t_head : "Toxic Substances", t_content : "Be cautious about keeping toxic plants, foods, and chemicals out of your pet’s reach."},
            {t_head : "Training", t_content : "Train your pet using positive reinforcement methods to build good behavior and obedience."},
            {t_head : "Socialization", t_content : "Socializing your pet at an early age helps them become more comfortable with people, other animals, and new environments."},
            {t_head : "Behavioral Issues", t_content : "If your pet is showing signs of stress, aggression, or anxiety, consult a vet or a professional animal behaviorist."},
            {t_head : "Safety", t_content : "Always keep your pet’s safety in mind, especially during outings, car rides, or new experiences."},
            {t_head : "Proper Identification", t_content : "Ensure your pet has proper identification, such as a collar with a tag and a microchip."},
            {t_head : "Monitor Health", t_content : "Regularly monitor your pet for signs of illness, and consult a vet if you notice changes in behavior, appetite, or energy levels."},
            {t_head : "Dental Health", t_content : "Ensure good oral hygiene for your pet to avoid dental issues and maintain overall health."},
            {t_head : "Safe Space", t_content : "Provide your pet with a quiet and comfortable space where they can retreat when they need rest or privacy."},
            {t_head : "Enrichment", t_content : "Give your pet a variety of toys and activities to keep them mentally stimulated and happy."},
            { t_head: "Proper Habitat", t_content: "Ensure the right habitat for your pet, whether it's a rabbit, bird, or reptile." },
            { t_head: "Nutrition Needs", t_content: "Different pets have unique dietary requirements—research their needs carefully." },
        ]
    };

    const totalTips = petCareData[selectedPet].length;
    const totalPages = Math.ceil(totalTips / tipsPerPage);

    const handlePagination = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const paginatedTips = petCareData[selectedPet].slice((currentPage - 1) * tipsPerPage, currentPage * tipsPerPage);

    useEffect(() => {
        gsap.fromTo(contentRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
    }, [selectedPet]);

    return (
        <div className={styles.caretip_container}>
            <div className={styles.header_card}>
                <div className={styles.head_left}>
                    <img src={pet_care} alt="" className={styles.hero_img} />
                </div>
                <div className={styles.head_right}>
                    <h1 className={styles.header}>Expert Pet Care Guide & Tips</h1>
                    <h2 className={styles.header_main}>Everything you need to know about caring for your furry friends.</h2>
                </div>
            </div>

            <div className={styles.Care_content}>
                <div className={styles.pet_choice}>
                    {Object.keys(petCareData).map((pet) => (
                        <div key={pet} className={`${styles.pet_type} ${selectedPet === pet ? styles.active : ''}`} onClick={() => setSelectedPet(pet)}>
                            <FontAwesomeIcon icon={pet === 'Dogs' ? faDog : pet === 'Cats' ? faCat : faPaw} /> {pet}
                        </div>
                    ))}
                </div>

                <div className={styles.info_set_1} ref={contentRef}>
                    {paginatedTips.map((tip, index) => (
                        <div key={index} className={styles.is01}>
                            <h2 className={styles.is01_header}>{tip.t_head}</h2>
                            <p className={styles.is01_main}>{tip.t_content}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.pagination}>
                    <button onClick={() => handlePagination('prev')} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handlePagination('next')} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Caretips;
