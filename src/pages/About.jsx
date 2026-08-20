import {
  ArrowRight,
  BookHeart,
  Eye,
  HeartHandshake,
  Lightbulb,
  Quote,
  Target,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import PageHero from "../components/common/PageHero";

const values = [
  {
    icon: BookHeart,
    title: "ស្រឡាញ់ការអាន",
    text: "យើងជឿថាការអានអាចបើកទ្វារទៅកាន់ឱកាសថ្មីៗ។",
  },
  {
    icon: HeartHandshake,
    title: "បម្រើដោយស្មោះត្រង់",
    text: "ផ្ដល់ព័ត៌មានច្បាស់ និងជួយអ្នកអានជ្រើសរើសដោយទំនុកចិត្ត។",
  },
  {
    icon: Lightbulb,
    title: "គំនិតថ្មីជានិច្ច",
    text: "យើងស្វែងរកសៀវភៅ និងបទពិសោធន៍ថ្មីៗសម្រាប់សហគមន៍។",
  },
  {
    icon: UsersRound,
    title: "រីកចម្រើនជាមួយគ្នា",
    text: "បង្កើតសហគមន៍ដែលអ្នកអាន អ្នកនិពន្ធ និងអ្នកអប់រំអាចភ្ជាប់គ្នា។",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="រឿងរ៉ាវរបស់យើង"
        title="បង្កើតសហគមន៍អ្នកអានខ្មែរដែលស្រឡាញ់ចំណេះដឹង"
        description="បណ្ណាល័យខ្មែរ ជាគម្រោងហាងសៀវភៅ Front-End ដែលរួមបញ្ចូលអត្តសញ្ញាណខ្មែរ និងបទពិសោធន៍ E-commerce ទំនើប។"
        crumbs={[{ label: "អំពីយើង" }]}
      />
      <section className="section about-story">
        <div className="container about-story__grid">
          <div className="about-story__visual">
            <div className="story-book story-book--one">ចំណេះដឹង</div>
            <div className="story-book story-book--two">ការអាន</div>
            <div className="story-book story-book--three">អនាគត</div>
            <span>៚</span>
          </div>
          <div className="about-story__copy">
            <span className="section-title__eyebrow">Our Story</span>
            <h2>ពីគំនិតតូចមួយ ទៅកាន់បណ្ណាល័យឌីជីថលសម្រាប់អ្នកគ្រប់គ្នា</h2>
            <p>
              យើងចាប់ផ្ដើមពីការជឿជាក់ថា
              សៀវភៅល្អមួយក្បាលអាចផ្លាស់ប្តូរមនុស្សម្នាក់
              ហើយមនុស្សម្នាក់អាចផ្លាស់ប្តូរសង្គម។
              ដូច្នេះយើងបានរៀបចំកន្លែងមួយដែលអ្នកអានអាចស្វែងរក ស្គាល់
              និងជ្រើសរើសសៀវភៅបានងាយ។
            </p>
            <p>
              រចនាបទរបស់យើងយកពណ៌មាស Cream និងក្បាច់ខ្មែរទន់ៗ
              មកបង្កើតបទពិសោធន៍ដែលកក់ក្ដៅ ទំនើប និងងាយប្រើ។
            </p>
            <blockquote>
              <Quote size={21} /> «ការអានថ្ងៃនេះ
              គឺជាការវិនិយោគសម្រាប់អនាគតថ្ងៃស្អែក»
            </blockquote>
          </div>
        </div>
      </section>
      <section className="about-purpose">
        <div className="container about-purpose__grid">
          <article>
            <span>
              <Target />
            </span>
            <div>
              <small>បេសកកម្ម</small>
              <h2>Mission</h2>
              <p>
                ធ្វើឲ្យសៀវភៅល្អៗងាយស្វែងរក និងជំរុញទម្លាប់អានក្នុងសហគមន៍ខ្មែរ។
              </p>
            </div>
          </article>
          <article>
            <span>
              <Eye />
            </span>
            <div>
              <small>ចក្ខុវិស័យ</small>
              <h2>Vision</h2>
              <p>
                ក្លាយជាកន្លែងដែលអ្នកអានខ្មែរជឿទុកចិត្តសម្រាប់ចំណេះដឹង គំនិត
                និងការរីកចម្រើន។
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="section about-values">
        <div className="container">
          <div className="section-title">
            <span className="section-title__eyebrow">អ្វីដែលយើងជឿ</span>
            <h2>គុណតម្លៃរបស់យើង</h2>
            <p>គោលការណ៍ដែលណែនាំរាល់ការសម្រេចចិត្ត និងការបម្រើអ្នកអាន។</p>
          </div>
          <div className="about-values__grid">
            {values.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <span>
                  <Icon size={25} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-stats">
        <div className="container">
          <div>
            <strong>150+</strong>
            <span>សៀវភៅជ្រើសរើស</span>
          </div>
          <div>
            <strong>8</strong>
            <span>ប្រភេទសៀវភៅ</span>
          </div>
          <div>
            <strong>1,200+</strong>
            <span>អ្នកអានរីករាយ</span>
          </div>
          <div>
            <strong>4.9</strong>
            <span>ពិន្ទុមធ្យម</span>
          </div>
        </div>
      </section>
      <section className="section about-team">
        <div className="container">
          <div className="section-title">
            <span className="section-title__eyebrow">
              មនុស្សនៅពីក្រោយគម្រោង
            </span>
            <h2>ក្រុមការងាររបស់យើង</h2>
          </div>
          <div className="team-grid">
            {[
              ["ភក្ត្រា", "Project Lead & Front-End", "ភ"],
              ["សុភា", "UI/UX Designer", "ស"],
              ["វិសាល", "Content Curator", "វ"],
            ].map(([name, role, initials]) => (
              <article key={name}>
                <span>{initials}</span>
                <h3>{name}</h3>
                <p>{role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-cta">
        <div className="container">
          <span>ចាប់ផ្ដើមទំព័រថ្មីរបស់អ្នក</span>
          <h2>ស្វែងរកសៀវភៅដែលនឹងផ្លាស់ប្តូរគំនិតរបស់អ្នក</h2>
          <div>
            <Link className="button button--primary" to="/books">
              មើលសៀវភៅ <ArrowRight size={18} />
            </Link>
            <Link className="button button--outline" to="/contact">
              ទាក់ទងយើង
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
