package com.example.impacthealth.service;

import com.example.impacthealth.entity.*;
import com.example.impacthealth.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
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
        seedAdminUser();
        Doctor doctorSapana = seedDoctorSapana();
        seedInitialBlogs(doctorSapana);
    }

    private void seedCategories() {
        if (categoryRepository.count() == 0) {
            List<String> categories = Collections.singletonList("Disease and Diagnosis");

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

    private Doctor seedDoctorSapana() {
        User user = userRepository.findByEmail("sapana.patel@impacthealth.com").orElseGet(() -> {
            User u = User.builder()
                    .name("Dr. Sapana v Patel")
                    .email("sapana.patel@impacthealth.com")
                    .password("doctor123")
                    .role(Role.DOCTOR)
                    .build();
            return userRepository.save(u);
        });

        return doctorRepository.findByUser(user).orElseGet(() -> {
            Doctor d = Doctor.builder()
                    .user(user)
                    .name("Dr. Sapana v Patel")
                    .email("sapana.patel@impacthealth.com")
                    .specialization("MBBS, DNB · Consultant Pathologist")
                    .profileImage(null)
                    .build();
            return doctorRepository.save(d);
        });
    }

    private void seedInitialBlogs(Doctor doctorSapana) {
        if (blogRepository.count() == 0) {
            BlogCategory diseaseAndDiagnosis = categoryRepository.findByName("Disease and Diagnosis").orElse(null);

            // Verified CBC Test Blog
            if (diseaseAndDiagnosis != null) {
                blogRepository.save(Blog.builder()
                        .author(doctorSapana)
                        .category(diseaseAndDiagnosis)
                        .title("Complete Hemogram (CBC) Test")
                        .slug("complete-hemogram-cbc-test")
                        .shortDescription("A Complete Hemogram / Complete Blood Count (CBC) is a blood test used to evaluate your overall health and disease conditions that affect your blood cells such as anemia, infections, inflammations, leukemia, etc.")
                        .content("<div class=\"space-y-6\"><section class=\"space-y-3\"><h2 class=\"text-2xl font-extrabold text-[#1D2A72]\">What is the CBC Test?</h2><p class=\"text-slate-600 leading-relaxed text-base\">A <strong>Complete Hemogram / Complete Blood Count (CBC)</strong> is a blood test used to evaluate your overall health and disease conditions that affect your blood cells such as anemia, infections, inflammations, leukemia, etc..</p></section><section class=\"space-y-3\"><h2 class=\"text-2xl font-extrabold text-[#1D2A72]\">When is it required?</h2><p class=\"text-slate-600 leading-relaxed text-base\">Your doctor may ask you to get tested if you have any signs and symptoms that may be related to a condition that affects blood cells. It is also a very common blood test and can be done as a part of routine health examination.</p></section><section class=\"space-y-3\"><h2 class=\"text-2xl font-extrabold text-[#1D2A72]\">Why is it done?</h2><ul class=\"list-disc pl-5 space-y-2 text-slate-600 text-base\"><li>Your doctor may order it to review your overall health for preventive care or early detection and diagnosis.</li><li>Your doctor may also order CBC if you are experiencing fatigue, weakness, fever or bleeding. A complete blood test would help in diagnosing the cause of these symptoms.</li><li>A complete Hemogram test could also be ordered by your doctor if you are taking any medication or treatment that affects the blood count.</li></ul></section><section class=\"space-y-4\"><h2 class=\"text-2xl font-extrabold text-[#1D2A72]\">What diseases can CBC detect?</h2><p class=\"text-slate-600 leading-relaxed text-base\">A Complete Hemogram can assist physicians in diagnosing and monitoring a wide variety of medical conditions, including:</p><div class=\"grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2\"><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Anemia</div><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Inflammation</div><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Autoimmune diseases</div><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Dehydration</div><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Bone marrow disorders</div><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Infections</div><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Hemoglobin abnormalities</div><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Leukemia</div><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Low platelets count</div><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Thalassemia</div><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Sickle sick disease</div><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Cancer</div><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Lymphoma</div><div class=\"p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-800 font-medium text-sm\">Nutritional deficiencies (such as iron, folate etc.)</div></div></section><section class=\"p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2\"><h2 class=\"text-xl font-extrabold text-[#1D2A72]\">How much does it cost?</h2><p class=\"text-slate-700 font-medium text-base\">The average cost of CBC is between the range of <span class=\"font-extrabold text-[#1D2A72] text-lg\">INR 200 – 400</span>.</p></section><section class=\"p-6 rounded-2xl bg-amber-50/80 border border-amber-200/70 space-y-2\"><h3 class=\"text-sm font-extrabold text-amber-900 uppercase tracking-wider\">Disclaimer</h3><p class=\"text-xs text-amber-800 leading-relaxed\">All images, graphics, information, and representations are for the purpose of general information and awareness; and the information has been medically verified by registered doctors. However, this information cannot be used to establish an end result of a certain medical condition. For understanding and accuracy of your medical concern contact your physician.</p></section></div>")
                        .featuredImage("https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80")
                        .status(BlogStatus.PUBLISHED)
                        .publishedAt(LocalDateTime.now().minusMonths(6))
                        .build());
            }
        }
    }
}
