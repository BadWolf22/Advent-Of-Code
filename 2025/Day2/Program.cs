class Program {
    static void Main() {
        Console.WriteLine(Part1("sample.txt"));
        Console.WriteLine(Part1("input.txt"));
        // Console.WriteLine(Part2("sample.txt"));
        // Console.WriteLine(Part2("input.txt"));
    }

    static double Part1(string fileName) {
        var input = File.ReadAllLines(fileName).First();
        var ranges = input.Split(",");

        double sum = 0;
        foreach (var range in ranges) {
            var split = range.Split("-");
            var lowerBound = double.Parse(split.First());
            var upperBound = double.Parse(split.Last());

            var prettyLine = $"{range}";
            
            var charsToTake = (int)Math.Floor((float)split.First().Length/2);
            var currDouble = split.First().Substring(0, charsToTake);
            if (currDouble == string.Empty) {
                currDouble = "1";
            }

            while (true) {
                var textual = $"{currDouble}{currDouble}";
                var numeric = double.Parse(textual);
                if (textual.Length < split.First().Length) {
                    currDouble = "1" + string.Join("", Enumerable.Repeat(0, currDouble.Length));
                    continue;
                }
                if (numeric < lowerBound) {
                    currDouble = $"{double.Parse(currDouble)+1}";
                    continue;
                }
                if (numeric <= upperBound) {
                    // Console.WriteLine($"{currDouble}{currDouble}");
                    sum += numeric;
                    prettyLine += $", {currDouble}{currDouble}";
                } else {
                    break;
                }
                currDouble = $"{double.Parse(currDouble)+1}";
            }

            // Console.WriteLine(prettyLine);
        }
        
        return sum;
    }

    static int Part2(string fileName) {
        return 0;
    }
}