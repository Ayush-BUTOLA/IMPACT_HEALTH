package com.example.impacthealth.service;

import com.example.impacthealth.entity.*;
import com.example.impacthealth.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final BlogCategoryRepository categoryRepository;
    private final BlogRepository blogRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        seedCategories();
        User admin = seedAdminUser();
        Doctor doctorElena = seedDoctorElena();
        Doctor doctorMarcus = seedDoctorMarcus();
        seedInitialBlogs(doctorElena, doctorMarcus);
    }

    private void seedCategories() {
        if (categoryRepository.count() == 0) {
            List<String> categories = Arrays.asList(
                    "Mental Health", "Child Health", "Nutrition", "Wellness", "Healthcare", "Lifestyle", "General"
            );

            for (String catName : categories) {
                String slug = catName.toLowerCase().replace(" ", "-");
                categoryRepository.save(BlogCategory.builder()
                        .name(catName)
                        .slug(slug)
                        .description("Comprehensive articles and insights regarding " + catName)
                        .build());
            }
        }
    }

    private User seedAdminUser() {
        return userRepository.findByEmail("admin@impacthealth.com").orElseGet(() -> {
            User admin = User.builder()
                    .name("System Admin")
                    .email("admin@impacthealth.com")
                    .password("admin123")
                    .role(Role.ADMIN)
                    .build();
            return userRepository.save(admin);
        });
    }

    private Doctor seedDoctorElena() {
        User user = userRepository.findByEmail("elena.rostova@impacthealth.com").orElseGet(() -> {
            User u = User.builder()
                    .name("Dr. Elena Rostova")
                    .email("elena.rostova@impacthealth.com")
                    .password("doctor123")
                    .role(Role.DOCTOR)
                    .build();
            return userRepository.save(u);
        });

        return doctorRepository.findByUser(user).orElseGet(() -> {
            Doctor d = Doctor.builder()
                    .user(user)
                    .name("Dr. Elena Rostova")
                    .email("elena.rostova@impacthealth.com")
                    .specialization("Cardiology & Preventative Health")
                    .profileImage("https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80")
                    .build();
            return doctorRepository.save(d);
        });
    }

    private Doctor seedDoctorMarcus() {
        User user = userRepository.findByEmail("marcus.vance@impacthealth.com").orElseGet(() -> {
            User u = User.builder()
                    .name("Dr. Marcus Vance")
                    .email("marcus.vance@impacthealth.com")
                    .password("doctor123")
                    .role(Role.DOCTOR)
                    .build();
            return userRepository.save(u);
        });

        return doctorRepository.findByUser(user).orElseGet(() -> {
            Doctor d = Doctor.builder()
                    .user(user)
                    .name("Dr. Marcus Vance")
                    .email("marcus.vance@impacthealth.com")
                    .specialization("Pediatrics & Adolescent Care")
                    .profileImage("https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80")
                    .build();
            return doctorRepository.save(d);
        });
    }

    private void seedInitialBlogs(Doctor doctorElena, Doctor doctorMarcus) {
        if (blogRepository.count() == 0) {
            BlogCategory wellness = categoryRepository.findByName("Wellness").orElse(null);
            BlogCategory childHealth = categoryRepository.findByName("Child Health").orElse(null);
            BlogCategory mentalHealth = categoryRepository.findByName("Mental Health").orElse(null);

            // 1. Published Blog
            if (wellness != null) {
                blogRepository.save(Blog.builder()
                        .author(doctorElena)
                        .category(wellness)
                        .title("Understanding Cardiovascular Health in Modern Times")
                        .slug("understanding-cardiovascular-health-in-modern-times")
                        .shortDescription("Key strategies and preventive measures for maintaining cardiovascular health amidst stressful routines.")
                        .content("<p>Cardiovascular disease remains one of the primary health concerns worldwide. Early prevention, routine screenings, and lifestyle modifications can significantly lower risks.</p><h3>Key Habits for Heart Health</h3><ul><li>Regular 30-minute moderate aerobic exercise</li><li>Balanced diet rich in omega-3 fatty acids and fiber</li><li>Stress management techniques including mindfulness and adequate sleep</li></ul>")
                        .featuredImage("https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80")
                        .status(BlogStatus.PUBLISHED)
                        .publishedAt(LocalDateTime.now().minusDays(3))
                        .build());
            }

            // 2. Pending Blog (ready for admin review testing)
            if (childHealth != null) {
                blogRepository.save(Blog.builder()
                        .author(doctorMarcus)
                        .category(childHealth)
                        .title("Essential Childhood Immunization & Nutrition Guide")
                        .slug("essential-childhood-immunization-nutrition-guide")
                        .shortDescription("A comprehensive guide for parents on tracking vaccinations and promoting balanced child growth.")
                        .content("<p>Ensuring your child receives vaccinations according to the recommended schedule is the single most effective way to protect against preventable childhood illnesses.</p><p>Proper nutrition during early development years lays the groundwork for robust immune defense and cognitive progression.</p>")
                        .featuredImage("https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80")
                        .status(BlogStatus.PENDING)
                        .build());
            }

            // 3. Draft Blog
            if (mentalHealth != null) {
                blogRepository.save(Blog.builder()
                        .author(doctorElena)
                        .category(mentalHealth)
                        .title("Mindfulness and Stress Reduction Techniques for Professionals")
                        .slug("mindfulness-stress-reduction-professionals")
                        .shortDescription("Practical daily routines to relieve anxiety and enhance focus in fast-paced workplaces.")
                        .content("<p>Workplace burnout is an increasing challenge. Practicing micro-meditations and structured breathing exercises can restore mental clarity.</p>")
                        .featuredImage("https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80")
                        .status(BlogStatus.DRAFT)
                        .build());
            }
        }
    }
}
