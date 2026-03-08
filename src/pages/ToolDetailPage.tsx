import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTools } from '../context/ToolsContext';
import { useUser } from '../context/UserContext';
import ToolPlaceholder from '../components/common/ToolPlaceholder';

// Text Tools
import WordCounter from '../components/tools/TextTools/WordCounter';
import CaseConverter from '../components/tools/TextTools/CaseConverter';
import RemoveDuplicateLines from '../components/tools/TextTools/RemoveDuplicateLines';
import SlugGenerator from '../components/tools/TextTools/SlugGenerator';
import LoremIpsumGenerator from '../components/tools/TextTools/LoremIpsumGenerator';
import WhitespaceRemover from '../components/tools/TextTools/WhitespaceRemover';
import TextDiff from '../components/tools/TextTools/TextDiff';
import LineSorter from '../components/tools/TextTools/LineSorter';
import CharacterCounter from '../components/tools/TextTools/CharacterCounter';

// Developer Tools
import JSONToCSV from '../components/tools/DeveloperTools/JSONToCSV';
import Base64Tool from '../components/tools/DeveloperTools/Base64Tool';
import UUIDGenerator from '../components/tools/DeveloperTools/UUIDGenerator';
import URLEncoder from '../components/tools/DeveloperTools/URLEncoder';
import HTMLEncoder from '../components/tools/DeveloperTools/HTMLEncoder';
import JSONFormatter from '../components/tools/DeveloperTools/JSONFormatter';

// Calculators
import BMICalculator from '../components/tools/Calculators/BMICalculator';
import TipCalculator from '../components/tools/Calculators/TipCalculator';
import PercentageCalculator from '../components/tools/Calculators/PercentageCalculator';
import LoanCalculator from '../components/tools/Calculators/LoanCalculator';
import AgeCalculator from '../components/tools/Calculators/AgeCalculator';

// Converters
import UnitConverter from '../components/tools/Converters/UnitConverter';
import RGBToHex from '../components/tools/Converters/RGBToHex';
import TimestampConverter from '../components/tools/Converters/TimestampConverter';
import MarkdownToHTML from '../components/tools/Converters/MarkdownToHTML';
import CSVToJSON from '../components/tools/Converters/CSVToJSON';
import ImageResizer from '../components/tools/Converters/ImageResizer';
import ImageFormatConverter from '../components/tools/Converters/ImageFormatConverter';
import ImageCompressor from '../components/tools/Converters/ImageCompressor';
import TextToPDF from '../components/tools/Converters/TextToPDF';
import ImageToDataURL from '../components/tools/Converters/ImageToDataURL';
import CSSUnitsConverter from '../components/tools/Converters/CSSUnitsConverter';
import ColorNameFinder from '../components/tools/Converters/ColorNameFinder';

// Productivity
import PasswordGenerator from '../components/tools/Productivity/PasswordGenerator';
import InvoiceGenerator from '../components/tools/Productivity/InvoiceGenerator';

// Creative
import HashtagGenerator from '../components/tools/Creative/HashtagGenerator';
import RandomNameGenerator from '../components/tools/Creative/RandomNameGenerator';
import QRCodeGenerator from '../components/tools/Creative/QRCodeGenerator';
import ColorPicker from '../components/tools/Creative/ColorPicker';
import HTMLTableGenerator from '../components/tools/Creative/HTMLTableGenerator';

import { getCategoryColor } from '../utils/helpers';

const ToolDetailPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const { getToolById } = useTools();
  const { isPremium } = useUser();
  
  const tool = toolId ? getToolById(toolId) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [toolId]);

  if (!tool) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-display font-bold text-dark-900 mb-2">
          Tool Not Found
        </h1>
        <p className="text-dark-600 mb-8">
          The tool you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          ← Back to Home
        </Link>
      </div>
    );
  }

  if (tool.premium && !isPremium) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12 border-2 border-amber-200">
            <div className="text-6xl mb-6">👑</div>
            <h1 className="text-3xl font-display font-bold text-dark-900 mb-4">
              Premium Tool
            </h1>
            <p className="text-xl text-dark-600 mb-8">
              {tool.name} is a premium tool. Upgrade to access this and all other premium features!
            </p>
            <div className="space-y-4">
              <button className="btn-primary text-lg">
                ⭐ Upgrade to Premium - $9.99/month
              </button>
              <p className="text-sm text-dark-500">
                or{' '}
                <Link to="/" className="text-primary-600 hover:underline">
                  browse free tools
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderToolComponent = () => {
    switch (tool.id) {
      // Text Tools
      case 'word-counter':
        return <WordCounter />;
      case 'case-converter':
        return <CaseConverter />;
      case 'remove-duplicates':
        return <RemoveDuplicateLines />;
      case 'slug-generator':
        return <SlugGenerator />;
      case 'lorem-ipsum':
        return <LoremIpsumGenerator />;
      case 'whitespace-remover':
        return <WhitespaceRemover />;
      case 'text-diff':
        return <TextDiff />;
      case 'line-sorter':
        return <LineSorter />;
      case 'character-counter':
        return <CharacterCounter />;
      
      // Developer Tools
      case 'json-to-csv':
        return <JSONToCSV />;
      case 'base64-encoder':
        return <Base64Tool />;
      case 'uuid-generator':
        return <UUIDGenerator />;
      case 'url-encoder':
        return <URLEncoder />;
      case 'html-encoder':
        return <HTMLEncoder />;
      case 'json-formatter':
        return <JSONFormatter />;
      
      // Calculators
      case 'bmi-calculator':
        return <BMICalculator />;
      case 'tip-calculator':
        return <TipCalculator />;
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'loan-calculator':
        return <LoanCalculator />;
      case 'age-calculator':
        return <AgeCalculator />;
      
      // Converters
      case 'unit-converter':
        return <UnitConverter />;
      case 'rgb-to-hex':
        return <RGBToHex />;
      case 'timestamp-converter':
        return <TimestampConverter />;
      case 'markdown-to-html':
        return <MarkdownToHTML />;
      case 'csv-to-json':
        return <CSVToJSON />;
      case 'image-resizer':
        return <ImageResizer />;
      case 'image-format-converter':
        return <ImageFormatConverter />;
      case 'image-compressor':
        return <ImageCompressor />;
      case 'text-to-pdf':
        return <TextToPDF />;
      case 'image-to-data-url':
        return <ImageToDataURL />;
      case 'css-units-converter':
        return <CSSUnitsConverter />;
      case 'color-name-finder':
        return <ColorNameFinder />;
      
      // Productivity
      case 'password-generator':
        return <PasswordGenerator />;
      case 'invoice-generator':
        return <InvoiceGenerator />;
      
      // Creative
      case 'hashtag-generator':
        return <HashtagGenerator />;
      case 'random-name-generator':
        return <RandomNameGenerator />;
      case 'qr-code-generator':
        return <QRCodeGenerator />;
      case 'color-picker':
        return <ColorPicker />;
      case 'html-table-generator':
        return <HTMLTableGenerator />;
      
      default:
        return (
          <ToolPlaceholder
            toolId={tool.id}
            toolName={tool.name}
            description={tool.description}
            exampleInput={tool.exampleInput}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-50 via-orange-50 to-yellow-50 border-b border-dark-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Tools
          </Link>

          <div className="flex items-start space-x-6">
            <div className="text-6xl">{tool.icon}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-dark-900">
                  {tool.name}
                </h1>
                <span className={`category-badge border ${getCategoryColor(tool.category)}`}>
                  {tool.category}
                </span>
              </div>
              <p className="text-lg text-dark-600 mb-4">{tool.description}</p>
              <div className="flex flex-wrap gap-2">
                {tool.tags?.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white rounded-full text-xs font-medium text-dark-600 border border-dark-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderToolComponent()}
      </section>
    </div>
  );
};

export default ToolDetailPage;
