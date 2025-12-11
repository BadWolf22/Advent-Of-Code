using System.Collections.Immutable;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.CompilerServices;

class Program {
    static void Main() {
        Console.WriteLine($"Part1 Sample: {Part1("sample.txt")}");
        Console.WriteLine($"Part1 Input: {Part1("input.txt")}");
        Console.WriteLine($"Part2 Sample: {Part2("sample.txt")}");
        Console.WriteLine($"Part2 Input: {Part2("input.txt")}");
    }

    /// <summary>
    /// Paper roll = "@"
    /// Empty space = "."
    /// Paper roll is accessible if < 4 of 8 neighbors are paper
    /// </summary>
    /// <param name="fileName"></param>
    /// <returns></returns>
    static int Part1(string fileName) {
        var lines = File.ReadAllLines(fileName);
        var height = lines.Length;
        var width = lines.First().Length;
        var grid = lines.SelectMany(x => x.Select(y => y == '@')).ToList();
        
        var accessibleGrid = grid.AsParallel().Select((isPaper, index) =>
        {
            if (!isPaper)
            {
                return false;
            }
            var y = index / width;
            var x = index % width;
            var neighboringPaperRolls = 0;
            for (var xOff = -1; xOff <= 1; xOff++)
            {
                for (var yOff = -1; yOff <= 1; yOff++)
                {
                    if (xOff == 0 && yOff == 0)
                    {
                        continue;
                    }
                    var neighborX = x + xOff;
                    var neighborY = y + yOff;
                    if (neighborX < 0 || neighborX >= width || neighborY < 0 || neighborY >= height)
                    {
                        continue;
                    }
                    
                    if (grid[(width*neighborY+neighborX)] == true)
                    {
                        neighboringPaperRolls++;
                    }
                }
            }
            if (neighboringPaperRolls < 4)
            {
                return true;
            }
            return false;
        });

        return accessibleGrid.Count(x => x == true);
    }

    /// <summary>
    /// Same as above, but repeat with modified grid
    /// </summary>
    /// <param name="fileName"></param>
    /// <returns></returns>
    static int Part2(string fileName) {
        var lines = File.ReadAllLines(fileName);
        var height = lines.Length;
        var width = lines.First().Length;
        var grid = lines.SelectMany(x => x.Select(y => y == '@')).ToList();
        
        var totalRemovable = 0;

        while (true)
        {
            var accessibleGrid = grid.AsParallel().Select((isPaper, index) =>
            {
                if (!isPaper)
                {
                    return false;
                }
                var y = index / width;
                var x = index % width;
                var neighboringPaperRolls = 0;
                for (var xOff = -1; xOff <= 1; xOff++)
                {
                    for (var yOff = -1; yOff <= 1; yOff++)
                    {
                        if (xOff == 0 && yOff == 0)
                        {
                            continue;
                        }
                        var neighborX = x + xOff;
                        var neighborY = y + yOff;
                        if (neighborX < 0 || neighborX >= width || neighborY < 0 || neighborY >= height)
                        {
                            continue;
                        }
                        
                        if (grid[(width*neighborY+neighborX)] == true)
                        {
                            neighboringPaperRolls++;
                        }
                    }
                }
                if (neighboringPaperRolls < 4)
                {
                    return true;
                }
                return false;
            }).ToImmutableList();
            var removable = accessibleGrid.Count(x => x == true);
            if (removable == 0)
            {
                break;
            }
            totalRemovable += removable;
            grid = [.. grid.Zip(accessibleGrid, (isPaper, isRemovable) => new {isPaper, isRemovable}).Select(space => space.isPaper && !space.isRemovable)];
        }
        return totalRemovable;
    }
}